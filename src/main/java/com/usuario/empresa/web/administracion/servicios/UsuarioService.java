package com.usuario.empresa.web.administracion.servicios;

import java.util.HashMap;
import java.util.List;

import com.usuario.empresa.web.administracion.entidades.Usuario;

public class UsuarioService extends ServiceImpl {
	/**
	 * Retorna la lista de usuarios
	 * 
	 * @return lista de usuarios
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarios() throws Exception {
		return (List<Usuario>) sqlMap.queryForList("getUsuarios");
	}

	/**
	 * Retorna un usuario dado su correspondiente id
	 * 
	 * @param idUsuario
	 *            - id del usuario
	 * @return usuario
	 * @throws Exception
	 */
	public Usuario getUsuario(int idUsuario) throws Exception {
		return (Usuario) sqlMap.queryForObject("getUsuario", idUsuario);
	}

	/**
	 * Retorna la cantidad total de usuarios
	 * 
	 * @return cantidad de usuarios
	 * @throws Exception
	 */
	public int getTotalUsuarios() throws Exception {
		return (Integer) sqlMap.queryForObject("getTotalUsuarios");
	}

	/**
	 * Inserta un usuario
	 * 
	 * @param usuario
	 *            - datos del usuario
	 * @return id del nuevo usuario
	 * @throws Exception
	 */
	public int insertUsuario(Usuario usuario) throws Exception {
		return (Integer) sqlMap.insert("insertUsuario", usuario);
		
	}
	

	/**
	 * Actualiza la informacion de un usuario
	 * 
	 * @param usuario
	 *            - datos del usuario
	 * @throws Exception
	 */
	public void updateUsuario(Usuario usuario) throws Exception {
		sqlMap.update("updateUsuario", usuario);
	}

	/**
	 * 
	 * @param idUsuario
	 * @throws Exception
	 */
	public void deleteUsuario(int idUsuario) throws Exception {
		sqlMap.delete("deleteUsuario", idUsuario);
	}
	
	
	public void crearUsuario(String nombre,String email,String password) throws Exception {
	
		HashMap<Object, String> usuario= new HashMap<Object, String>();
		usuario.put("nombre", nombre);
		usuario.put("email", email);
		usuario.put("password", password);
		
//		Long id = (Long)sqlMap.insert("insertarUsuario", usuario);
//		return (Integer) sqlMap.insert("insertUsuario", usuario);
		
		try {
			Long id = (Long)sqlMap.insert("insertarUsuario", usuario);
		} catch (Exception e) {
			throw new Exception(e);
		}
		
	}
	
	
}
