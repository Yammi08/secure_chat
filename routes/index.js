const express = require('express')

routes = express.Router()
routes.get('/',(req,res)=>
{
    if(req.session.data == null)
    {
        res.redirect('/login')
        return;
    }
    res.redirect('/chat');

})
module.exports = routes