function showSaldo(data) {
	$("#saldo").append('<p> Valor: ' + data.valor + ' - Data: ' + formatTimestamp(data.data) + '</p>'+
			'<input type=hidden name=saldo_atual id=saldo_atual value=' + data.valor + '>');
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
	 var html='* exibe 10 ultimas linhas somente <br><table border=1>';
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

function postMovimento() {
	
var saldoAtual = $("#saldo_atual").val();	

//alert("Saldo Atual:" + saldoAtual);
	
var valor = $("#valor").val();
var tipo = $("#tipom").val();
var data = new Date($("#data").val() + " 09:00:00").getTime();
var comentario = $("#comentario").val();

var novoSaldo;

if (tipo == 'C') {
	novoSaldo = parseNumero(saldoAtual) + parseNumero(valor);
} else {
	novoSaldo = parseNumero(saldoAtual) - parseNumero(valor);
}

var MovimJ = {
  "type": "movim",
  "tipo": tipo,
  "data": data,
  "saldo_atual": novoSaldo,
  "valor": valor,
  "saldo_anterior": saldoAtual,
  "comentario": comentario
  };

var SaldoJ = { "valor": novoSaldo, "data" : data};

    $.ajax({
	        url : "https://paraio.com/v1/movims/", // + periodoId + "/links/" + number,
	        type : 'post',
	        async: false,
	        headers: { "Authorization": "Anonymous app:dbapp" },
	        contentType: 'application/json',
	        data:  JSON.stringify(MovimJ),
        success: function () {
           //alert('form was submitted');
         }
       });

    //atualiza saldo
    $.ajax({
        url : "https://paraio.com/v1/saldo/1143180213983645696", // + periodoId + "/links/" + number,
        type : 'PUT',
        async: false,
        headers: { "Authorization": "Anonymous app:dbapp" },
        contentType: 'application/json',
        data:  JSON.stringify(SaldoJ),
    success: function () {
       alert('form was submitted');
     }
   });

    
}


//-----------------------------

function onInit() {
	console.log("onInit");
	getSaldo();
	getExtrato();
}
