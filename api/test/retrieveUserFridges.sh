source frigotest.sh

TEST "retrieve-user-fridges"

CASE "success on correct user id"

curl 'http://localhost:9000/users/66cb11d2a7f1c48e5602c7a1/fridges' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmNiMTFkMmE3ZjFjNDhlNTYwMmM3YTEiLCJpYXQiOjE3MjU5Nzk5MjAsImV4cCI6MTcyNTk4MzUyMH0.NB40AmLFZv_BsxFteJPecdlQPE-ybokpe9bsXB4_VQs' \
-v