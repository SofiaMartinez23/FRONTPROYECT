import React, { Component } from 'react'
import Global from './Global'
import axios from 'axios'
import  './../css/styleinicio.css'
import { NavLink } from 'react-router-dom';
import Menu from './Menu';

export default class InicioCharlas extends Component {

    url = Global.urlApiCharlas;

    state = {
        charlas: []
    }

    loadCharlas = () => {
        let token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            let request = "api/charlas/charlascurso";
            axios.get(this.url + request, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                console.log(response.data);
                this.setState({
                    charlas: response.data
                });
            }).catch(error => {
                console.error("Error loading charlas:", error);
            });
        } else {
            console.error("No token found");
        }
    }

    componentDidMount = () => {
        this.loadCharlas();
    }

    render() {
        return (
            <div>
                <Menu />
                <div style={{marginTop: '40px'}}>
                <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '36px', color: '#fff' }}>Charlas</h1>
                </div>
                <div className='container'>
                    {this.state.charlas.map((charla) => (
                        <div key={charla.idCharla} className="charla-container">
                            <h2 className="charla-title">{charla.titulo}</h2>
                            <p className="charla-description"><strong>Descripción:</strong> {charla.descripcion}</p>
                            <p className="charla-details"><strong>Tiempo:</strong> {charla.tiempo} minutos</p>
                            <p className="charla-details"><strong>Fecha propuesta:</strong> {new Date(charla.fechaPropuesta).toLocaleDateString()}</p>
                            <p className="charla-details"><strong>Estado:</strong> {charla.idEstadoCharla === 1 ? 'Pendiente' : 'Completada'}</p>
                            <p className="charla-details"><strong>Ronda:</strong> {charla.idRonda}</p>
                            <button className="charla-button"><NavLink className='link' to='/detallecharla'>Ver más</NavLink></button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
