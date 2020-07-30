/** IMPORTAR O MONGODB */
var mongo = require('mongodb');

var connMongoDb = function(){
    console.log('Função de conexão');
    var db = new mongo.Db(
        'GoT',
        new mongo.Server(
            'localhost', //STRING DO ENDEREÇO DO SERVIDOR
            27017, //PORTA DE CONEXAO
            {}
        ),
        {}
    );
    
    return db;
};

module.exports = function(){
  return connMongoDb;
}
