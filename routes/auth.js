const { Router } = require('express');

const { check } = require('express-validator');

const { login, signIn, } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post(
    '/login',
    [
        check('email', 'El correo es requerido.').not().isEmpty(),
        check('password', 'La contraseña es requerida.').not().isEmpty(),
        validateFields,
    ],
    login
);

module.exports = router;