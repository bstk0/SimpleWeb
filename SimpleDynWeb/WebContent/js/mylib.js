/**
 * mylib - 10.02 - v1 
 */

 function parseNumero(str) {
	 if (str == "") str = "0";
	 return parseFloat(str.replace(',', '.')); 
 }


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