
source frigotest.sh

TEST "retrieve-drawers"

CASE "success on correct fridge id"

curl 'http://localhost:9000/fridges/66b5e113d6315aa024636ce4/drawers' -v