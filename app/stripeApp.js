const keyPublishable = process.env.pk_test_KSYoDLfhiMuVHnjFSOt5ZuX7;
const keySecret = process.env.sk_test_8QoXkFdk6wxJvxygNLPu2FwE;

const app = require("express")();
const stripe = require("stripe")(sk_test_8QoXkFdk6wxJvxygNLPu2FwE);

app.set("view engine", "pug");
app.use(require("body-parser").urlencoded({extended: false}));
