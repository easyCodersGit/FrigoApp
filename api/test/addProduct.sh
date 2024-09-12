source frigotest.sh

TEST "add-product"

CASE "success on new product added"

curl 'http://localhost:9000/users' \
-H 'Content-Type: application/json' \
-d '{ "name": "Carne", "category": "meat", "quantity": 2, "expirationDate": "2024-09-01", "icon": "🥩" }' \
-v