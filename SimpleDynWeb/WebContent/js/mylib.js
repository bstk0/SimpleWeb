/**
 * mylib - 10.02 - v1 
 */

 function parseNumero(str) {
	 if (str == "") str = "0";
	 return parseFloat(str.replace(',', '.')); 
 }

 function _getUrlVars() {
	    var vars = {};
	    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	        vars[key] = value;
	    });
	    return vars;
}
 
 function GetURLParameter(parameter) { //, defaultvalue){
	 var urlparameter;
	    if(window.location.href.indexOf(parameter) > -1){
	        urlparameter = _getUrlVars()[parameter];
	        }
	    return urlparameter;
}

/*
function GetURLParameter(sParam) {
	console.log("GetURLParameter.sParam:" + sParam);
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
    //return "";
}
*/