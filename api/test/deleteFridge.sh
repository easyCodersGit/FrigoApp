source frigotest.sh

TEST "delete-fridge"

CASE "success on delete fridge"



curl 'http://localhost:9000/users/66a4cbc4fb311e46c4a4ef5d/fridges/66b32caf25c555c2359711cb' \
-H 'Content-Type: application/json' \
-X DELETE \
-v