module.exports.cadastro = function (application, req, res){
    res.render('cadastro', {validacao: {}, dadosForm: {}});
}

module.exports.cadastrar = function (application, req, res){
    var dadosForm = req.body;

    req.assert('nome', 'O nome não pode estar vazio.').notEmpty();
    req.assert('nome', 'O nome deve ter entre 5 e 15 caracteres.').len(5, 15);
    req.assert('usuario', 'Usuario não pode estar vazio.').notEmpty();
    req.assert('usuario', 'O usuario deve ter entre 5 a 15 caracteres.').len(5, 15);
    req.assert('senha', 'A senha não pode estar vazio.').notEmpty();
    req.assert('senha', 'A senha deve ter entre 5 a 15 caracteres.').len(5, 15);
    req.assert('casa', 'Selecione sua casa.').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('cadastro', {validacao: erros, dadosForm: dadosForm });
        return;
    }

    var conn = application.config.dbConnection;
    
    var UsuariosDAO = new application.app.models.UsuariosDAO(conn);
    var JogoDAO = new application.app.models.JogoDAO(conn) 


    UsuariosDAO.inserirUsuario(dadosForm);
    JogoDAO.gerarParametros(dadosForm.usuario);

    res.render('index', {validacao: {}});
}