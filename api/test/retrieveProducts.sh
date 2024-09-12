
source frigotest.sh

TEST "retrieve-products"

CASE "success on correct drawer id"

curl 'http://localhost:9000/drawers/66b23af1a20302a84806b3b5/products' -v