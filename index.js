const express=require('express')
const app=express()
const path=require('path')
const sql=require('sqlite3')
app.use(express.static("public"))
require('dotenv').config()
const bodyParser=require('body-parser')
const SQLite3 = sql.verbose();
const db = new SQLite3.Database('poems.db');
//UPDATE `sqlite_sequence` SET `seq` = 0 WHERE `name` = 'poems'; Use to reset autoincrement
app.use(express.urlencoded({
    extended: true
}))
app.use(bodyParser.urlencoded())

app.use(bodyParser.json())
app.all('/', (req, res)=>{
    res.sendFile(path.join(__dirname+'/templates/home.html'))
})
app.get('/getPoemNumber', (req, res)=>{
    db.serialize(async ()=>{
        await db.all(`select id from poems`,[], (err, rows)=>{
            res.redirect(`/poem/${rows.length}`)
            res.end()
        })
    })
})
app.get('/poem/:id', (req, res)=>{
    res.sendFile(path.join(__dirname+'/templates/poems.html'))
})
app.get('/adminpage', (req, res)=>{
    res.sendFile(path.join(__dirname+'/templates/admin.html'))
})
app.post('/getPoemData', (req, res)=>{
    db.serialize(async ()=>{
        let x=await path.parse(req.body.test)
        let y=await Number(x.base)
        await db.all(`select * from poems where id=?`, [y], (err, rows)=>{
            if(err) console.error(err)
            res.send(rows[0])
            res.end()
        })
    })
})
app.post('/newpoem', (req, res)=>{
    if(req.body.pw==process.env.postingkey){
        let x=new Date()
        x=x.toDateString()
        db.all(`insert into poems (title, poem, date) values(?, ?, ?)`, [req.body.title, req.body.poem, x])
        res.redirect('/')
        res.end()
    }
})
app.post('/parsenext', (req, res)=>{
    let x=Number(path.parse(req.body.data).base)
    db.all(`select * from poems`, [], (err, response)=>{
        if(x==response.length){
            res.send({data: 'inapplicable'})
            res.end()
        }else{
            res.send({data: x+1})
            res.end()
        }
    })
})
app.post('/parsebefore', (req, res)=>{
    let x=Number(path.parse(req.body.data).base)
    if(x<=1){
        res.send({data: 'inapplicable'})
        res.end()
    }else{
        res.send({data: x-1})
        res.end()
    }
})
app.listen(8000, ()=>{
    console.log('listening on http://localhost:8000/')
})