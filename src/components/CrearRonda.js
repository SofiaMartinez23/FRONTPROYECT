import React, { Component } from 'react';
import Menu from './Menu';
import axios from 'axios';
import './../css/stylecrearcharlas.css'; // Importa el archivo CSS

export default class CrearRonda extends Component {
    state = {
        idRonda: 0,
        idCursoUsuario: 0,
        fechaPresentacion: '',
        fechaCierre: '',
        duracion: 0,
        descripcionModulo: '',
        fechaLimiteVotacion: '',
        errorMessage: '',
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    validateForm = () => {
        const { idRonda, idCursoUsuario, fechaPresentacion, fechaCierre, duracion, descripcionModulo, fechaLimiteVotacion } = this.state;
        if (!idRonda || !idCursoUsuario || !fechaPresentacion || !fechaCierre || !duracion || !descripcionModulo || !fechaLimiteVotacion) {
            this.setState({ errorMessage: 'Todos los campos son obligatorios.' });
            return false;
        }
        return true;
    }

    crearCharla = () => {
        const { idRonda, idCursoUsuario, fechaPresentacion, fechaCierre, duracion, descripcionModulo, fechaLimiteVotacion } = this.state;
        let token = localStorage.getItem('token');
        
        if (!token) {
            console.error("No se encontró el token de autenticación.");
            return;
        }

        const charlaData = {
            idRonda,
            idCursoUsuario,
            fechaPresentacion,
            fechaCierre,
            duracion,
            descripcionModulo,
            fechaLimiteVotacion
        };

        let request = "tu_api_endpoint_aqui"; // Reemplaza con la URL de la API

        axios.post(request, charlaData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log("Charla creada con éxito:", response.data);
            alert("Charla creada con éxito!");
            this.setState({
                idRonda: 0,
                idCursoUsuario: 0,
                fechaPresentacion: '',
                fechaCierre: '',
                duracion: 0,
                descripcionModulo: '',
                fechaLimiteVotacion: '',
                errorMessage: '',
            });
        })
        .catch(error => {
            console.error("Error al crear charla:", error);
            alert("Hubo un error al crear la charla.");
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
        this.crearCharla();
    }

    render() {
        const { idRonda, idCursoUsuario, fechaPresentacion, fechaCierre, duracion, descripcionModulo, fechaLimiteVotacion, errorMessage } = this.state;

        return (
            <div>
                {/* Contenedor para el menú fijo arriba */}
                <div className="menuContainer">
                    <Menu />
                </div>

                {/* Contenedor para el contenido */}
                <div className="formContainer">
                    <h1 style={{ color: 'white' }}>Crear Ronda</h1>

                    <form onSubmit={this.handleSubmit} className="form">
                        <div className="formGroup">
                            <label htmlFor="idRonda" className="label">ID Ronda</label>
                            <input
                                type="number"
                                id="idRonda"
                                name="idRonda"
                                value={idRonda}
                                onChange={this.handleChange}
                                className="inputField"
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="idCursoUsuario" className="label">ID Curso Usuario</label>
                            <input
                                type="number"
                                id="idCursoUsuario"
                                name="idCursoUsuario"
                                value={idCursoUsuario}
                                onChange={this.handleChange}
                                className="inputField"
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="fechaPresentacion" className="label">Fecha de Presentación</label>
                            <input
                                type="datetime-local"
                                id="fechaPresentacion"
                                name="fechaPresentacion"
                                value={fechaPresentacion}
                                onChange={this.handleChange}
                                className="inputField"
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="fechaCierre" className="label">Fecha de Cierre</label>
                            <input
                                type="datetime-local"
                                id="fechaCierre"
                                name="fechaCierre"
                                value={fechaCierre}
                                onChange={this.handleChange}
                                className="inputField"
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="duracion" className="label">Duración (en minutos)</label>
                            <input
                                type="number"
                                id="duracion"
                                name="duracion"
                                value={duracion}
                                onChange={this.handleChange}
                                className="inputField"
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="descripcionModulo" className="label">Descripción del Módulo</label>
                            <textarea
                                id="descripcionModulo"
                                name="descripcionModulo"
                                value={descripcionModulo}
                                onChange={this.handleChange}
                                className="textareaField"
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="fechaLimiteVotacion" className="label">Fecha Límite de Votación</label>
                            <input
                                type="datetime-local"
                                id="fechaLimiteVotacion"
                                name="fechaLimiteVotacion"
                                value={fechaLimiteVotacion}
                                onChange={this.handleChange}
                                className="inputField"
                            />
                        </div>

                        {errorMessage && <p className="error">{errorMessage}</p>}

                        <button type="submit" className="submitButton">Crear Charla</button>
                    </form>
                </div>
            </div>
        );
    }
}
