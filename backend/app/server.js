/**
 * Configuracion principal de la API
 */
const express = require('express');
const app = express();
const cors = require('cors');
const { sequelize } = require('./models/index')

//settings 
const PORT = process.env.PORT;

// Implementamos de que origen vamos a permitir que nos hagan request
const corsOption = { origin: '*', optionSucessStatus: 200 };
app.use(cors(corsOption));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({}));

// Routes
app.use(require('./routes'));


app.listen(PORT, function (req, res) {
    console.log('API corriendo en PUERTO:', PORT);

    sequelize.authenticate().then(() => {
        console.log('Coexión a BASE DE DATOS establecida')
    })

});