source frigotest.sh

TEST "retrieve-user-fridges"

CASE "success on correct user id"

curl 'http://localhost:9000/users/66a4cbc4fb311e46c4a4ef5d/fridges' -v