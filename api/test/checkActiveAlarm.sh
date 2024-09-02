source frigotest.sh

TEST "check-active-alarm"

CASE "success on correct user id"

curl -X POST 'http://localhost:9000/users/66cb11d2a7f1c48e5602c7a1/checkActiveAlarm' -v


