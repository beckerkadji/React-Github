const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')

app.use(cors())
app.use(express.json());

const db = mysql.createConnection({
     user: 'root',
     host: 'localhost',
     password: 'MOT2p@sse123',
     database: 'employeesystem'
});



//ajout d'un employé dans la base de données
app.post('/create', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query(
        'INSERT INTO employees (name,age,country,position,wage) VALUES (?,?,?,?,?)',
        [name,age,country,position,wage], 
        (err, result) => {
            if(err){
                console.log(err)
            } else {
                res.send('Values Inserted')
            }
        }
    );
}); 


//selection d'employé dans la bd
app.get('/selectemp', (req, res) =>{
    db.query('SELECT * FROM employees', (err, result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
 //suppression dans la bd
 app.delete('/delete/:id',(req, res) =>{
     const id = req.params.id
     db.query('DELETE FROM employees WHERE id= ?',id, (err, result) =>{
        if (err){
            console.log(err)
        } else {
            res.send(result)
        }
     })
 })

//mise à jour dans la bd

//updateName
app.put('/updateName', (req, res) =>{
    const id = req.body.id;
    const name = req.body.name;
    db.query(
        'UPDATE employees SET name = ? WHERE id=?',
        [name,id],
        (err, result) =>{
            if(err){
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})

//updateAge
app.put('/updateAge', (req, res) =>{
    const id = req.body.id;
    const age= req.body.age;
    db.query(
        'UPDATE employees SET age= ? WHERE id =?',
        [age, id],
        (err, result) =>{
            if(err){
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})

//updateCountry
app.put('/updateCountry', (req, res) =>{
    const id = req.body.id;
    const country= req.body.country;
    db.query(
        'UPDATE employees SET country= ? WHERE id =?',
        [country, id],
        (err, result) =>{
            if(err){
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})

//updatePosition
app.put('/updatePosition', (req, res) =>{
    const id = req.body.id;
    const position= req.body.wage;
    db.query(
        'UPDATE employees SET position= ? WHERE id =?',
        [position, id],
        (err, result) =>{
            if(err){
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})

//updateWage
app.put('/updateWage', (req, res) =>{
    const id = req.body.id;
    const wage= req.body.wage;
    db.query(
        'UPDATE employees SET wage= ? WHERE id =?',
        [wage, id],
        (err, result) =>{
            if(err){
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})

//suppression d'un élement de la bd
//app.delete()



app.listen(3001, ()=>{
    console.log('hey, your server in running on port 3001');
})