$(document).ready(function() {
		
		let data = getDataHoje();
		
 
		//var $$ = Dom7;

		$('#calendar').fullCalendar({
				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,basicWeek,basicDay'
				},
				defaultDate: data,
				navLinks: true, // can click day/week names to navigate views
				editable: false,
				eventLimit: true, // allow "more" link when too many events
				events: {
					url: 'http://www.aqcez.com.br/ferramenta/administrativo/sys_agenda/controller.php?agenda=pegarEventosCalendario',
					error: function(){
						alert('Deu erro ao buscar info.');
					}
				},

				eventClick: function(event){
					//alert(event.id);
					var id_user = $('#id_user').val();
					//alert(id_user);


					$.getJSON("http://www.aqcez.com.br/ferramenta/administrativo/sys_agenda/controller.php?agenda=descricaoEvento&id_user="+id_user+"&calendEventId="+event.id, function(data){
						$.each(data, function(key, val){
							
							//alert(val.result);
							if(val.result){

								limparInfo();
								CompletarInfo(val);
								var myApp = new Framework7();
								myApp.popup('.popup-visu');

								if(val.editar){
									addEditDelete(id_user, event.id);
								}else{
									
								}
							}else{
								alert('Você não tem permissão para visualizar');
							}
						});
					});

					/*$.ajax({
						type: 'POST',
						url: "sys_agenda/controller.php?agenda=descricaoEvento"+event.id+"&id_user=&calendEventId="+id_user,
						dataType: 'json',
						success: function(data){
							alert(data.result);
						}
					});*/
				}
		});// Fim da Agenda



		$('#btn_teste').click(function(){
			var myApp = new Framework7();
			alert('Teste funciona!');
			myApp.popup('.popup-visu');
		});

		$('#sair_agenda').click(function(){
			localStorage.removeItem('usuario');
			localStorage.removeItem('senha');

			window.location.href = "index.html";

		});


		
});

function getDataHoje(){
	var dia = new Date();
	var formato = moment(dia).format('YYYY-MM-DD');
	return formato;
	//var dataAtual = dia.getFullYear()+"-"+dia.getMonth()+"-"+dia.getDate();
	//alert(dataAtual);
}

function CompletarInfo(obj){
	$('.nome_evento_visu').append(obj.titulo);
	$('.descInfo').append(obj.desc);
	$('.infoCategoria').append(obj.info);
	$('.nomeInfo').append(obj.nome);
	$('.sobrenomeInfo').append(obj.sobrenome);
	if(obj.presentacao == 1){ $('.projeto_enviado').append('Sim'); }else{ $('.projeto_enviado').append('Não'); }
	$('.tipoInfo').append(obj.info);
	$('.nome_contato').append(obj.nome_contato);
	$('.email_contato').append(obj.email_contato);
	$('.tel_contato').append(obj.tel_contato);
	$('.cargo_contato').append(obj.cargo);
	$('.endereco_contato').append(obj.end_contato);

	$('.dataInfo').append(obj.data);
	$('.h_inicioInfo').append(obj.h_inicio);
	
}


function limparInfo(){
	$('.nome_evento_visu').empty();
	$('.descInfo').empty();
	$('.infoCategoria').empty();
	$('.nomeInfo').empty();
	$('.sobrenomeInfo').empty();
	$('.projeto_enviado').empty();
	$('.tipoInfo').empty();
	$('.nome_contato').empty();
	$('.email_contato').empty();
	$('.tel_contato').empty();
	$('.cargo_contato').empty();
	$('.endereco_contato').empty();
	$('.dataInfo').empty();
	$('.h_inicioInfo').empty();
	$('#id_cale_edit').empty();
}


function addEditDelete(id_user, id_event){
	let btn_editar  = "<a href='#' id='editar_evento'  onclick='editarEvento("+id_user+", "+id_event+")' class='button button-raised button-fill color-green'>Editar</a>";
	let btn_deletar = "<a href='#' id='deletar_evento' onclick='deletarEvento("+id_user+", "+id_event+")' class='button button-raised button-fill color-red'>Deletar</a>";
	console.log('Entrou Editar Deletar');

	$('.btn_gropo_opt').children().remove();
	$('.btn_gropo_opt').append(btn_editar);
	$('.btn_gropo_opt').append(btn_deletar);
}


function editarEvento(id_user, id_cale){
	$.getJSON("http://www.aqcez.com.br/ferramenta/administrativo/sys_agenda/controller.php?agenda=descricaoEvento&id_user="+id_user+"&calendEventId="+id_cale, function(data){
		$.each(data, function(key, val){
			//alert(val.result);
			if(val.result){
				
				var myApp = new Framework7();
				myApp.popup('.popup-editar');

				if(val.editar){
					console.log('Entrou Editar dados');
					preencherEditar(val, id_cale);

				}
			}else{
				alert('Você não tem permissão para visualizar');
			}
		});
	});
}

function preencherEditar(obj, id_cale){

	$('#nome_evento_edit').val(obj.titulo);
	$('#email_evento_edit').val(obj.email_contato);
	$('#telefone_evento_edit').val(obj.tel_contato);
	$('#descricao_evento_edit').val(obj.desc);
	$('#data_evento_edit').val(obj.data);
	$('#hora_evento_edit').val(obj.h_inicio);
	$('#contato_evento_edit').val(obj.nome_contato);
	$('#cargo_evento_edit').val(obj.cargo_contato);
	$('#endereco_evento_edit').val(obj.end_contato);
	$('#id_cale_edit').val(id_cale);

}

function deletarEvento(id_user, id_cale){

	alert('Entrou deletar');
	let confirmar = confirm("Deseja realmente deletar o evento?");
	if(confirmar == true){
			
		$.ajax({
			type: 'POST',
			url: "http://www.aqcez.com.br/ferramenta/administrativo/sys_agenda/controller.php?agenda=apagarCalendario&id_user="+id_user+"&id_cale="+id_cale,
			dataType: 'text',
			success: function(data){
				if(data == 'true'){
					location.reload();
				}else{
					alert('não foi possivel excluir o evento!');
				}
			}
		});

	}else{
		
	}
}


	