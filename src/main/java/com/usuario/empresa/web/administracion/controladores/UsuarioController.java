package com.usuario.empresa.web.administracion.controladores;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.usuario.empresa.web.administracion.entidades.Usuario;
import com.usuario.empresa.web.administracion.servicios.UsuarioService;

public class UsuarioController extends MultiActionController {
	private List<Usuario> usuarios = new ArrayList<Usuario>();

	private UsuarioService service = null;
	private ApplicationContext ctx = null;

	/**
	 * constructor
	 */
	public UsuarioController() {
		ctx = new ClassPathXmlApplicationContext("classpath:/spring/applicationContext.xml");
		service = (UsuarioService) ctx.getBean("usuariosService");
		
		Usuario usuario = null;
		// usuario 1
		usuario = new Usuario();
		usuario.setId(1);
		usuario.setNombre("Pedro Perez");
		usuario.setEdad(30);
		usuarios.add(usuario);
		// usuario 1
		usuario = new Usuario();
		usuario.setId(2);
		usuario.setNombre("Maria Gonzalez");
		usuario.setEdad(25);
		usuarios.add(usuario);

		
	}

	/**
	 * Metodo que lista los usuarios
	 * 
	 * @param request
	 * @param response
	 * @return Lista de Usuarios
	 * @throws Exception
	 */
	public ModelAndView listar(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		// metodo de primera iteracion
		// return new ModelAndView("usuarios/listar", "usuarios", usuarios);

		// obtener la lista de usuarios
		List<Usuario> listaUsuarios = new ArrayList<Usuario>(); //service.getUsuarios();
		/*
		// Obtener un usuario segun id
		Usuario usuario = service.getUsuario(1);
		// obtiene la cantidad total de usuarios
		int totalUsuarios = service.getTotalUsuarios();
		// inserta un nuevo usuario
		Usuario nuevoUsuario = new Usuario();
		nuevoUsuario.setNombre("Cristian");
		nuevoUsuario.setEdad(45);
		int usuarioId = service.insertUsuario(nuevoUsuario);
		// /actualiza los datos del usuario
		service.updateUsuario(usuario);
		// eliminar usuario segun id
		service.deleteUsuario(1);
		 */
		return new ModelAndView("usuarios/listar", "usuarios", listaUsuarios);
	}

	/**
	 * Metodo que siempre devuelve el primer usuario
	 * 
	 * @param request
	 * @param response
	 * @return primer usuario
	 * @throws Exception
	 */
	public ModelAndView ver(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return new ModelAndView("usuarios/ver", "usuario", usuarios.get(0));
	}
	
	public ModelAndView mapas(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return new ModelAndView("mapas");
	}
	public ModelAndView google(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return new ModelAndView("google");
	}
	public ModelAndView puzzle(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return new ModelAndView("puzzle");
	}
	
	
	public ModelAndView guardar(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		boolean result = false;
		String message = "";
		try {
			String usuario = request.getParameter("name");
			String password = request.getParameter("password");
			String email = request.getParameter("email");
			
			service.crearUsuario(usuario,email , password);
			result = true;
		
		} catch (Exception e) {
			message = e.getMessage();
		}
		HashMap<String, Object> hm = new HashMap<String, Object>();
		hm.put("result", result);
		hm.put("message", message);
		
//		return new ModelAndView("transaction", "objects", hm);
		return new ModelAndView("inicio");
	}
}
