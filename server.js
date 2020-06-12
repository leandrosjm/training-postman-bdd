const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const port = 3000;
let db= require('./db.js')

const __SESSION = (req, res, next) =>{
    var token = req.headers['x-access-token'];
    console.log('token', token);
    if(!token || token == null){
        return res.status(401).json({ message: 'Not Authorized' }); 
    }
    req.user = {
        cpf: req.cpf
    }
    next();
}

app.use(bodyParser.json({ limit: '10mb', type: 'application/json' }));

app.post('/auth', (req, res)=>{
    let user = db.users.find(x=>x.cpf == req.body.cpf && x.password == req.body.password);
    if(user){
        return res.json({token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'});
    }
    res.status(401).json({
        message:'Not Authorized'
    });

});


app.get('/users', __SESSION, (req, res)=>{
    res.json(db.users)
});

app.get('/users/:cpf',__SESSION, (req, res)=>{
    const user = db.users.find(x=>x.cpf == req.params.cpf);
    res.json(user);
});

app.post('/users', (req, res)=>{
    req.body.id = Math.floor(Math.random()*1000);
    let user = db.users.find(x=>x.cpf == req.body.cpf)
    if(user){
        return res.status(409).json({message:'The user already exists!'})
    }
    db.users.push(req.body);
    res.json(req.body);
});

app.put('/users/:cpf', __SESSION, (req, res)=>{
    let user = db.users.find(x=>x.cpf == req.params.cpf);
    user.name = req.body.name;
    user.age = req.body.age;
    res.json(user);
});

app.delete('/users/:cpf',__SESSION,  (req, res)=>{
    db = db.users.filter(x=>x.cpf != req.params.cpf);
    res.json({ delete:true });
})


app.get('/payments/:cpf', __SESSION, (req, res)=>{

    const payments = db.payments.find(x=>x.user.cpf == req.params.cpf);
    res.json(payments);
});


app.listen(port, ()=>{
    console.log('Open', {
        domain:'localhost',
        port:port   
    })
})