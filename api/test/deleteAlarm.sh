source frigotest.sh

TEST "delete-alarm"

CASE "success on delete alarm"



curl 'http://localhost:9000/users/66cb11d2a7f1c48e5602c7a1/alarms/66d03934bd6527fac4cd674d' \
-H 'Content-Type: application/json' \
-X DELETE \
-v