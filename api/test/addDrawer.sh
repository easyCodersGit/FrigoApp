source frigotest.sh

TEST "add-drawer"

CASE "success on new drawer"

curl 'http://localhost:9000/users/669b6db4416f5499171eeb7f/fridges/66b5e113d6315aa024636ce4' \
-H 'Content-Type: application/json' \
-d '{ "name": "Cajon Carne"}' \
-v
