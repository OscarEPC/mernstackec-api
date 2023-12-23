const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const { User } = require('../models/user');

const login = async (req = request, res = response) => {
    const { email, password } = req.body; 
    try {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(400).json({
                msg: "El usuario con ese correo no existe.",
                email,
            })
        }
        if (!user.status) {
            return res.status(400).json({
                msg: "El usuario no esta activo."
            })
        }
        const isPasswordValid = bcryptjs.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                msg: "Correo o contraseña no valida."
            })
        }
        res.status(200).json({
            user
        })
    } catch(error) {
        console.log('error: ', error);
        res.status(500).json({
            msg: "Hable con el administrador."
        });
    }
}

module.exports = {
    login,
}