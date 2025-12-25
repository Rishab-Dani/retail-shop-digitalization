# Product APIs

## Create Product
POST /api/products

Request:
{
"name": "string",
"category": "string",
"price": number,
"stockQuantity": number
}

Response: 201 Created

## Get Products
GET /api/products

Response:
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

Query Params:
- page (default 0)
- size (default 10)
- sortBy (id, price, name)

Response:
Spring Page<Product>
