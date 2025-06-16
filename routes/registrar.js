const express = require('express')
routes = express.Router()
const db = require('../src/db')
const cript = require('../config/encrypt')
routes.get('/register', (req,res)=>
{
    
    if(req.session.data != null)
    {
        res.redirect('/chat')
        return
    }
    errores = req.session.errors
    req.session.errors = []
    res.render('registrarse.html',{site:'registrar usuario','errors':errores})
    
    
})
routes.post('/register',(req,res)=>
{
    if(req.session.data != null)
    {
        res.redirect('/chat')
        return
    }
    const {email,name,last_name,user,password,password_again} = req.body
    if(password_again != password)
    {
        res.redirect('/register')
        req.session.errors.push('error al digitar la contraseña estas no coinciden')
        return
    }
    for (let item in req.body)
    {
        if(req.body[item] == '')
        {
            req.session.errors.push('error al llenar el formulario no se encontro el dato', item)
            res.redirect('/register')
            return
        }
    }
    db.query('select * from usuario where username = ?',[user],async (err,result)=>
    {
        if (err) return res.status(500).send(err);
        if(result.length > 0)
        {
            req.session.errors.push('error al registrarse el usuario este ya esta en nuestra base de datos')
            res.redirect('/register')
            return;
        }
        const passwordEncrypt = await cript.encrypt(password)
        db.query('INSERT INTO usuario(username,upassword,onlineUser,email,uname,lname) VALUES (?,?,true,?,?,?)',[user,passwordEncrypt,email,name,last_name],(err)=>
        {
            if (err) return res.status(500).send(err);
            res.redirect('/login')
        })
    })
    
    
    
})
module.exports = routes