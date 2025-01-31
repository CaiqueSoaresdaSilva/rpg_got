module.exports.index = function (application, req, res){
    res.render('index', {validacao: {}});
}

module.exports.autenticar = function(application, req, res){
    var dadosForm = req.body;
    
    req.assert('usuario', 'Usuario não pode estar vazio').notEmpty();
    req.assert('senha', 'Senha não pode estar vazia').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('index', {validacao: erros});
        return;
    }

    var conn = application.config.dbConnection;
    var UsuariosDAO = new application.app.models.UsuariosDAO(conn);
    

    UsuariosDAO.autenticar(dadosForm, req, res);
}