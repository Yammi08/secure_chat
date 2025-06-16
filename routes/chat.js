const express = require('express')

routes = express.Router()
routes.get('/chat',(req,res)=>
{
    if(req.session.data == null || req.session.data.username == null || req.session.data.username == '')
    {
        res.redirect('/login')
        return
    }

    res.status(200).render('chat.html',{site:'chat',username:req.session.data.username})
})

module.exports= routes