#!/bin/sh

API="http://localhost:4741"
URL_PATH="/items"
TOKEN="qoHBk+I8Xr3Irge5KI8FyeDyK0kKDTEm8s7OCffdsbI=--KpGR1ZrUNLwZ5AtcRsJDjHUdInV3enrbWaJjJ58bpsI="

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN" \

echo
