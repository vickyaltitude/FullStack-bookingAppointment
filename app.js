const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.port || 4000;
const bodyParser = require('body-parser');
app.use(express.json());

const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'Welcome@123'
})
const ds = pool.promise();


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/users',(req,res,next)=>{

    ds.execute('SELECT * FROM users')
    .then(prod => {
        let usersds = prod[0];
       res.json(usersds);
    })
    .catch(err => console.log(err))


})

app.get('/',(req,res,next)=>{
   
    res.sendFile(path.join(__dirname,'public','index.html'));
})

app.get('/booking-details',(req,res,next)=>{



    res.sendFile(path.join(__dirname,'public','table.html'));
})

app.post('/posted',(req,res,next)=>{
   
   const name = req.body.name;
   const addEmail = req.body.email;
   const addPhone = req.body.phone;
   const date = req.body.date;
   const time = req.body.time;
   const slot = `${date} ${time}`
   ds.execute('INSERT INTO users (name,phone,email,slot) VALUES (?,?,?,?)',[name,addPhone,addEmail,slot]);
   console.log(ds)
   res.redirect('/booking-details');
   
})

app.listen(PORT,()=> console.log(`Server is running on port${PORT}`));