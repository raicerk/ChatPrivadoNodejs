let config = require('./config');
const sql = require('mssql');

var connection = sql.connect(config.cadena, function (err) {
    if (err) {
        throw err;
    }
});

exports.query = function (Emisor, Receptor, Mensaje) {

    new sql.Request()
        .input('UsuarioEmisor', sql.VarChar(100), Emisor)
        .input('UsuarioReceptor', sql.VarChar(100), Receptor)
        .input('Mensaje', sql.Text, Mensaje)
        .execute('ProcedimientoParaAlmacenarChat', (err, result) => {
            
            if(err){
                console.log('error en la ejecución:' + err);
            }else{
                console.log(result);
            }
        });

    sql.on('error', err => {
        console.log('error:' + err);
    });

};
