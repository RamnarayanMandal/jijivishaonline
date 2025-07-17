# Backend

## Overview
This is the Node.js/Express backend for the Jijivisha Online project. It provides RESTful APIs for admin, user, blogs, quick links, and more.

## Project Structure
- `admin/` — Admin-related controllers, models, and routes
- `blogs/` — Blog management (CRUD)
- `user/` — User management, orders, addresses
- `QuickLink/` — Gift cards and quick link features
- `Perspective/` — Perspective-related features
- `config/` — Database and token configuration
- `middleware/` — Middleware (e.g., authentication, file uploads)
- `uploads/` — Uploaded files and images

## API Documentation

### Authentication
- `POST /admin/login` — Admin login
- `POST /user/login` — User login
- `POST /user/register` — User registration

### Category Management
- `GET /category` — List all categories
- `POST /category` — Add a new category
- `PUT /category/:id` — Update a category
- `DELETE /category/:id` — Delete a category

### Product Management
- `GET /product` — List all products
- `POST /product` — Add a new product
- `PUT /product/:id` — Update a product
- `DELETE /product/:id` — Delete a product

### Blogs
- `GET /blogs` — List all blogs
- `POST /blogs` — Create a new blog
- `PUT /blogs/:id` — Update a blog
- `DELETE /blogs/:id` — Delete a blog

### Orders
- `GET /orders` — List all orders
- `POST /orders` — Create a new order

*(Add more endpoints as needed based on your actual routes)*

## Running Locally

```sh
npm install
npm start
```

Or with Docker:

```sh
docker build -t jijivisha-backend .
docker run -p 5001:5001 jijivisha-backend
```

## Environment Variables

- Configure your database and secrets in `envfile`.

## Working Flow

1. Receives requests from admin/user frontends.
2. Authenticates and authorizes users/admins.
3. Handles CRUD operations for products, categories, blogs, orders, etc.
4. Sends responses back to the frontends.



