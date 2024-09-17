source frigotest.sh

TEST "delete-guest-fridges"

CASE "success on delete guest fridges"



curl 'http://localhost:9000/users/66cb11d2a7f1c48e5602c7a1/fridges' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmNiMTFkMmE3ZjFjNDhlNTYwMmM3YTEiLCJpYXQiOjE3MjY1MTc0OTgsImV4cCI6MTcyNjUyMTA5OH0.ANVyFSVllY4jGnmS7Vukde2FJ9WUYtQQvK3MYWWfiFs' \
-X DELETE \
-v