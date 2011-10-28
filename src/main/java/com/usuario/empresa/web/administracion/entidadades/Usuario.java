package com.usuario.empresa.web.administracion.entidadades;

public class Usuario {
	private int id;
	private String nombre;
	private int edad;

	// contructor
	public Usuario() {
		nombre = "";
	}

	// getters
	public int getId() {
		return id;
	}

	public String getNombre() {
		return nombre;
	}

	public int getEdad() {
		return edad;
	}

	// setters
	public void setId(int id) {
		this.id = id;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public void setEdad(int edad) {
		this.edad = edad;
	}
}
