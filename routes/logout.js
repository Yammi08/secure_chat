const express = require('express')

routes = express.Router()
routes.get('/logout',(req,res)=>
{
    const token = req.session('idUser')
    req.session.destroy(err => {
    if (err) {
      console.log('Error al cerrar sesión:', err);
      return res.status(500).send('Error al cerrar sesión');
    }
    })
    db.query('select idUser,fechaExpiracion from usersessions where cookie = ?', [iduser])
    res.clearCookie('iduser');
    res.redirect('/login');
    res.clearCookie('username')
})
module.exports = routes