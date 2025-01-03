const express = require("express");
const router = express.Router();
const authController = require("../controllers/authentication");
const histController = require("../controllers/history")
const { tokenValidate } = require('../middlewars/tokenValidate');

router.post('/reg',authController.registerUser)
router.post('/login',authController.loginUser)
router.get('/profile',authController.findUserByEmail)
router.get('/users',tokenValidate('admin'),authController.getAllUsers)
router.get('/history',tokenValidate('admin'), histController.getAllHistory)
router.get('/user/:id',authController.findUserByUserId)

module.exports = router;