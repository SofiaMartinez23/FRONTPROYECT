import React, { Component } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import InicioCharlas from './InicioCharlas';
import Login from './Login';
import DetalleCharla from './DetalleCharla';
import PerfilAlumno from './PerfilAlumno';
import PerfilProfesor from './PerfilProfesor';
import PerfilAdmin from './PerfilAdmin';
import Calendario from './Calendario';
import CrearAlumno from './CrearAlumno';
import CrearProfesor from './CrearProfesor';
import CrearRonda from './CrearRonda';
import CrearCharla from './CrearCharla';
import EditarCharla from './EditarCharla';
import EditarUsuario from './EditarUsuario';



export default class Router extends Component {

    render() {
        return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/charlas' element={<InicioCharlas />}/>
                <Route path='/detallecharla' element={<DetalleCharla />}/>
                <Route path='/calendario' element={<Calendario />}/>
                
                <Route path='/perfilAlumno' element={<PerfilAlumno />}/>
                <Route path='/perfilProfesor' element={<PerfilProfesor />}/>
                <Route path='/perfilAdmin' element={<PerfilAdmin />}/>
                
                <Route path='/crearAlumno' element={<CrearAlumno />}/>
                <Route path='/crearProfesor' element={<CrearProfesor />}/>
                
                <Route path='/crearRonda' element={<CrearRonda />}/>
                <Route path='/crearCharla' element={<CrearCharla />}/>

                <Route path='/editarCharla' element={<EditarCharla />}/>
                <Route path='/editarUsuario' element={<EditarUsuario />}/>

            </Routes>
        </BrowserRouter>
        )
    }
}
