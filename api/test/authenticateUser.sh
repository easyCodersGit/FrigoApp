source frigotest.sh

TEST "authenticate-user"

CASE "success on correct credentials"

curl 'http://localhost:9000/users/auth' \
-H 'Content-Type: application/json' \
-d '{"email": "guestUser@email.com", "password": "password123" }' \
-v