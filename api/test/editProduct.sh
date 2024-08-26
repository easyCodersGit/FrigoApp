source frigotest.sh

TEST "edit-product"

CASE "success on new product edited"

curl 'http://localhost:9000/drawers/66cb75feede0a073a7eb66d0/products/66cb7633ede0a073a7eb66d8' \
-H 'Content-Type: application/json' \
-d '{ "name": "Carne", "category": "meat", "quantity": 2}' \
-X PATCH \
-v