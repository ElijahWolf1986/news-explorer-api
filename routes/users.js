const router = require('express').Router();
const { getUserInfo } = require('../controllers/users');
// const { validateGetUser } = require('../middlewares/validationJoi');

router.get('/me', getUserInfo); //todo: add a validateGetUserInfo

module.exports = { router };
