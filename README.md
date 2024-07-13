# <span style="color: #3CD9F5;">**FrigoApp**</span>

## <span style="color: #FA72BA;">**Description**</span>

FrigoApp is an inventory management application for your refrigerator. It helps you keep track of the food you have, its expiration date, generate automatic shopping lists, and recipe suggestions based on available ingredients!

![](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjY1NmN5NnhsbGFxYms4YmlrZ2s3N2VkMzA1NG0wMnphN2JqaThkZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/f3p6ywrpDBbMPpcAH1/giphy.gif)

## <span style="color: #FA72BA;">**Functional Description**</span>

### <span style="color: #FBCD8E;">**Use Cases**</span>

#### <span style="color: #FBCD8E;">Guest</span>

- Access Guest fridge (limited to 20 products)
- Create a fridge (1) that will be deleted upon exiting the app
- Delete the created fridge
- Manually add/remove products to/from the fridge (version 1)
- Notify about products nearing expiration (alarm)
- Access the list of products sorted by expiration date
- Access product by location (drawer)
- Display list of products by drawer
- Automatically generated shopping list based on alerts (when a product is running low)
- Edit shopping list
- Suggested recipes (version 2 - Belén)

#### <span style="color: #FBCD8E;">User</span>

- Access their refrigerators
- Create/delete their refrigerators
- Add/remove products to/from the refrigerator manually (version 1)
- Notify about products nearing expiration (alarm)
- Access the list of products sorted by expiration date
- Access product by location (drawer)
- Display list of products by drawer
- Automatically generated shopping list based on alerts (when a product is running low)
- Edit shopping list
- Edit user profile
- Shared refrigerators (version 2)
- Suggested recipes (version 2 - Belén)

## <span style="color: #FA72BA;">**Technical Description**</span>

### <span style="color: #FBCD8E;">Data Model</span>

#### <span style="color: #FBCD8E;">User</span>

- id (String)
- name (String)
- email (String)
- password (String)

#### <span style="color: #FBCD8E;">Product</span>

- id (String)
- name (String)
- category (enmum) [frutas, verduras ...]
- quantity (number)
- expirationDate (Date)
- location (enum) ['fridge', 'pantry', 'freezer']
- userId (ObjectId)
- addedDate (Date)
- purchased (boolean)

#### <span style="color: #FBCD8E;">Fridge</span>

- id (String)
- userId (ObjectId)
- Drawers (array of drawer.id)
- createdDate (Date)

#### <span style="color: #FBCD8E;">Drawer</span>

- id (String)
- fridgeId (ObjectId)
- name (String)
- products (array of product.id)
- createdDate (Date)

#### <span style="color: #FBCD8E;">Shopping List</span>

- id (ObjectId)
- userId (ObjectId)
- name (String)
- items (array of product.id)
- createdDate (Date)

#### <span style="color: #FBCD8E;">Recipes (version 2)</span>

- id (ObjectId)
- userId (ObjectId)
- name (String)
- ingredients (array of product.id)
- instructions (String)
- prepTime (number)
- cookTime (number)
- dietaryRestrictions (String)

#### <span style="color: #FBCD8E;">Alarm</span>

- id (ObjectId)
- userId (ObjectId)
- productId (ObjectId)
- alertType (enum) ['expiration', 'lowStock']
- message (String)
- alertDate (Date)

### <span style="color: #FBCD8E;">Technologies</span>

- Database: MongoDB
- Backend: Node.js | Express
- Frontend: HTML | React | Tailwind
- Testing: Mocha y Chai
