#!/bin/bash

API="http://localhost:4741"
URL_PATH="/items"
TOKEN="WF12X+MoUcLZ/YBLKJKuH7kNP5brHqEztWLVCBoUWwc=--SzjwBguNTmSxcfTzja9fnem3qq7v4XS/+H1DJuTaFJA="
TITLE="A FREAKING NEW TITLE"
DESC="AN EVEN BETTER DESCRIPTION"
ID="5a837a48e9f3b92d95ce27d5"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN" \
  --data '{
    "item": {
      "title": "'"${TITLE}"'",
      "description": "'"${DESC}"'"
    }
  }'

echo
