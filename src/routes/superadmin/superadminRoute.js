const express = require('express');
const router = express.Router();
const {
  listAdminUsersWithTickets,
  getAdminTickets,
} = require('../../controllers/superadmin/superadminController');

const authenticateToken = require('../../middlewares/authenticationMiddleware');

router.get('/users/', authenticateToken, listAdminUsersWithTickets);

router.get('/admin/:userId', authenticateToken, getAdminTickets);

module.exports = router;
