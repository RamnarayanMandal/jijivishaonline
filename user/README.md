# User Frontend

## Overview
This is the user-facing frontend for Jijivisha Online, built with React and Vite. It allows users to browse products, place orders, read blogs, and manage their accounts.

## Main Features

- Home page with featured products and banners
- Product catalog and details
- Shopping cart and checkout
- User registration and login
- Order history and account management
- Blog articles and quick links

## Project Structure

- `src/components/` — UI components (Navbar, Product, Cart, etc.)
- `src/Pages/` — Main pages (Home, Product Details, Cart, etc.)
- `src/Modal/` — Modal dialogs for user actions

## Running Locally

```sh
npm install
npm run dev
```

Or with Docker:

```sh
docker build -t jijivisha-user .
docker run -p 3001:80 jijivisha-user
```

## Working Flow

1. User visits the site and browses products.
2. Adds products to the cart and proceeds to checkout.
3. Registers or logs in to place an order.
4. Manages orders and account details.
5. Reads blogs and uses quick links.
