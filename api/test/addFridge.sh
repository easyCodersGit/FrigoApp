source frigotest.sh

TEST "add-fridge"

CASE "success on new fridge"

curl 'http://localhost:9000/users/669b6db4416f5499171eeb7f/fridges' \
-H 'Content-Type: application/json' \
-d '{ "name": "Nevera Campo"}' \
-v

