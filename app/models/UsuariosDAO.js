function UsuariosDAO(conn){
    this._conn = conn();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    this._conn.open( function(err, mongoClient){
        mongoClient.collection("usuarios", function(err, collection){
            collection.insert(usuario);
        });
    });

}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
    this._conn.open( function(err, mongoClient){
        mongoClient.collection("usuarios", function(err, collection){
            collection.find(usuario).toArray(function(err, result){
                //console.log(result);

                if(result[0] != undefined){
                    req.session.autorizado = true;

                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;
                }

                if(req.session.autorizado == true){
                    res.redirect("jogo");
                }else{
                    res.render("index", {validacao: [{"msg": "Usuario não cadastrado."}]});
                }

            });
            mongoClient.close();
        });
    });
}

module.exports = function(){
    return UsuariosDAO;
}