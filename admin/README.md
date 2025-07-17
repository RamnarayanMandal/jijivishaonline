# Admin Frontend

## Overview
This is the admin dashboard for Jijivisha Online, built with React and Vite. It allows administrators to manage products, categories, blogs, banners, and more.

## Main Features

- Dashboard with analytics and charts
- Product management (add, edit, delete)
- Category management
- Blog management
- Banner management
- Quick links and gift cards management
- User and order management

## Project Structure

- `src/components/` — Reusable UI components
- `src/Pages/` — Main pages (Dashboard, Products, Categories, etc.)
- `src/Modal/` — Modal dialogs for CRUD operations

## Running Locally

```sh
npm install
npm run dev
```

Or with Docker:

```sh
docker build -t jijivisha-admin .
docker run -p 3000:80 jijivisha-admin
```

## Working Flow

1. Admin logs in via the dashboard.
2. Navigates to different management sections (products, categories, etc.).
3. Performs CRUD operations, which send API requests to the backend.
4. Views analytics and manages site content.
