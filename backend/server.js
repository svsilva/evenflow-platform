require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/config/database');

//Importação das rotas
const usuarioRoutes = require('./src/routes/usuario.routes');


const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rotas
app.use('/api/usuarios', usuarioRoutes);


//Rota de confirmação de teste
app.get('/', (req, res) => {
    res.json({ message: 'Bem-vindo à API do Evenflow'});
});

//Sincronização com o banco de dados
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Banco de dados sincronizado');
    })
    .catch(err => {
        console.error('Erro ao sincronizar banco de dados:', err);
    })

//Porta
const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    })
