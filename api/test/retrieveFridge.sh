source frigotest.sh

TEST "retrieve-fridge"

CASE "success on correct fridge id"

curl 'http://localhost:9000/fridges/66b23297350fe3e6045d6161' -v