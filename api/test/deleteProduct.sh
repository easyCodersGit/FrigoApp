source frigotest.sh

TEST "delete-dproduct"

CASE "success on delete product"

drawers/:drawerId/products/:productId

curl 'http://localhost:9000/drawers/66b23af1a20302a84806b3b5/products/66bd105eb0903e8a587d7cbe' \
-H 'Content-Type: application/json' \
-X DELETE \
-v