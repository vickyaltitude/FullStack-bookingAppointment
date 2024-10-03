const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

const path = require('path');
const PORT = process.env.port || 4000;
app.use(express.static(path.join(__dirname,'public')));

const ds = require('./model/users');

const route = require('./route/route');





app.get('/',route.showUsers);

app.get('/users',route.getUsers);

app.get('/booking-details',route.showBookingDetails);

app.post('/posted',route.addUser)

app.get('/edit/:id',route.editUser);

app.post('/edited/:id',route.showEdited);

app.post('/delete/:id',route.deleteUser);

 app.get('/edit',route.editRoute)


app.listen(PORT,()=> console.log(`Server is running on port${PORT}`));