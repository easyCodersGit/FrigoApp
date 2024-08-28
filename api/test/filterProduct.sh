source frigotest.sh

TEST "filter-fridge"

CASE "success on correct fridge id"

curl 'http://localhost:9000/users/66cb11d2a7f1c48e5602c7a1/products?productName=Platano' -H 'Content-Type: application/json' -v
