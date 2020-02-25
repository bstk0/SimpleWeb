function showSaldo(data) {
		//console.log("showExtrato.data:" + data.items );	
		//var qsPeriodo = GetURLParameter('periodo');
		//for ( var key in data.items) {
			//var value = data[key];
			//var value = data.documents[key].fields;
			//var value = data.items[key];
			//console.log(value);
			//if (qsPeriodo != "")
			//	var txtselected = (value.id == qsPeriodo ?  " selected" : "");
			//else
			//	var txtselected = (key == 0 ?  " selected" : "");
			
			$("#saldo").append('<p> Valor: ' + data.valor + '</p><p> Data:' + formatTimestamp(data.data) + '</p>');
		//}
}

function getSaldo() {
	console.log("getExtrato");
	var url = "https://paraio.com/v1/saldo/1143180213983645696";

			$.ajax({
					type : 'GET',
					url : url,
					crossDomain : true,
					headers: { "Authorization": "Anonymous app:dbapp" },
					timeout: 0,  
					//async: false,
					//jsonpCallback: 'cBack',
					contentType : "application/json",
					dataType : 'json',
					success : function(data) {
						console.log("data:" + data.valor);
						showSaldo(data);
					},
					error : function(e) {
						console.log(e.message);
					}
				});
}


function showExtrato(data) {
	 $(".extrato").html('');
	 var html='<table border=1>';
	 //html += '<thead><td>ID1</td><td>TYPE1</td><td>ID2</td><td>TYPE2</td></thead>';
	 //html += '<thead><td>TAG</td><td>DIA</td><td>DESCRICAO</td><td>VALOR</td><td>REALIZADO</td></thead>';
 	 html += '<thead><td>TIPO</td><td>DATA</td><td>VALOR</td><td>SALDO ANTERIOR</td><td>SALDO ATUAL</td><td>COMENTARIO</td></thead>';

	for ( var key in data.items) {

		var value = data.items[key];
		
		html += '<tr>';
		html += '<td>' + value.tipo + '</td>';
		html += '<td>' + formatTimestamp(value.data) + '</td>';
		html += '<td>' + value.valor + '</td>';
		html += '<td>' + value.saldo_anterior + '</td>';
		html += '<td>' + value.saldo_atual + '</td>';
		html += '<td>' + value.comentario + '</td>';
		html += '</tr>';
	}
	html += '</table>';
	$(".extrato").html(html); 

}



function getExtrato() {
//https://paraio.com/v1/movims?sort=properties.data:desc&limit=1
	//var url = "https://paraio.com/v1/movims?sort=properties.data:desc&limit=10";
	var url = "https://paraio.com/v1/movims?sort=timestamp&limit=10";
	
	$.ajax({
			type : 'GET',
			url : url,
			crossDomain : true,
			headers: { "Authorization": "Anonymous app:dbapp" },
			timeout: 0,  
			async: false,
			//jsonpCallback: 'cBack',
			contentType : "application/json",
			dataType : 'json',
			success : function(data) {
				showExtrato(data);
			},
			error : function(e) {
				console.log(e.message);
			}
		});
}

//-----------------------------

function onInit() {
	console.log("onInit");
	getSaldo();
	getExtrato();
}
