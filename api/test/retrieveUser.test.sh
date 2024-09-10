source frigotest.sh

TEST "retrieve-user"

CASE "success on correct user id"

curl 'http://localhost:9000/users/66d9fd562cb870f91cfb4949' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmQ5ZmQ1NjJjYjg3MGY5MWNmYjQ5NDkiLCJpYXQiOjE3MjU5NzY5NDIsImV4cCI6MTcyNTk4MDU0Mn0.AlRu3sy1qjEuKzxGHR1k36QVJZVFyaSUciDGShybjYk' \
-v