[#if objects??]
	[#assign result=objects["result"] /]
	[#assign message=objects["message"] /]
	{"success":result?string, "message":"${message}"}
	
	
	{"success":objects["result"]?string, "message":"${objects["message"]}"}
[#else]
	{"success":false, "message":"error grave"}
[/#if]

