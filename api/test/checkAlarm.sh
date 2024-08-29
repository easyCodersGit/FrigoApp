source frigotest.sh

TEST "check-alarm"

CASE "success on correct product id"


curl 'http://localhost:9000/users/66cb11d2a7f1c48e5602c7a1/products/66d04f8ffd5577e418672893/checkAlarm' \
-H 'Content-Type: application/json' \
-d '{ "alarmId": "66d0504ae693dfba21088c86"}' \
-v
