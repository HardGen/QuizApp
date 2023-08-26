const sqlite3 = require('sqlite3').verbose()
const md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if(err) {
        console.log(err.message)
        throw err
    } else {
        console.log("Connected to the SQLite database")
        db.run(`
            create table area (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(100)  NOT NULL
            );`)

            db.run(`
            CREATE TABLE user (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               firsname VARCHAR(100) not null,
               lastname VARCHAR(100) not null,
               patronymic VARCHAR(100),
               email varchar(100) unique not null,
               password text not null,
               role varchar(25) not null
           );
       `)

            db.run(`
            CREATE TABLE test (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(100)  NOT NULL,
                area_id smallint,
                ttl smallint default 10,
                user_id integer,
                FOREIGN KEY (area_id) REFERENCES area (id) ON Delete set null
                FOREIGN KEY (user_id) REFERENCES user (id) ON Delete set null
            );`)
            
        db.run(`
            CREATE TABLE question (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                multyTrust boolean default 0,
                desc text not null,
                test_id INTEGER,
                FOREIGN KEY (test_id) REFERENCES test (id) ON DELETE CASCADE
            );
        `)

        db.run(`
            CREATE table answer (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                desc text not null,
                isTrue boolean default 0,
                question_id integer,
                FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE
            );
        `)


        
        db.run(`
            CREATE TABLE statistic (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id integer not null,
                test_id integer not null,
                currentAnswersCount smallint default 0,
                FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
                FOREIGN KEY (test_id) REFERENCES test (id) ON DELETE CASCADE
            )
        `)

    }
})

db.close((err) => {
    if(err) return console.error(err.message)
})