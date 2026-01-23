# 📘 Backend API Contracts

## Base URL

http://localhost:8080


## Auth

Authorization: Bearer <JWT_TOKEN>

# 🧩 Product APIs (ADMIN)
## Create Product

POST /api/products

### Request

{
"name": "string",
"category": "string",
"price": number,
"stockQuantity": number
}


### Response

201 Created

## Get Products

GET /api/products

### Response

[
{
"id": number,
"name": "string",
"category": "string",
"price": number,
"stockQuantity": number,
"createdAt": "datetime"
}
]

## Get Products (Paginated)

GET /api/products/page

## Query Params

- page (default: 0)

- size (default: 10)

- sortBy (id | price | name)

### Response

Spring Page<Product>

Low Stock Products

GET /api/dashboard/low-stock

## Query Params

## threshold (default: 5)

### Response

[
{
"id": number,
"name": "string",
"stockQuantity": number
}
]

# 🛒 Customer Order APIs (CUSTOMER)
## Place Order

POST /api/customer/orders

### Request

{
"totalAmount": number
}


### Response

{
"id": "uuid",
"status": "PLACED",
"totalAmount": number,
"createdAt": "datetime"
}

## Add Items to Order

POST /api/customer/orders/{orderId}/items

### Request

{
"items": [
{
"productId": "uuid",
"quantity": number
}
]
}


### Response

200 OK
Order items added successfully

## Get Customer Orders (Pagination + Sorting + Filter)

GET /api/customer/orders

## Query Params

page (default: 0)

size (default: 5)

sortBy (createdAt | totalAmount | status)

sortDir (asc | desc)

status (optional: PLACED, CONFIRMED, SHIPPED, DELIVERED, CANCELLED)

### Response

{
"content": [
{
"id": "uuid",
"status": "PLACED",
"totalAmount": number
}
],
"totalPages": number,
"totalElements": number
}

## Cancel Order (Customer)

PUT /api/customer/orders/{orderId}/cancel

### Rules

Only PLACED or CONFIRMED

Only own orders

### Response

200 OK
Order cancelled successfully

# 🛠️ Admin Order APIs (ADMIN)
## Get All Orders

GET /api/orders

### Query Params

page

size

sort (example: createdAt,desc)

## Get Order by ID

GET /api/orders/{orderId}

## Update Order Status

PUT /api/orders/{orderId}/status?status=SHIPPED

### Allowed Flow

PLACED → CONFIRMED → SHIPPED → DELIVERED

## Cancel Order (Admin)

PUT /api/orders/{orderId}/cancel

## Get Orders by Status

GET /api/orders/status?status=CONFIRMED

### ⚠️ Error Response Format
{
"timestamp": "datetime",
"status": 403,
"error": "Forbidden",
"message": "Access denied",
"path": "/api/..."
}

# 🌐 CORS & Headers (Frontend)

## Required Headers

Authorization: Bearer <JWT>
Content-Type: application/json


## Allowed Origins

http://localhost:3000
http://localhost:5173

# Customer Profile APIs

## Get My Profile
GET /api/customer/profile

Headers:
Authorization: Bearer <JWT>

Response:
{
"name": "string",
"email": "string",
"role": "CUSTOMER",
"enabled": boolean
}


## Update My Profile
PUT /api/customer/profile

Headers:
Authorization: Bearer <JWT>

Request:
{
"name": "string"
}

Response: 200 OK
Profile updated successfully


## Change Password
PUT /api/customer/profile/password

Headers:
Authorization: Bearer <JWT>

Request:
{
"currentPassword": "string",
"newPassword": "string"
}

Response: 200 OK
Password changed successfully

## Forgot Password

POST /auth/forgot-password

Request:

{
"email": "string"
}


Response: 200 OK
Reset token generated (check logs)

## Reset Password

POST /auth/reset-password

Request:

{
"token": "string",
"newPassword": "string"
}


Response: 200 OK
Password reset successfully
