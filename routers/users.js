const express = require('express');
const router = express.Router();

const {showCurrentUser, updateUser, updateUserPassword} = require('../controllers/users.js');

router.route('/showCurrentUser').get(showCurrentUser);
router.route('/updateUser').patch(updateUser);
router.route('/updateUserPassword').patch(updateUserPassword);

module.exports = router;