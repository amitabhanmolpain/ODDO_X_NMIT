# H-Care Marketplace

A full-stack marketplace application for students to buy and sell second-hand items.

## Project Structure

```
├── backend/          # Django REST API backend
├── h-care/          # React frontend
└── README.md
```

## Backend Setup (Django)

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

4. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

5. Start the Django development server:
```bash
python manage.py runserver 127.0.0.1:8000
```

Or use the startup script:
```bash
python start_server.py
```

## Frontend Setup (React)

1. Navigate to the frontend directory:
```bash
cd h-care
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/users/signup/` - User registration
- `POST /api/users/login/` - User login
- `GET /api/users/profile/` - Get user profile

### Products
- `GET /api/products/` - List all products
- `POST /api/products/` - Create new product (authenticated)
- `GET /api/products/{id}/` - Get product details
- `GET /api/products/search/?q=query` - Search products

### Orders
- `GET /api/orders/cart/` - Get user's cart
- `POST /api/orders/cart/` - Add item to cart
- `POST /api/orders/checkout/` - Checkout cart
- `GET /api/orders/history/` - Get order history

## Features

- User authentication (signup/login)
- Product listing and browsing
- Search functionality
- Shopping cart
- Order management
- Responsive design
- Real-time cart updates

## Technologies Used

### Backend
- Django 5.0.6
- Django REST Framework
- SQLite database
- JWT authentication
- CORS headers

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router
- Framer Motion

## Development Notes

- Backend runs on `http://127.0.0.1:8000`
- Frontend runs on `http://localhost:5173`
- CORS is configured for development
- JWT tokens are used for authentication
- Local storage is used for cart persistence

## Troubleshooting

1. **CORS Issues**: Make sure both servers are running and CORS settings are correct
2. **Authentication Issues**: Check if JWT tokens are being stored and sent correctly
3. **Database Issues**: Run migrations if you encounter database errors
4. **Port Conflicts**: Change ports in settings if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request