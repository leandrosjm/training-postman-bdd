const express = require('express');
const app = express();
var bodyParser = require('body-parser')
let port = process.env.PORT || 3000;
let db = require('./db.js');

app.use(bodyParser.json({ type: 'application/json' }));

const __SESSION = (req, res, next) =>{
    var token = req.headers['x-access-token'];
    //console.log('token', token);
    if(!token || token == null){
        return res.status(401).json({ message: 'Not Authorized' }); 
    }
    req.user = {
        cpf: req.cpf
    }
    next();
}

app.post('/auth', (req, res)=>{
    try {
        let user = db.users.find(x=>x.cpf == req.body.cpf && x.password == req.body.password);
        if(user){
            return res.json({token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'});
        }
        res.status(401).json({
            message:'Not Authorized'
        });
    } catch (error) {
        res.status(500).json({message:'Error on Auth'})
    }
});


app.get('/users', __SESSION, (req, res)=>{
    try {
        res.json(db.users)
    } catch (error) {
        res.status(500).json({message:'Error on list of users'});
    }
    
});

app.get('/users/:cpf',__SESSION, (req, res)=>{
    try {
        const user = db.users.find(x=>x.cpf == req.params.cpf);
        if(user) res.json(user);
        else res.json({message:'Not found'});
    } catch (error) {
        res.status(500).json({message:'Error on get user'});
    }
    
});

app.post('/users', (req, res)=>{
    try {
        req.body.id = Math.floor(Math.random()*1000);
        db.users = db.users || [];
        let user = db.users.find(x=>x.cpf == req.body.cpf)
        if(user){
            return res.status(409).json({message:'The user already exists!'})
        }
        db.users.push(req.body);
        res.json(req.body);
    } catch (error) {
        res.status(500).json({message:'Error on save the user'}); 
    }
});

app.put('/users/:cpf', __SESSION, (req, res)=>{
    try {
        let user = db.users.find(x=>x.cpf == req.params.cpf);
        user.name = req.body.name;
        user.age = req.body.age;
        res.json(user);
    } catch (error) {
        res.status(500).json({message:'Error on update the user'}); 
    }
});

app.delete('/users/:cpf',__SESSION,  (req, res)=>{
    try {
        if(req.params.cpf){
            db.users = db.users.filter(x=>x.cpf != req.params.cpf);
            return res.json({ delete:true });
        }
        res.json({ delete:false });
    } catch (error) {
        res.status(500).json({message:'Error on delete the user'}); 
    }
})


app.get('/payments/:cpf', __SESSION, (req, res)=>{
    try {
        const payments = db.payments.find(x=>x.user.cpf == req.params.cpf);
    res.json(payments);
    } catch (error) {
        res.status(500).json({message:'Error on get the payments of user'}); 
    }
});



app.get('/items', (req, res)=>{
    try {
    res.json([]);
    } catch (error) {
        res.status(500).json({message:'Error on get the payments of user'}); 
    }
});



app.get('/payments/', (req, res)=>{
    try {
        res.json(db.payments);
    } catch (error) {
        res.status(500).json({message:'Error on get all payments'});
    }
});


app.get('/payments/:id/itens', (req, res)=>{
    try {
        let payment = db.payments.find(x=>x.id == req.params.id);
        console.log('payment', payment)
        if(payment){
            return res.json(payment.itens);
        }

        res.json({ message: "Not found"})
        
    } catch (error) {
        res.status(500).json({message:'Error on get all payments'});
    }
});


app.listen(port, ()=>{
    console.log('Open', {
        domain:'localhost',
        port:port   
    })
})