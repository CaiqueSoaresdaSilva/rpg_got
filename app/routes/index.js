module.exports = function(application){
	application.get('/', function(req, res){
		application.app.controllers.controllerIndex.index(application, req, res);
	});

	application.post('/autenticar', function(req, res){
		application.app.controllers.controllerIndex.autenticar(application, req, res);
	});
}