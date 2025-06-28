# E-Commerce Platform (Laravel REST API & React Frontend)

**Full-stack e-commerce application** built with a Laravel RESTful API backend and a React.js frontend. Users can browse products with search and filters, add items to an order (shopping cart), and place orders. The backend uses **Laravel (PHP)** with Sanctum for authentication, and the frontend uses **React** with Material UI for a clean, responsive interface.

## Key Features

### Backend (Laravel)

* **Models:** `Product` and `Order` with a many-to-many relationship (`order_product` pivot table).
* **API Endpoints:**

  * `GET /api/products` – Paginated product listing with filters (name, price range, category).
  * `POST /api/orders` – Place a new order (authenticated, with validation).
  * `GET /api/orders/{id}` – View detailed order (authenticated).
* **Features:**

  * Eloquent ORM, validation, and caching.
  * Events and listeners for "Order Placed" event.
  * Laravel Sanctum for SPA authentication.

### Frontend (React)

* **UI Framework:** Bootstrab.
* **Routing:** React Router.
* **Components:** Functional components with Hooks.
* **Pages:**

  * Login
  * Product & Order Page (search, filters, pagination, add to cart, submit order)
  * Order Details Page

### Integration

* React frontend is integrated into the Laravel codebase:

  *`resources/js/` compiled with Vite.

## Getting Started

### Prerequisites

* PHP 8.1+, Node.js 16+, Composer, npm/yarn, MySQL (or other supported DB).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ziadehab74/ecommerce.git
   cd ecommerce
   ```

2. **Backend (Laravel):**

   ```bash
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate
   php artisan db:seed --class=ProductSeeder
   php artisan serve
   ```

3. **Frontend (React):**

   ```bash
   cd resources/js
   npm install
   npm run dev
   ```

4. **Environment (.env):**

   ```dotenv
   APP_URL=http://localhost:8000
   SESSION_DOMAIN=localhost
   SANCTUM_STATEFUL_DOMAINS=localhost
   ```

## Authentication Flow

1. Get CSRF cookie:

   ```js
   await axios.get('/sanctum/csrf-cookie');
   ```
2. Log in:

   ```js
   await axios.post('/api/login', { email, password }, { withCredentials: true });
   ```
3. Authenticated requests include `{ withCredentials: true }`.
4. Log out via `POST /api/logout`.

## API Endpoints

### Products

* `GET /api/products`

### Orders (authenticated)

* `POST /api/orders`

  ```json
  {
    "customer_name": "John Doe",
    "items": [
      { "product_id": 1, "quantity": 2 },
      { "product_id": 3, "quantity": 1 }
    ],
    "shipping_address": "123 Main St",
    "payment_method": "credit_card"
  }
  ```
* `GET /api/orders/{id}`

### Auth

* `POST /api/login`
* `POST /api/logout`
* `GET /sanctum/csrf-cookie`

## Time Tracking

| Task                  | Estimated | Actual  |
| --------------------- | --------- | ------- |
| Setup & Configuration | 2h        | 3h      |
| Backend Development   | 6h        | 6.5h    |
| Frontend Development  | 6h        | 6h      |
| Integration & Testing | 2h        | 2.5h    |
| Documentation         | 1h        | 1h      |
| **Total**             | **17h**   | **19h** |

