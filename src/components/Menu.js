import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Global from './Global';

export default class Menu extends Component {

    url = Global.urlApiCharlas;

    render() {
        return (
            <div>
                {/* Encabezado */}
                <header className="header">
                    <div className="container">
                        <div className="btn-menu">
                            <label htmlFor="btn-menu">☰</label>
                        </div>
                    </div>
                </header>

                {/* Menú lateral */}
                <input type="checkbox" id="btn-menu" />
                <div className="container-menu">
                    <div className="cont-menu">
                        <nav>
                        <NavLink className="nav-link" to="/charlas" activeClassName="active">Home</NavLink>
                        <NavLink className="nav-link" to="/" activeClassName="active">Login</NavLink>
                        <NavLink className="nav-link" to="/perfilAlumno" activeClassName="active">Perfil Alumno</NavLink>
                        <NavLink className="nav-link" to="/perfilProfesor" activeClassName="active">Perfil Profesor</NavLink>
                        <NavLink className="nav-link" to="/perfilAdmin" activeClassName="active">Perfil Admin</NavLink>
                        </nav>
                        <label htmlFor="btn-menu">✖️</label>
                    </div>
                </div>

            </div>
        );
    }

}



