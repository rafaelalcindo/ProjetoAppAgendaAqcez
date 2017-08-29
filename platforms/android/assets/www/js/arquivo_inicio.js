$(document).ready(function(){

	if((localStorage.getItem('usuario') != null &&  localStorage.getItem('senha') != null )){
		
		let login = localStorage.getItem('usuario');
		let senha = localStorage.getItem('senha');
		
	    $.ajax({
			type: 'GET',
			//url: "http://aqcez.com.br/ferramenta/administrativo/login/controller.php?login=logarUsuario&usuario=admin&senha=pokemaster",
			url: "http://www.aqcez.com.br/ferramenta/administrativo/login/controller.php?login=logarUsuario&usuario="+login+"&senha="+senha,
			crossDomain: true,
			cache: false,
			dataType: 'json',
			beforeSend: function(){
				var myApp = new Framework7();
				myApp.showPreloader('Carregando!');
			    setTimeout(function () {
			        myApp.hidePreloader();
			    }, 3000);
			},
			success: function(data){
				if(data.logar == true){
					localStorage.setItem('usuario', login);
					localStorage.setItem('senha', senha);

					registrarGCM(login, senha, localStorage.getItem('gcm'));

					if(data.logar == true){
						window.location.href = "agenda.html";
					}else{
						alert('Falha ao fazer login');
					}

				}else{
					alert('falha de login, verifique se seu usuário ou senha estão corretos!');
				}
			}, // fim da função success
			error: function(request){
				alert(request);
				alert("Erro ao Conectar");
			}
		});

	}



	$('#entrar').click(function(){
		let login = $('#login').val();
		let senha = $('#senha').val();

		if(login.trim() != '' && senha.trim() != ''){

			$.ajax({
				type: 'GET',
				//url: "http://aqcez.com.br/ferramenta/administrativo/login/controller.php?login=logarUsuario&usuario=admin&senha=pokemaster",
				url: "http://www.aqcez.com.br/ferramenta/administrativo/login/controller.php?login=logarUsuario&usuario="+login+"&senha="+senha,
				crossDomain: true,
				cache: false,
				dataType: 'json',
				beforeSend: function(){
					var myApp = new Framework7();
					myApp.showPreloader('Carregando Informações!');
				    setTimeout(function () {
				        myApp.hidePreloader();
				    }, 3000);
				},

				success: function(data){
					if(data.logar == true){
						localStorage.setItem('usuario', login);
						localStorage.setItem('senha', senha);

						registrarGCM(login, senha, localStorage.getItem('gcm'));						

						if(data.logar == true){
							window.location.href = "agenda.html";
						}else{
							alert('Falha em fazer login');
						}

					}else{
						alert('falha de login, verifique se seu usuário ou senha estão corretos!');
					}
				}, // fim da função success
				error: function(request){
					alert(request);
					alert("Erro ao Conectar");
				}
			});


		}else{ alert('Por favor preencha todos os campos'); }

		
	});

	function registrarGCM(login, senha, gcm){
		//alert(gcm);
		
		$.ajax({
			type: 'GET',
			url: "http://www.aqcez.com.br/ferramenta/administrativo/login/controller.php?login=registrarGCM&usuario="+login+"&senha="+senha+"&gcm="+gcm,
			crossDomain: true,
			cache: false,
			dataType: 'text',
			success: function(data){
				//alert(data);
				if(data == 'true'){
					resu_back = 'true';
					
				}else{
					resu_back = 'false';
				}
			},
			error: function(request){
								
			}
		});		
	}

});

