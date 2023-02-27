const express = require('express');
const router = express.Router();
const db  = require('../../config/mysql');
const loginValidation  = require('../../app/helpers/validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class LoginController {
    async login(req, res) {
        const getUser = db.query(`SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
            (err, result) => {
                if (err) {
                   throw err;
                }
                if (!result.length) {
                    return res.status(401).send({
                        message: 'User not found!'
                    });
                }
                 // check password
                bcrypt.compare(
                    req.body.password,
                    result[0]['password'],
                    (bErr, bResult) => {
                    // wrong password
                    if (bErr) {
                        throw bErr;
                    }
                    if (bResult) {

                        const token = jwt.sign({id:result[0].id},process.env.JWT_SECRET,{ expiresIn: '2h' });
                        db.query(
                        `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
                        );
                        return res.status(200).send({
                        msg: 'Logged in!',
                        token,
                        user: result[0]
                        });
                    }
                    return res.status(401).send({
                        msg: 'Username or password is incorrect!'
                    });
                    }
                );
            }
        );

    }
}

module.exports = LoginController
