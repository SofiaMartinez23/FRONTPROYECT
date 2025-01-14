import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Menu from './Menu'



export default class DetalleCharla extends Component {

    render() {
        return (
            <div>
                <Menu />
                <h1 style={{color: 'white'}}>Detalle Charla</h1>
                <NavLink to='/charlas'>Volver</NavLink>
            </div>
        )
    }
}
