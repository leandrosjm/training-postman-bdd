const db = {
    users: [
    {
        id:Math.floor(Math.random()*1000),
        name: 'Leandro Pereira',
        age:35,
        cpf:'05146625735',
        password:'a'
    },
    {
        id:Math.floor(Math.random()*1000),
        name: 'José da Silva',
        age:16,
        cpf:'90172222044',
        password:'a'
    },
    {
        id:Math.floor(Math.random()*1000),
        name:'Renata Fonseca',
        age:45,
        cpf:'43820182004',
        password:'a'
        
    }],
    payments:[{
        id:240,
        user:{
            cpf: '05146625735'
        },
        value:5031,
        itens:[
                {
                    id:Math.floor(Math.random()*1000),
                    name:'Tv Samsung 4k',
                    value:4000
                },
                {
                    id:Math.floor(Math.random()*1000),
                    name:'Galaxy S11',
                    value:1000
                },
                {
                    id:Math.floor(Math.random()*1000),
                    name:'Camisa Preta',
                    value:31
                }
            ]
    },
    {
        id:241,
        user:{
            cpf: '90172222044'
        },
        value:5398.26,
        itens:[
                {
                    id:Math.floor(Math.random()*1000),
                    name:'Cama Box Casal',
                    value:1.999
                },
                {
                    id:Math.floor(Math.random()*1000),
                    name:'Panela Inox',
                    value:152.77
                },
                {
                    id:Math.floor(Math.random()*1000),
                    name:'Geladeira Eletrolux',
                    value:3.186
                }
            ]
    }]
}

module.exports = db;