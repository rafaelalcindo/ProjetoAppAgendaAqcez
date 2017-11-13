$(document).ready(function() {
	
	let usuario = localStorage.getItem('usuario');
	let senha   = localStorage.getItem('senha');

	//alert("Usuario: "+usuario+" Senha: "+senha);
	verificaLogin(usuario, senha);


	$('#salvar_evento').click(function(){
		let nome_evento  	 = $('#nome_evento').val();
		let email_evento 	 = $('#email_evento').val();
		let telefone_evento  = $('#telefone_evento').val();
		let descricao_evento = $('#descricao_evento').val();
		let data_evento		 = $('#data_evento').val();
		let hora_evento		 = $('#hora_evento').val();
		let apresent_evento  = $("input[name='apresentacao_evento']").val();
		let contato_evento	 = $('#contato_evento').val();
		let cargo_evento 	 = $('#cargo_evento').val();
		let endereco_evento	 = $('#endereco_evento').val();
		let tipo_evento		 = $('#tipo_evento').val();
		let quem_vai_evento	 = $('#quem_vai_evento').val();
		let resp_cad_evento  = $('#id_user').val();

		console.log("Nome do evento: "+nome_evento);
		console.log("Email do evento: "+email_evento);
		console.log("Telefone do evento: "+telefone_evento);
		console.log("Descrição do evento: "+descricao_evento);
		console.log("Data Evento: "+data_evento);
		console.log("Hora Evento: "+hora_evento);
		console.log("Apresentação do evento: "+apresent_evento );
		console.log("Contato do evento: "+contato_evento);
		console.log("Cargo do evento: "+cargo_evento);
		console.log("Endereço do evento: "+endereco_evento);
		console.log("Tipo do evento: "+tipo_evento);
		console.log("Quem vai no Evento: "+quem_vai_evento);

		let data_agenda_cad = new FormData();

		data_agenda_cad.append('titulo_event', nome_evento);
		data_agenda_cad.append('desc_event', descricao_evento);
		data_agenda_cad.append('info_event', tipo_evento);
		data_agenda_cad.append('data_event', data_evento);
		data_agenda_cad.append('hora_event_ini', hora_evento);
		data_agenda_cad.append('quem_vai', quem_vai_evento);
		data_agenda_cad.append('resp_cad', resp_cad_evento);

		data_agenda_cad.append('tel_contato',telefone_evento);
		data_agenda_cad.append('nome_contato', contato_evento);
		data_agenda_cad.append('end_contato', endereco_evento);
		data_agenda_cad.append('cargo_contato', cargo_evento);
		data_agenda_cad.append('email_contato', email_evento);
		data_agenda_cad.append('enviar_presenta', apresent_evento);

		if(nome_evento.trim() != '' && descricao_evento.trim()  != '' && data_evento.trim() != '' && hora_evento.trim() != '' 
			&& contato_evento.trim() != ''  && tipo_evento.trim() != '' && quem_vai_evento.trim() != ''){

			$.ajax({
				type: 'POST',
				processData: false,
				contentType: false,
				data: data_agenda_cad,
				url: "http://www.aqcez.com.br/ferramenta/administrativo/sys_agenda/controller.php?agenda=salvarAgenda",
				dataType: 'json',
				success: function(data){
					//console.log(data);
					location.reload();
					console.log('Gravou os dados');
				}

			});

		}else{
			alert("Por favor Digite todos os campos");
		}		

	});


	// ----------------------------------------- Editar Evento ---------------------------------------

	$('#editar_evento').click(function(){

		alert('clicou em editar!');

		let nome_evento_edit  	  = $('#nome_evento_edit').val();
		let email_evento_edit 	  = $('#email_evento_edit').val();
		let telefone_evento_edit  = $('#telefone_evento_edit').val();
		let descricao_evento_edit = $('#descricao_evento_edit').val();
		let data_evento_edit	  = $('#data_evento_edit').val();
		let hora_evento_edit	  = $('#hora_evento_edit').val();
		let apresent_evento_edit  = $("input[name='apresentacao_evento_edit']").val();
		let contato_evento_edit	  = $('#contato_evento_edit').val();
		let cargo_evento_edit	  = $('#cargo_evento_edit').val();
		let endereco_evento_edit  = $('#endereco_evento_edit').val();
		let tipo_evento_edit	  = $('#tipo_evento_edit').val();
		let quem_vai_evento_edit  = $('#quem_vai_evento_edit').val();
		let id_calendario		  = $('#id_cale_edit').val();

		let data_agenda_edit = new FormData();

		data_agenda_edit.append("titulo_event_edit", nome_evento_edit);
		data_agenda_edit.append("email_edit", email_evento_edit);
		data_agenda_edit.append("tel_contato_edit", telefone_evento_edit);
		data_agenda_edit.append("desc_event_edit", descricao_evento_edit);
		data_agenda_edit.append("data_event_edit", data_evento_edit);
		data_agenda_edit.append("hora_event_ini_edit", hora_evento_edit);
		data_agenda_edit.append("apresent_edit", apresent_evento_edit);
		data_agenda_edit.append("nome_contato_edit", contato_evento_edit);
		data_agenda_edit.append("cargo_contato_edit", cargo_evento_edit);
		data_agenda_edit.append("end_contato_edit", endereco_evento_edit);
		data_agenda_edit.append("info_event_edit", tipo_evento_edit);
		data_agenda_edit.append("quem_vai_edit", quem_vai_evento_edit);
		data_agenda_edit.append("cale_event", id_calendario);

		if(nome_evento_edit.trim() != '' && descricao_evento_edit.trim() != '' 
		  && data_evento_edit.trim() != '' && hora_evento_edit.trim() != '' && contato_evento_edit.trim() != ''  
		  && tipo_evento_edit.trim() != '' && quem_vai_evento_edit.trim() != '' ){

			$.ajax({
				type: 'POST',
				processData: false,
				contentType: false,
				data: data_agenda_edit,
				url: "http://www.aqcez.com.br/ferramenta/administrativo/sys_agenda/controller.php?agenda=alterarAgenda",
				dataType: 'text',
				success: function(data){
					if(data == 'true'){
						location.reload();
					}
				}

			});

		}else{
			alert('Por favor Digite todos os Campos');
		}

		


	});
		
});

	function verificaLogin(login, senha){
			$.ajax({
				type: "GET",
				url: "http://www.aqcez.com.br/ferramenta/administrativo/login/controller.php?login=sessionUsuarioPhone&usuario="+login+"&senha="+senha,
				dataType: "json",
				success: function(data){

					if(data != null){
						//alert(data);
						//alert(data.id);
						$('#id_user').val(data.id);
						if(data.nivel == 1 && data.position == 1){

						}else{
							
						}

						ModalListVend(data.id);
						
					}else{
						window.location.href = 'index.html';
					}

				}
			}).fail(function(data){
				window.location.href = 'index.html';
			});
	}

	function ModalListVend(id_user){
		$.ajax({
			type: 'POST',
			url: "http://www.aqcez.com.br/ferramenta/administrativo/sys_agenda/controller.php?agenda=pegarNomeReuni&idUser="+id_user,
			dataType: 'json',
			success: function(data){
				$.each(data, function(key,val){
					let nomeVend = "<option value="+val.id+">"+val.nome+" "+val.sobrenome+"</option>";
					$('#quem_vai_evento').append(nomeVend);
					$('#quem_vai_evento_edit').append(nomeVend);
				});
			}

		});
	}