var express = require('express');
var app = express();
var PORT = 3000;
var cors = require('cors');

// implementamos de que origen vamos a permitir que nos hagan request
var corsOption = { origin: '*', optionSucessStatus: 200 };
app.use(cors(corsOption));

// ruteos middlewares
//var routerDisp = require('./routes/dispositivo');

app.use(express.json());
//app.use('/api/dispositivo', routerDisp);


app.listen(PORT, function (req, res) {
    console.log("API Funcionando ");
});