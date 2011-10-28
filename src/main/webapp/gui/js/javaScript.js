$(function(){
    
	  var options = { 
		        success: function(data){
		        	if (data.success){
						location.href = 'index.xml';
					} else {
						if (data.message.length>0){
							alert(data.message);
						} else {
							alert("Se ha producido un inconveniente, favor intentar nuevamente.");
						}							
					}
		        },
		        dataType:"json",
		        timeout: 30 * 1000
		    }; 
			$('#formUser').ajaxSubmit(options); 
	
	
	$(document).ready(function(){
         //logica
     });
	
	
});
 
 