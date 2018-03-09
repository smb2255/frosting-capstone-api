'use strict'
const controller = require('lib/wiring/controller')
const models = require('app/models')
const Item = models.item

// Since authentication runs before all methods, an inauthenticated user cannot
// view any items.
const authenticate = require('./concerns/authenticate')

const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

// The query returns only that user's items, so someone cannot index someone
// else's items.
const index = (req, res, next) => {
  Item.find({ '_owner': req.user._id })
    .then(items => res.json({
      items: items.map((e) =>
        e.toJSON())
        // e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

// The setModel method runs before show, making sure that only items belonging
// to the requesting user can be shown to them.
const show = (req, res) => {
  res.json({
    item: req.item.toJSON()
    // item: req.item.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  // Object.assign adds the _owner information as a key in the request body.
  const item = Object.assign(req.body.item, {
    _owner: req.user._id
  })
  Item.create(item)
    .then(item =>
      res.status(201)
        .json({
          item: item.toJSON()
          // ({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body.item._owner  // disallow owner reassignment.
  const itemId = req.item._id
  req.item.update(req.body.item)
    .then(() => Item.findOne({ '_id': itemId }))
    .then(item =>
      res.status(200)
        .json({
          item: item.toJSON()
        }))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.item.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  // Authenticate runs before all methods; user restriction occurs only before
  // those where forUser is set to true.
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate },
  { method: setModel(Item, { forUser: true }), only: ['update', 'destroy', 'show'] }
] })
