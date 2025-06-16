const express = require('express')
routes = express.Router()
const db = require('../src/db')
const cript = require('../config/encrypt');
const usersession = require('../config/usersession')

routes.get('/login', (req, res) => {
    if(req.session.data != null)
    {
        res.redirect('/chat')
        return
    }
    errores = req.session.errors
    req.session.errors = [];
    res.render('inicio_sesion.html', { site: 'chat', 'errors': errores })
})

routes.post('/login', async (req, res) => {

    const { user, password } = req.body

    db.query('select * from usuario where username = ?', [user], async (err, result) => {
        if (result.length == 0 || ! await cript.compare(password, result[0].upassword)) {
            req.session.errors.push('error al digitar la contraseña o el usuario')
            res.redirect('/login')
            return
        }
        cookietime = 24000 * 60 * 60 * 2
        cookieExp = new Date( Date.now() + cookietime)
        if (err) return res.status(500).send(err);
        token = usersession.generateToken()
        req.session.data = {
            'id': result[0].idUser,
            'username': result[0].username
        }
        res.cookie('iduser', token, {
            maxAge: cookietime,
            sameSite: 'Strict',
            secure: false,
        })
        res.cookie('username', result[0].username, {
            maxAge: cookietime,
            sameSite: 'Strict',
            secure: false,
        })
        db.query('insert into usersessions(idUser,cookie,fechaExpiracion) values(?,?,?)', [result[0].idUser,token,cookieExp], (err, result) => {if(err) console.log(err)})
        res.redirect('/chat')
    })

})
module.exports = routes