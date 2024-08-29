source frigotest.sh

TEST "retrieve-user-alarms"

CASE "success on correct user id"

curl 'http://localhost:9000/users/66cb11d2a7f1c48e5602c7a1/alarms' -v