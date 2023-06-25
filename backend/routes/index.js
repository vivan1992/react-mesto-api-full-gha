const router = require('express').Router();

const { login } = require('../controllers/users');
const { createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { vlaidatorCreateUser } = require('../middlewares/validate');
const cors = require('../middlewares/cors');

router.use(cors);

router.post('/signin', cors, vlaidatorCreateUser, login);
router.post('/signup', cors, vlaidatorCreateUser, createUser);

router.use(auth);

router.use('/users', cors, require('./users'));
router.use('/cards', cors, require('./cards'));
router.use('/', cors, require('./404'));

module.exports = router;
