source frigotest.sh

TEST "add-fridge"

CASE "success on new fridge"

curl 'http://localhost:9000/users/66cb11d2a7f1c48e5602c7a1/fridges' \
-H 'Content-Type: application/json' \
-d '{ "name": "Nevera Campo", "colorFridge": "blue" }' \
-v

