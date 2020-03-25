 var oEfetuados; //= new Object();
 var oPagamentos; //= new Object(); ;
 var oPagamentosCompl; //06.02.20
 var periodoId = "1127671583293313024"; 
 
 function cBack(data) { alert(JSON.stringify(data)); }


 function AppendPeriodo(data) {
		//console.log(data);
		//console.dir(data.value); //sites);
		//for(var key in data.emps) {
		console.log("AppendPeriodo:"+data.items.length)
		console.log("GetURLParameter(periodo):" + GetURLParameter('periodo'));
		var qsPeriodo = GetURLParameter('periodo');
		for ( var key in data.items) {
			//var value = data[key];
			//var value = data.documents[key].fields;
			var value = data.items[key];
			//console.log(value);
			if (qsPeriodo != "")
				var txtselected = (value.id == qsPeriodo ?  " selected" : "");
			else
				var txtselected = (key == 0 ?  " selected" : "");
			
			$("#periodo").append('<option value=' + value.id + txtselected + '>' + value.periodo + '</option>');
		}
}
	

function getPeriodo() {
	 var url = "https://paraio.com/v1/periodos?sort=properties.ano:asc,properties.mes:asc";

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
						AppendPeriodo(data);
					},
					error : function(e) {
						console.log(e.message);
					}
				});
	 
	 
}

 
 function AppendResponse(data,html) {
		//console.log(data);
		//console.dir(data.value); //sites);
		//for(var key in data.emps) {
		console.log("AppendResponse:" + data.items.length)	
		for ( var key in data.items) {
			//var value = data[key];
			//var value = data.documents[key].fields;
			var value = data.items[key];
			//console.log(value);
			/*
			html += '<tr>';
			html += '<td>' + value.id1 + '</td>';
			html += '<td>' + value.type1 + '</td>';
			html += '<td>' + value.id2 + '</td>';
			html += '<td>' + value.type2 + '</td>';
			html += '</tr>';
			*/
			html += '<tr>';
			html += '<td>' + value.tag + '</td>';
			html += '<td>' + value.dia + '</td>';
			html += '<td>' + value.descricao + '</td>';
			html += '<td>' + value.valor + '</td>';
			html += '</tr>';
		}
		html += '</table>';
		$(".retorno").append(html);

 }
		
function AppendEfetuados(data) {
	//console.log("AppendEfetuados..");
	oEfetuados = data.items;
	console.log("AppendEfetuados:" + oEfetuados.length);
}
		
function getEfetuados(periodo) {

	 //var url = "https://bisterco.pythonanywhere.com/pstgr/carros";
	 if (periodo != null) {
		 var url = "https://paraio.com/v1/periodo/"+periodo+"/links/pagto";
		 periodoId = periodo;
	 } else {
		 var qsPeriodo = GetURLParameter('periodo');
	 	 if (qsPeriodo != null) {
			 var url = "https://paraio.com/v1/periodo/"+qsPeriodo+"/links/pagto";
			 periodoId = qsPeriodo;
	 	 } else {
			 var url = "https://paraio.com/v1/periodo/1127671583293313024/links/pagto";		 
	 	 }
	 }

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
						//AppendResponse(data,html);
						AppendEfetuados(data);
					},
					error : function(e) {
						console.log(e.message);
					}
				});
		
}
 
//------ oPagamentosCompl - INICIO

function AppendPagamentosCompl(data) {
	//console.log("AppendEfetuados..");
	oPagamentosCompl = data.items;
	console.log("AppendPagamentosCompl:" + oPagamentosCompl.length);
}
		
function getPagamentosCompl(periodo) {
	 console.log("getPagamentosCompl ...");
	 //var url = "https://bisterco.pythonanywhere.com/pstgr/carros";
	 if (periodo != null) {
		 var url = "https://paraio.com/v1/pagtocompls?q="+periodo;
	 } else {
		 var url = "https://paraio.com/v1/pagtocompls?q=1127671583293313024";		 
	 }

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
						AppendPagamentosCompl(data);
					},
					error : function(e) {
						console.log(e.message);
					}
				});
		
}

