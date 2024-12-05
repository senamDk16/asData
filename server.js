const express = require("express")
const router = require("./backend/router")
const cnx = require("./backend/data")
const app = express()
const port = 5000 | 3000

const createDataBase = ()=>{
    const sql = `
        create table if not exists player (
            id integer primary key autoincrement,
            nom string not null,
            prenoms string not null,
            dateNais string not null,
            genre string not null
        )
    `
    const stament = cnx.prepare(sql)
    stament.run()   
}

createDataBase()

//using
app.use(express.json())
app.use(express.urlencoded({extended : false}))

//router
app.use("/", router)
app.listen(port, ()=>{
    console.log(`htpp://localhost:${port}`)
})