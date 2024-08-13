source frigotest.sh

TEST "add-drawer"

CASE "success on new drawer"

curl 'http://localhost:9000/fridges/66b5e113d6315aa024636ce4/drawers' \
-H 'Content-Type: application/json' \
-d '{ "name": "Cajon Huevos"}' \
-v
