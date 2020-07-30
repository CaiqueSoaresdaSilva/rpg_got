const session = require("express-session");

module.exports.jogo = function (application, req, res){
    if(req.session.autorizado !==true){
        res.render("index", {validacao: [{"msg": "Efetue o login para poder acessar o jogo."}]});
        return;   
    }   

    var msg = '';
    if(req.query.msg != ''){
        msg = req.query.msg;
    }
        
    var conn = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(conn);

    JogoDAO.iniciaJogo(res, req.session.usuario, req.session.casa, msg);

}

module.exports.suditos = function(application, req, res){
    if(req.session.autorizado !==true){
        res.render("index", {validacao: [{"msg": "Efetue o login para poder acessar o jogo."}]});
        return;   
    }   

    res.render("aldeoes", {validacao: {}});
}

module.exports.pergaminhos = function(application, req, res){
    if(req.session.autorizado !==true){
        res.render("index", {validacao: [{"msg": "Efetue o login para poder acessar o jogo."}]});
        return;   
    }   

    /* RECUPERAR AÇOES DO BANCO DE DADOS */
    var conn = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(conn);

    JogoDAO.getAcoes(req.session.usuario);

    res.render("pergaminhos", {validacao: {}});
}

module.exports.sair = function(application, req, res){
    req.session.destroy( function(err){
        res.render("index", {validacao: {}});
    });
}

module.exports.ordenar_acao_sudito = function(application, req, res){
    var dadosForm = req.body;

    req.assert('acao', 'A ação deve ser informada').notEmpty();
    req.assert('quantidade', 'A quantidade deve ser  informada').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.redirect('/jogo?msg=A');
        return;
    }

    var conn = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(conn);

    dadosForm.usuario = req.session.usuario;
    JogoDAO.acao(dadosForm);

    res.redirect('/jogo?msg=B')
}