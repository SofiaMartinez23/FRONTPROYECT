import React, { Component } from 'react';
import Menu from './Menu';
import axios from 'axios';
import './../css/stylecrearcharlas.css'; // Importa el archivo CSS

export default class CrearAlumno extends Component {
    state = {
        idUsuario: 0,
        nombre: '',
        apellidos: '',
        email: '',
        estadoUsuario: true,
        imagen: '',
        password: '',
        idRole: 0,
        errorMessage: '',
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    validateForm = () => {
        const { idUsuario, nombre, apellidos, email, password, idRole } = this.state;
        if (!idUsuario || !nombre || !apellidos || !email || !password || !idRole) {
            this.setState({ errorMessage: 'Todos los campos son obligatorios.' });
            return false;
        }
        return true;
    }

    crearAlumno = () => {
        const { idUsuario, nombre, apellidos, email, estadoUsuario, imagen, password, idRole } = this.state;
        let token = localStorage.getItem('token');
        
        if (!token) {
            console.error("No se encontró el token de autenticación.");
            return;
        }

        const alumnoData = {
            idUsuario,
            nombre,
            apellidos,
            email,
            estadoUsuario,
            imagen,
            password,
            idRole
        };

        let request = "tu_api_endpoint_aqui"; // Reemplaza con la URL de la API

        axios.post(request, alumnoData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log("Alumno creado con éxito:", response.data);
            alert("Alumno creado con éxito!");
            this.setState({
                idUsuario: 0,
                nombre: '',
                apellidos: '',
                email: '',
                estadoUsuario: true,
                imagen: '',
                password: '',
                idRole: 0,
                errorMessage: '',
            });
        })
        .catch(error => {
            console.error("Error al crear alumno:", error);
            alert("Hubo un error al crear el alumno.");
            if (error.response && error.response.status === 401) {
                console.error("Error de autenticación. Verifica tu token.");
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.validateForm()) {
            return;
        }
        this.crearAlumno();
    }

    render() {
        const { idUsuario, nombre, apellidos, email, estadoUsuario, imagen, password, idRole, errorMessage } = this.state;

        return (
            <div>
                {/* Contenedor para el menú fijo arriba */}
                <div className="menuContainer">
                    <Menu />
                </div>

                {/* Contenedor para el contenido */}
                <div className="formContainer">
                    <h1 style={{ color: 'white' }}>Crear Alumno</h1>

                    <form onSubmit={this.handleSubmit} className="form">
                        <div className="formGroup">
                            <label htmlFor="idUsuario" className="label">ID Usuario</label>
                            <input
                                type="number"
                                id="idUsuario"
                                name="idUsuario"
                                value={idUsuario}
                                onChange={this.handleChange}
                                className="inputField"
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="nombre" className="label">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={nombre}
                                onChange={this.handleChange}
                                className="inputField"
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="apellidos" className="label">Apellidos</label>
                            <input
                                type="text"
                                id="apellidos"
                                name="apellidos"
                                value={apellidos}
                                onChange={this.handleChange}
                                className="inputField"
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="email" className="label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                                className="inputField"
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="estadoUsuario" className="label">Estado Usuario</label>
                            <input
                                type="checkbox"
                                id="estadoUsuario"
                                name="estadoUsuario"
                                checked={estadoUsuario}
                                onChange={(e) => this.setState({ estadoUsuario: e.target.checked })}
                                className="inputField"
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="imagen" className="label">Imagen (URL)</label>
                            <input
                                type="text"
                                id="imagen"
                                name="imagen"
                                value={imagen}
                                onChange={this.handleChange}
                                className="inputField"
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="password" className="label">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={this.handleChange}
                                className="inputField"
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="idRole" className="label">ID Role</label>
                            <input
                                type="number"
                                id="idRole"
                                name="idRole"
                                value={idRole}
                                onChange={this.handleChange}
                                className="inputField"
                            />
                        </div>

                        {errorMessage && <p className="error">{errorMessage}</p>}

                        <button type="submit" className="submitButton">Crear Alumno</button>
                    </form>
                </div>
            </div>
        );
    }
}
