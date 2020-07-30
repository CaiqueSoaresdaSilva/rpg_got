module.exports = function(application){
	application.get('/jogo', function(req, res){
		application.app.controllers.controllerJogo.jogo(application, req, res);
	});

	application.get('/sair', function(req, res){
		application.app.controllers.controllerJogo.sair(application, req, res);
	});

	application.get('/suditos', function(req, res){
		application.app.controllers.controllerJogo.suditos(application, req, res);
	});

	application.get('/pergaminhos', function(req, res){
		application.app.controllers.controllerJogo.pergaminhos(application, req, res);
	});

	application.post('/ordenar_acao_sudito', function(req, res){
		application.app.controllers.controllerJogo.ordenar_acao_sudito(application, req, res);
	});
}