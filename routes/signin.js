const express = require('express')
const router = express.Router()

const sqlite = require('sqlite3').verbose()
const md5 = require('md5')



router.get('/', (req, res)  => {
    res.render('signin')
})

router.post('/', (req, res) => {
    let {email, password} = req.body

    password = md5(password)

    const db = new sqlite.Database('./db.sqlite', (err) => {
        if(err) return console.error(err.message)

        let sql = `select * from user where email = ?`

        db.get(sql, email, (err, row) => {
            if(err) return console.error(err.message)

            if (row?.email == undefined) {
                return res.render('signin', {
                    error: 'нет такого пользователя'
                })
            }
            
            if(row.password == password) {
                const user = {
                    firstname: row.firstname,
                    lastname: row.lastname,
                    patronymic: row?.patronymic,
                    role: row.role,
                    email: row.email,
                }
                req.session.user = user
                res.redirect('/main')
            } else {
                return res.render('signin', {
                    error: 'неверный пароль'
                })
            }
        })
    })

})

module.exports = router