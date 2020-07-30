function JogoDAO(conn){
    this._conn = conn();
}

JogoDAO.prototype.gerarParametros = function(usuario){
    this._conn.open( function(err, mongoClient){
        mongoClient.collection("jogo", function(err, collection){
            collection.insert({
                usuario: usuario,
                moeda: 15,
                suditos: 10,
                temor: Math.floor(Math.random() * 1000),
                sabedoria: Math.floor(Math.random() * 1000),
                comercio: Math.floor(Math.random() * 1000),
                magia: Math.floor(Math.random() * 1000)
            });

            mongoClient.close();
        });
    });
};

JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, msg){
    this._conn.open( function(err, mongoClient){
        mongoClient.collection("jogo", function(err, collection){
            collection.find({usuario: usuario}).toArray(function(err, result){
                //console.log(result[0]);
                res.render('jogo', {img_casa: casa, jogo: result[0], msg: msg});
                mongoClient.close();

            });
        });
    });
};

JogoDAO.prototype.acao = function(acao){
    this._conn.open( function(err, mongoClient){
        mongoClient.collection("acao", function(err, collection){
            
            var date = new Date();
            var tempo = null;
            
            switch(acao.acao){
                case 1: 
                    tempo = 1 * 60 * 60000;
                case 2: 
                    tempo = 2 * 60 * 60000;
                case 3: 
                    tempo = 5 * 60 * 60000;
                case 4: 
                    tempo = 5 * 60 * 60000;
            }

            acao.acao_termina_em = date.getTime() + tempo ;
            collection.insert(acao);

            mongoClient.close();
        });
    });
}

JogoDAO.prototype.getAcoes = function(usuario){
    this._conn.open( function(err, mongoClient){
        mongoClient.collection('acao', function(err, collection){
            collection.find({usuario: usuario}).toArray( function(err, result){
                console.log(result);

                mongoClient.close();
            });
        });
    });
}

module.exports = function(){
    return JogoDAO;
}