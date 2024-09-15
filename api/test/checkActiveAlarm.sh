source frigotest.sh

TEST "check-active-alarm"

CASE "success on correct user id"

curl -X POST 'http://localhost:9000/users/66b23297350fe3e6045d6161/change-email' -v