function postPagamentosCompl(periodo,pagto) {
	
	var complId = "periodo:"+ periodo + ":pagto:" + pagto;
	
var valorReal = $("#valorReal").val();
var dataReal = new Date($("#dataReal").val() + " 09:00:00").getTime();

var pagamentosComplJ = {
  "type": "pagtocompl",
  "parentid" : complId,
  "valorReal" : valorReal,
  "dataReal": dataReal,
  "periodo": periodo,
};
	
    $.ajax({
	        //url : "https://paraio.com/v1/periodo/1127671583293313024/links/" + number,
	        url : "https://paraio.com/v1/pagtocompls/", // + periodoId + "/links/" + number,
	        type : 'post',
	        async: false,
	        headers: { "Authorization": "Anonymous app:dbapp" },
	        contentType: 'application/json',
	        data:  JSON.stringify(pagamentosComplJ),
        success: function () {
           alert('form was submitted');
         }
       });
	
}


//------ oRecebimentosCompl - FIM



function AppendPagamentos(data) {
	//console.log("AppendPagamentos...");
	oPagamentos = data.items;
	window.testeVal = oPagamentos;
	console.log("AppendPagamentos:" + oPagamentos.length );
}

function getPagamentos(tag) {
	console.log("getPagamentos.tag:"+tag);
	if(tag == null || typeof tag === 'undefined' || tag == "")
	 	var url = "https://paraio.com/v1/pagtos?sort=properties.dia&desc=false";
	else
     	var url = "https://paraio.com/v1/pagtos/search?q=properties.tag:"+tag+"&sort=properties.dia&desc=false";
	
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
						AppendPagamentos(data);
					},
					error : function(e) {
						console.log(e.message);
					}
				});
}

function getListaPagamentosEfetuados() {
	 console.log("getListaPagamentosEfetuados");
	 $(".retorno").html('');
	 var html='<table border=1>';
	 //html += '<thead><td>ID1</td><td>TYPE1</td><td>ID2</td><td>TYPE2</td></thead>';
	 //html += '<thead><td>TAG</td><td>DIA</td><td>DESCRICAO</td><td>VALOR</td><td>REALIZADO</td></thead>';
 	 html += '<thead><td>TAG</td><td>DIA</td><td>DESCRICAO</td><td>VALOR</td><td>REALIZADO</td><td>VALOR REAL</td><td>DATA REAL</td></thead>';
	 console.log("getListaPagamentosEfetuados:"+oPagamentos.length);
	 var totalPago = 0;
	 var totalRealPago = 0;
	 for ( var key in oPagamentos) {
		 var value = oPagamentos[key];
			html += '<tr>';
			html += '<td>' + value.tag + '</td>';
			html += '<td>' + value.dia + '</td>';
			html += '<td>' + value.descricao + '</td>';
			html += '<td>' + value.valor + '</td>';
			//html += '<td>' + oEfetuados.includes(value.id) + '</td>';
			if (! oEfetuados.some(item => item.id === value.id) ) {
				html += '<td><button class="somebutton" data-id="' + value.id + '">Add bookmark</button></td>';
				html += '<td>&nbsp;</td><td>&nbsp;</td>';
			} else {
				
				html += '<td>' + oEfetuados.some(item => item.id === value.id) + '</td>';

				var oEfetuadoIndex =  oEfetuados.findIndex(item => item.id === value.id);
				
				var complId = "periodo:"+ periodoId + ":pagto:" + value.id;
				
				console.log("complId:" + complId);
				
				var pagamentoComplIndex = oPagamentosCompl.findIndex(item => item.parentid === complId);
				
				//console.log()
				
				if (pagamentoComplIndex >= 0) {
					console.log("Valor Real:" + oPagamentosCompl[pagamentoComplIndex].valorReal);
					totalRealPago += parseNumero(oPagamentosCompl[pagamentoComplIndex].valorReal);
					html += '<td>' + oPagamentosCompl[pagamentoComplIndex].valorReal + '</td>';
					html += '<td>' + formatTimestamp(oPagamentosCompl[pagamentoComplIndex].dataReal) + '</td>';
				}
							
				totalPago += parseNumero(value.valor); 
				//console.log("totalPago:" + totalPago);
			}
			html += '</tr>';
		}
	 	//totalPago
	 	var arredondado = parseMoeda(totalPago);
	 	var arredondadoReal = parseMoeda(totalRealPago);

	 	html += '<td colspan=3>TOTAL PAGO</td><td>'+arredondado+'</td>';
		html += '<td>&nbsp;</td>';
		html += '<td>'+arredondadoReal+'</td><td>&nbsp;</td>';
		html += '</table>';
		//$(".retorno").append(html);	 	 
		$(".retorno").html(html); 
		 
 }

//----------------------
function onInit() {
	// loadind data ....
	var periodo = GetURLParameter('periodo');
	var tag = GetURLParameter('tag');

	getEfetuados(periodo); 
	 
	getPagamentos(tag); 

	getPagamentosCompl(periodo);

}
