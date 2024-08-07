source frigotest.sh

TEST "add-fridge"

CASE "success on new fridge"

curl 'http://localhost:9000/fridges' \
-H 'Content-Type: application/json' \
-d '{ "name": "Nevera parking", "userId": "66a4cbc4fb311e46c4a4ef5d" }' \
-v

