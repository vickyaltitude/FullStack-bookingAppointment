const path = require('path');



exports.showUsers = (req,res,next)=>{
   
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
};

exports.getUsers = (req,res,next)=>{

    ds.execute('SELECT * FROM users')
    .then(prod => {
        let usersds = prod[0];
       res.json(usersds);
    })
    .catch(err => console.log(err))

}

exports.showBookingDetails = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../public','table.html'));
};

exports.addUser = (req,res,next)=>{
   
    const name = req.body.name;
    const addEmail = req.body.email;
    const addPhone = req.body.phone;
    const date = req.body.date;
    const time = req.body.time;
    const slot = `${date} ${time}`
    ds.execute('INSERT INTO users (name,phone,email,slot) VALUES (?,?,?,?)',[name,addPhone,addEmail,slot]);
    res.redirect('/booking-details');
    
 };

 exports.editUser =  (req, res, next) => {
    const userId = req.params.id;

    ds.execute('SELECT * FROM users WHERE id = ?', [userId])
        .then(([user]) => {
            if (user) {
                res.send(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link href="/style.css" rel="stylesheet">
                        <title>Edit Appointment</title>
                    </head>
                    <body>
                        <main class="form-box">
                            <form action="/edited/${user[0].id}" method="post">
                                <p>
                                    <label for="name">Name:</label>
                                    <input id="name" type="text" name="name" value="${user[0].name}" required>
                                </p>
                                <p>
                                    <label for="phone">Phone:</label>
                                    <input id="phone" type="tel" name="phone" value="${user[0].phone}" required>
                                </p>
                                <p>
                                    <label for="email">Email:</label>
                                    <input id="email" type="email" name="email" value="${user[0].email}" required>
                                </p>
                                <p>
                                    <label for="date">Date:</label>
                                    <input id="date" type="date" name="date" required>
                                </p>
                                <p>
                                    <label for="time">Time:</label>
                                    <input id="time" type="time" name="time" required>
                                </p>
                                <button type="submit">Update</button>
                            </form>
                        </main>
                    </body>
                    </html>
                `);
            } else {
                res.status(404).send('User not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error retrieving user data');
        });
};

exports.showEdited =  (req, res, next) => {
    const userId = req.params.id;
    const { name, phone, email, date, time } = req.body;
    const slot = `${date} ${time}`;

    ds.execute('UPDATE users SET name = ?, phone = ?, email = ?, slot = ? WHERE id = ?', 
               [name, phone, email, slot, userId])
        .then(() => {
            res.redirect('/booking-details');
        })
        .catch(err => {
            console.error(err); 
            res.status(500).send('Error updating user data');
        });
};

exports.deleteUser =  (req, res, next) => {

    const userId = req.params.id;

    ds.execute('DELETE FROM users WHERE id = ?', 
               [userId])
        .then(() => {
            res.redirect('/booking-details');
        })
        .catch(err => {
            console.error(err); 
            res.status(500).send('Error updating user data');
        });
};

exports.editRoute = (req,res,next)=>{
  
    res.sendFile(path.join(__dirname,'../public','edit.html'));
    
 };