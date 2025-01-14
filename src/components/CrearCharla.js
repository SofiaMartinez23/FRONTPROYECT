import React, { Component } from 'react';
import axios from 'axios';
import Global from './Global';  
import Menu from './Menu';
import { NavLink } from 'react-router-dom';

export default class CrearCharla extends Component {
    url = Global.urlApiCharlas;

    cajaTitulo = React.createRef();
    cajaDescripcion = React.createRef();
    cajaTiempo = React.createRef();
    cajaFechaPropuesta = React.createRef();
    cajaIdRonda = React.createRef();
    cajaIdUsuario = React.createRef();
    cajaImagenCharla = React.createRef();

    state = {
        status: false,
        charla: []
    };

    crearCharla = (e) => {
        e.preventDefault();

        let titulo = this.cajaTitulo.current.value;
        let tiempo = this.cajaTiempo.current.value;
        let descripcion = this.cajaDescripcion.current.value;
        let idRonda = parseInt(this.cajaIdRonda.current.value);
        let imagen = this.cajaImagenCharla.current.value;
        let idUsuario = parseInt(this.cajaIdUsuario.current.value);
        let fechPropuesta = this.cajaFechaPropuesta.current.value;;
        
        let token = localStorage.getItem('token');
        console.log(token);

        if (!token) {
            console.error("No se encontró el token de autenticación.");
            return;
        }

        let charlaNueva = {
            idCharla: 0,
            titulo: titulo,
            descripcion: descripcion,
            tiempo: tiempo,
            fechaPropuesta: fechPropuesta,
            idUsuario: idUsuario,
            idEstadoCharla: 0,
            idRonda: idRonda,
            imagenCharla: imagen
        };
        console.log(charlaNueva)

        let request = "api/charlas";
        console.log(this.url + request)

        axios.post( this.url + request, charlaNueva, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log("Charla creada con éxito:", response);
            alert("Charla creada con éxito!");
            this.setState({
                status: true,
                charla: response
            });
        })
        .catch(error => {
            console.error("Error al crear charla:", error);
            alert("Hubo un error al crear la charla.");
            if (error.response && error.response.status === 401) {
                console.error("Error de autenticación. Verifica tu token.");
            }
        });
    };

    render() {
        return (
            <div className="crear-charla-container">
                <div>
                    {/*<Menu />*/}
                    <h2>Crear Nueva Charla</h2>
                </div>
                <form onSubmit={this.crearCharla}>
                    <div className="form-group">
                        <label htmlFor="titulo">Título</label>
                        <input
                            type="text"
                            id="titulo"
                            ref={this.cajaTitulo}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea
                            id="descripcion"
                            ref={this.cajaDescripcion}
                            className="form-control"
                            rows="4"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tiempo">Tiempo Estimado (minutos)</label>
                        <input
                            type="number"
                            id="tiempo"
                            ref={this.cajaTiempo}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fechaPropuesta">Fecha Propuesta</label>
                        <input
                            type="date"
                            id="fechaPropuesta"
                            ref={this.cajaFechaPropuesta}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="idRonda">ID de Ronda</label>
                        <input
                            type="number"
                            id="idRonda"
                            ref={this.cajaIdRonda}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="idUsuario">ID de Usuario</label>
                        <input
                            type="number"
                            id="idUsuario"
                            ref={this.cajaIdUsuario}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="imagenCharla">Imagen de Charla</label>
                        <input
                            type="text"
                            id="imagenCharla"
                            ref={this.cajaImagenCharla}
                            className="form-control"
                            placeholder="URL de la imagen"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Crear Charla
                    </button>
                    <button type="submit" className="btn btn-danger">
                        <NavLink to={"/charlas"} className="no-link-style">Atras</NavLink>
                    </button>
                </form>
                
            </div>
        );
    }
}
