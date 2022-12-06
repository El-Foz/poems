const express=require('express')
const app=express()
const path=require('path')
const sql=require('sqlite3')
app.use(express.static("public"))
const SQLite3 = sql.verbose();
const db = new SQLite3.Database('poems.db');
app.use(express.urlencoded({
    extended: true
}))
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname+'/templates/home.html'))
})
app.get('/getPoemNumber', (req, res)=>{
    db.serialize(async ()=>{
        await db.all(`select id from poems`,[], (err, rows)=>{
            res.redirect(`/poem/${rows.length-1}`)
            res.end()
        })
    })
})
app.listen(8000, ()=>{
    console.log('listening on http://localhost:8000/')
})