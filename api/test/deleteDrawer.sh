source frigotest.sh

TEST "delete-drawer"

CASE "success on delete drawer"



curl 'http://localhost:9000/fridges/66b23297350fe3e6045d6161/drawers/66b23af1a20302a84806b3b5' \
-H 'Content-Type: application/json' \
-X DELETE \
-v