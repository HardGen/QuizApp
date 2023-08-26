const express = require('express')
const router = express.Router()

const sqlite = require('sqlite3').verbose()
const md5 = require('md5')


router.get('/', function(req, res) {
    res.render('signup')
})

router.post("/", function(req, res) {
    const db = new sqlite.Database('./db.sqlite', (err) => {
        if (err) {
            console.error(err.message)
             res.send(err.message)
             return
        }
        
        let sql = `SELECT email FROM user where email = ?`
        let {email} = req.body

        db.get(sql, email, (err, row) => {
            if(err) return console.error(err.message)
            if(row?.email) {
                res.render('signup', {
                    error: 'Такой пользователь существует'
                })
            } else {
                let sql_insert = req.body.patronymic ? `
                insert into user(firsname, lastname, patronymic, email, password, role)
                    values(?, ?, ?, ?, ?, ?)` :
                    `insert into user(firsname, lastname, password, email, role)
                        values(?, ?, ?, ?, ?)`
                
                let {firstname, lastname, password, role} = req.body
                password = md5(password)
                if(req.body.patronymic) {
                    const {patronymic} = req.body
                    db.run(sql_insert, [firstname, lastname, patronymic, email, password, role], function(err) {
                        if(err) return console.error(err.message)
                        res.redirect('signin')
                    })
                } else {
                    db.run(sql_insert, [firstname, lastname, password, email, role], function(err) {
                        if(err) return console.error(err.message)
                        res.redirect('signin')
                    })
                }
                
            }
        })
    })
})

module.exports = router