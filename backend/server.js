require('dotenv').config();
const express = require('express');
const cors = require('cors');


const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rotas
app.get('/', (req, res) => {
    res.json({ message: 'Bem-vindo à API do Evenflow'});
});

//Porta
const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    })
