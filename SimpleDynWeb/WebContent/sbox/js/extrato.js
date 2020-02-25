function showExtrato(data) {
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

function getExtrato() {
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
	getExtrato();
}
