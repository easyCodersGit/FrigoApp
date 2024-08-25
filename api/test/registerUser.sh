source frigotest.sh

TEST "register-user"

CASE "success on new user added"

curl 'http://localhost:9000/users' \
-H 'Content-Type: application/json' \
-d '{ "name": "Mickey Mouse", "email": "mickey@email.com", "password": "password123"}' \
-v