 [#include "../common.ftl" /] [@structure]
<!-- Panel -->
<div id="toppanel">
	<div id="panel">
		<div class="content clearfix">
			
			<div class="left">
				<!-- Login Form -->
				<form class="clearfix" action="#" method="post">
					<h1>Iniciar Sesi&oacute;n</h1>
					<label class="grey" for="log">Usuario:</label>
					<input class="field" type="text" name="log" id="log" value="" size="23" />
					<label class="grey" for="pwd">Contrase&ntilde;a:</label>
					<input class="field" type="password" name="pwd" id="pwd" size="23" />
	            	<label><input name="rememberme" id="rememberme" type="checkbox" checked="checked" value="forever" /> &nbsp;Recordar Contrase&ntilde;a</label>
        			<div class="clear"></div>
					<input type="submit" name="submit" value="Iniciar" class="bt_login" />
					<a class="lost-pwd" href="#">Olvido su contrase&ntilde;a?</a>
				</form>
			</div>
			<div class="left right">			
				<!-- Register Form -->
				<form action="usuarios/guardar.xml" method="post" accept-charset="UTF-8" id="formUser">
					<h1>Crear nuevo Usuario</h1>				
					<label class="grey" for="signup">Usuario:</label>
					<input class="field" type="text" name="name" id="signup" value="" size="23" />
					<label class="grey" for="email">Email:</label>
					<input class="field" type="text" name="email" id="email" size="23" />
					<label class="grey" for="pwd">Contrase&ntilde;a:</label>
					<input class="field" type="password" name="password" id="pwd" size="23" />
					<input type="submit" name="submit" value="Registrar" class="bt_register" />
				</form>
			</div>
		</div>
</div> <!-- /login -->	

	<!-- The tab on top -->	
	<div class="tab">
		<ul class="login">
			<li class="left">&nbsp;</li>
			
			<li class="sep">|</li>
			<li id="toggle">
				<a id="open" class="open" href="#">Log In | Register</a>
				<a id="close" style="display: none;" class="close" href="#">Close Panel</a>			
			</li>
			<li class="right">&nbsp;</li>
		</ul> 
	</div> <!-- / top -->
	
</div> <!--panel -->


[/@structure]
