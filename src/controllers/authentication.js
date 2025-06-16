const db = require('../db')
const authentification = (req, res, next) => {
    const session = req.cookies.iduser
    if (!session) {
        res.redirect('/login')
        return
    }

    db.query('select idUser,fechaExpiracion from usersessions where cookie = ?', [session], (err, result) => {
        if (result == [] || result[0].fechaExpiracion == Date.now()) {
            res.redirect('/login')
            return
        }
        if (err)
        {
            console.log(err)
            res.redirect('/login')
            return
        }
        next()
    })
}
module.exports = authentification