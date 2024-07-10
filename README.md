# FrigoApp

## Descripción

FrigoApp es una aplicación de gestión de inventario para tu nevera. Te ayuda a mantener un seguimiento de los alimentos que tienes, su fecha de caducidad, generar listas de compra automáticas y sugerencias de recetas basadas en los ingredientes disponibles.

![](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjY1NmN5NnhsbGFxYms4YmlrZ2s3N2VkMzA1NG0wMnphN2JqaThkZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/f3p6ywrpDBbMPpcAH1/giphy.gif)

## Funcional Description

### Use Cases

#### Invitado

- Acceder a nevera de Invitados (limitación 20 productos)
- Crear nevera (1) que se eliminará al salir de la app
- Eliminar la nevera creada
- Añadir/eliminar productos a la nevera de manera manual (versión 1)
- Notificar productos próximos a caducar (alarma)
- Acceder a la lista de los productos ordenados por fecha de caducidad
- Acceder a producto por ubicación (cajón)
- Mostrar lista de productos por cajón
- Lista de compra generada automáticamente por alertas (cuando falte x producto )
- Editar lista de la compra
- Recetas sugeridas (versión 2 - Belén)

## Tecnical Description

### Data Model

Usuario

- id (String)
- name (String)
- email (String)
- password (String)

Invitado

Producto

- id (String)
- name (String)
- category (enmum) [frutas, verduras ...]
- quantity (number)
- expirationDate (Date)
- location (enum) ['fridge', 'pantry', 'freezer']
- userId (ObjectId)
- addedDate (Date)
- purchased (boolean)

Nevera

- id (String)
- userId (ObjectId)
- cajones (array of cajon.id)
- createdDate (Date)

Cajón

- id (String)
- fridgeId (ObjectId)
- name (String)
- products (array of product.id)
- createdDate (Date)

Lista de compra

- id (ObjectId)
- userId (ObjectId)
- name (String)
- items (array of product.id)
- createdDate (Date)

Recetas (version 2)

- {
  "\_id": ObjectId,
  "name": String,
  "ingredients": [
  {
  "name": String,
  "quantity": Number,
  "unit": String
  }
  ],
  "instructions": String,
  "prepTime": Number, // in minutes
  "cookTime": Number, // in minutes
  "dietaryRestrictions": [String],
  "userId": ObjectId
  }

Alarma

- id (ObjectId)
- userId (ObjectId)
- productId (ObjectId)
- alertType (enum) ['expiration', 'lowStock']
- message (String)
- alertDate (Date)
