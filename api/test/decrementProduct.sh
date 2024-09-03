source frigotest.sh

TEST "decrement-product"

CASE "success on new product decrement"

curl 'http://localhost:9000/drawers/66cf4ce2439e5ec3098993d4/products/66d4c4a4afb165a82107e7eb/decrement' \
-H 'Content-Type: application/json' \
-X PATCH \
-v