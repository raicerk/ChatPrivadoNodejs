let config = require('./config');
const sql = require('mssql');

exports.query = function (Emisor, Receptor, Mensaje) {

    sql.connect(config.cadena, err => {
        
        new sql.Request()
            .input('UsuarioEmisor', sql.VarChar(100), Emisor)
            .input('UsuarioReceptor', sql.VarChar(100), Receptor)
            .input('Mensaje', sql.Text, Mensaje)
            .execute('spIns_Intranet_RegistraChat', (err, result) => {
                console.dir(result);
                sql.close();
            })
    });

    sql.on('error', err => {
        console.log('error:' + err);
    });    
};