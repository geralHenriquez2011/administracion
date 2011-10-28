 [#include "common.ftl" /] [@structure]
<div id="contenedorPrincipal">
<div id="menuPrincipal">

</div>
<div id="separador">
	<div id="contenedor">
	<div id="accordion">
	<h3><a href="#">Buscar Direcci&oacute;n</a></h3>
	<div>
		<div id="direccion">
				 Ingrese Direcci&oacute;n : <input type="text" size="60" id="address"
				class="ui-autocomplete-input" autocomplete="off" role="textbox"
				aria-autocomplete="list" aria-haspopup="true">
		</div>
	</div>
	<h3><a href="#">Opciones Dise&ntilde;o Mapa</a></h3>
	<div>
							<h4>A&ntilde;adir</h4>
							<img alt="" src="gui/img/rectangulo.png" id="recta"/>
							<img alt="" src="gui/img/circulo-verde.png" id="circulo"/>
							<img alt="" src="gui/img/lapiz.png" id="dise"/>
							<h4>Eliminar</h4>
							<img alt="" src="gui/img/rectangulo.png" id="limpiarRectangulo"/>
							<img alt="" src="gui/img/circulo-verde.png" id="circuloLimpiar"/>
							<img alt="" src="gui/img/lapiz.png" id="reset"/>
	</div>
	<h3><a href="#">Localizar Posici&oacute;n Actual</a></h3>
	<div>
		<input type="button" value="localizar" id="localiza" />
	</div>
	<h3><a href="#">Ruta a</a></h3>
	<div>
			<span>Desde:</span><input type="text" id="start" /> 
			
			<span>Hasta:</span><input type="text" id="end" />
		    
			<input type="button" value="ruta" id="ruta" />
			<div id="directions_panel"></div>
	</div>
</div>
		
	</div>
	
	<div id="map_canvas" >
	</div>
	
</div>
	
	
</div>

[/@structure]
