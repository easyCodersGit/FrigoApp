source frigotest.sh

TEST "increment-product"

CASE "success on new product increment"

curl 'http://localhost:9000/drawers/66cf4ce2439e5ec3098993d4/products/66d4c4a4afb165a82107e7eb/increment' \
-H 'Content-Type: application/json' \
-X PATCH \
-v