API="http://localhost:4741"
URL_PATH="/items"
TITLE="a dang title"
DESC="a dang desc"
TOKEN="WF12X+MoUcLZ/YBLKJKuH7kNP5brHqEztWLVCBoUWwc=--SzjwBguNTmSxcfTzja9fnem3qq7v4XS/+H1DJuTaFJA="

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
 --header "Authorization: Token token=$TOKEN" \
  --data '{
    "item": {
      "title": "'"${TITLE}"'",
      "description": "'"${DESC}"'"
    }
  }'

echo
