 var oEfetuados; //= new Object();
 //var oPagamentos; //= new Object(); ;
 var oRecebimentos; //= new Object(); ;
 var oRecebimentosCompl;
 var periodoId = "1127671583293313024";
 
 function cBack(data) { alert(JSON.stringify(data)); }
 
 // -- Periodo
 function AppendPeriodo(data) {
		//console.log(data);
		//console.dir(data.value); //sites);
		//for(var key in data.emps) {
		console.log("AppendPeriodo:"+data.items.length)	
		for ( var key in data.items) {
			//var value = data[key];
			//var value = data.documents[key].fields;
			var value = data.items[key];
			//console.log(value);
			var txtselected = (key == 0 ? " selected" : "");
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

//-- Efetuados
function AppendEfetuados(data) {
	//console.log("AppendEfetuados..");
	oEfetuados = data.items;
	console.log("AppendEfetuados:" + oEfetuados.length);
}
		
function getEfetuados(periodo) {

	 //var url = "https://bisterco.pythonanywhere.com/pstgr/carros";
	 if (periodo != null) {
		 var url = "https://paraio.com/v1/periodo/"+periodo+"/links/recto";
		 periodoId = periodo;
	 } else {
		 var url = "https://paraio.com/v1/periodo/1127671583293313024/links/recto";		 
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

//------ oRecebimentosCompl - INICIO

function AppendRecebimentoCompl(data) {
	//console.log("AppendEfetuados..");
	oRecebimentosCompl = data.items;
	console.log("AppendRecebimentoCompl:" + oRecebimentosCompl.length);
}
		
function getRecebimentoCompl(periodo) {
	 console.log("getRecebimentoCompl ...");
	 //var url = "https://bisterco.pythonanywhere.com/pstgr/carros";
	 if (periodo != null) {
		 var url = "https://paraio.com/v1/rectocompls?q="+periodo;
	 } else {
		 var url = "https://paraio.com/v1/rectocompls?q=1127671583293313024";		 
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
						AppendRecebimentoCompl(data);
					},
					error : function(e) {
						console.log(e.message);
					}
				});
		
}

function postRecebimentosCompl(periodo,recto) {
	
	var complId = "periodo:"+ periodo + ":recto:" + recto;
	
/**
{
  "type": "rectocompl",
  "parentid": "periodo:1127671583293313024:recto:1128765204830621696",
  "dataReal": 1579568701055,
  "valorReal": "1234",
  "periodo":"11223344"
}
*/

var valorReal = $("#valorReal").val();
var dataReal = new Date($("#dataReal").val() + " 09:00:00").getTime();

var recebimentosComplJ = {
  "type": "rectocompl",
  "parentid" : complId,
  "valorReal" : valorReal,
  "dataReal": dataReal,
  "periodo": periodo,
};
	
    $.ajax({
	        //url : "https://paraio.com/v1/periodo/1127671583293313024/links/" + number,
	        url : "https://paraio.com/v1/rectocompls/", // + periodoId + "/links/" + number,
	        type : 'post',
	        async: false,
	        headers: { "Authorization": "Anonymous app:dbapp" },
	        contentType: 'application/json',
	        data:  JSON.stringify(recebimentosComplJ),
        success: function () {
           alert('form was submitted');
         }
       });
	
}


//------ oRecebimentosCompl - FIM

function AppendRecebimentos(data) {
	//console.log("AppendPagamentos...");
	oRecebimentos = data.items;
	//window.testeVal = oPagamentos;
	console.log("AppendRecebimentos:" + oRecebimentos.length );
}

//function getPagamentos(tag) {
function getRecebimentos(tag) {	
	
	if(tag == null || typeof tag === 'undefined' || tag == "")
		 var url = "https://paraio.com/v1/rectos?sort=properties.dia&desc=false";
	else
     	var url = "https://paraio.com/v1/rectos/search?q=properties.tag:"+tag+"&sort=properties.dia&desc=false";
	
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
						AppendRecebimentos(data);
					},
					error : function(e) {
						console.log(e.message);
					}
				});
}

function getListaRecebimentosEfetuados() {	
	 console.log("getListaRecebimentosEfetuados");
	 $(".retorno").html('');
	 var html='<table border=1>';
	 //html += '<thead><td>ID1</td><td>TYPE1</td><td>ID2</td><td>TYPE2</td></thead>';
	 html += '<thead><td>DIA</td><td>DESCRICAO</td><td>VALOR</td><td>REALIZADO</td><td>VALOR REAL</td><td>DATA REAL</td></thead>';
	 console.log("getListaRecebimentosEfetuados:" + oRecebimentos.length);
	 var totalPago = 0;
	 var totalRealPago = 0;
	 for ( var key in oRecebimentos) {
		 var value = oRecebimentos[key];
			html += '<tr>';
			//html += '<td>' + value.tag + '</td>';
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
				
				var complId = "periodo:"+ periodoId + ":recto:" + value.id;
				
				console.log("complId:" + complId);
				
				var recebimentoComplIndex = oRecebimentosCompl.findIndex(item => item.parentid === complId);
				
				//console.log()
				
				if (recebimentoComplIndex >= 0) {
					console.log("Valor Real:" + oRecebimentosCompl[recebimentoComplIndex].valorReal);
					totalRealPago += parseNumero(oRecebimentosCompl[recebimentoComplIndex].valorReal);
					html += '<td>' + oRecebimentosCompl[recebimentoComplIndex].valorReal + '</td>';
					html += '<td>' + formatTimestamp(oRecebimentosCompl[recebimentoComplIndex].dataReal) + '</td>';
				}
							
				totalPago += parseNumero(value.valor); 
				//console.log("totalPago:" + totalPago);
			}
			html += '</tr>';
		}
	 	//totalPago
	 	var arredondado = parseMoeda(totalPago);
	 	var arredondadoReal = parseMoeda(totalRealPago);

	 	html += '<td colspan=2>TOTAL PAGO</td><td>'+arredondado+'</td>';
		html += '<td>&nbsp;</td>';
		html += '<td>'+arredondadoReal+'</td><td>&nbsp;</td>';
		html += '</table>';
		//$(".retorno").append(html);	 	 
		$(".retorno").html(html); 
		 
}

// -----------------
function onInit() {
	// loadind data --------------

	getEfetuados(); 
	 
	getRecebimentos(); 

	getRecebimentoCompl();

}