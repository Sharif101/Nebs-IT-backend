backend/
│
├── config/
│ └── db.js # MongoDB connection setup
│
├── controllers/
│ └── userController.js # Example controller for CRUD operations
│
├── models/
│ └── userModel.js # Mongoose schema
│
├── routes/
│ └── userRoutes.js # Express routes
│
├── .env # Environment variables
├── .gitignore
├── package.json
├── server.js # Entry point of the application
└── README.md

node -v
npm -v

mkdir backend
cd backend
npm init -y

npm install express mongoose dotenv

npm install --save-dev nodemon

"scripts": {
"start": "node server.js",
"dev": "nodemon server.js"
}

PORT=5000
MONGO_URI=your_mongodb_connection_string
