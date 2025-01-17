const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4100;
const jwt = require('jsonwebtoken');
const { authenticateDatabase } = require('./src/config/migration');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
authenticateDatabase();
const SocketService = require('./src/services/socketService');
require('./src/models/relations.js');
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Expose-Headers", "X-FileName");
  next();
});

// Crear evaluaciones
app.use('/api/appsession', require('./src/routes/users/appSessioinRoutes.js'));
app.use('/api/auth', require('./src/routes/auth/auth-route.js'));
app.use('/api/users', require('./src/routes/users/userRoute.js'));
app.use('/api/typeclients', require('./src/routes/client/typeClientRoute.js'));
app.use('/api/campaigns', require('./src/routes/client/campaignRoute.js'));
app.use('/api/typemanagement', require('./src/routes/management/typeManagementRoute.js'));
app.use('/api/detailmanagement', require('./src/routes/management/detailManagementRoute.js'));
app.use('/api/ticket', require('./src/routes/ticket/requestRoute.js'));
app.use('/api/admin-managements', require('./src/routes/management/adminManagementRoute.js'));

SocketService(server);


server.listen(PORT, () => {
  console.log(`Server is running 🚀`);
});

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD);
