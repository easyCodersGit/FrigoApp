source frigotest.sh

TEST "add-alarm"

CASE "success on new drawer"

curl 'http://localhost:9000/users/66cb11d2a7f1c48e5602c7a1/products/66d04f8ffd5577e418672893' \
-H 'Content-Type: application/json' \
-d '{ "type": "quantity", "quantity": 8}' \
-v
