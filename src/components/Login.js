import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import './../css/stylelogin.css';
import Global from './Global';
import axios from 'axios';

export default class Login extends Component {

    url = Global.urlApiCharlas;

    cajaIdCurso = React.createRef();
    cajaUser = React.createRef();
    cajaPassword = React.createRef();

    cajaNombre = React.createRef();
    cajaEmail = React.createRef();
    cajaContrasenya = React.createRef();
    cajaRol = React.createRef();

    cajaKeyProfe = React.createRef();


    state = {
        status: false,
        usuarios: [],
        rol: '1',
    }


    loadUsuarios = () => {
        let request = "api/usuarios";
        axios.get(this.url + request).then(response => {
            console.log(response.data);
            this.setState({
                usuarios: response.data
            })
        })
    }

    crearUsuario = (e) => {
        e.preventDefault();

        let idCurso = this.cajaIdCurso.current.value;
        let nombre = this.cajaNombre.current.value;
        let email = this.cajaEmail.current.value;
        let contrasenya = this.cajaContrasenya.current.value;
        let rol = this.cajaRol.current.value;
        console.log(rol)

        let request = "api/usuarios/newalumno/" + idCurso;
        console.log(this.url + request)

        let usernuevo = {
            idUsuario: 0,
            nombre: nombre,
            apellidos: "",
            email: email,
            estadoUsuario: true,
            imagen: "",
            password: contrasenya,
            idRole: rol
        }
        console.log(usernuevo);

        axios.post(this.url + request, usernuevo).then(response => {
            console.log(response)
            this.setState({
                status: true,
                usuarios: response    
            })
            
        }).catch(err => {
            console.log(err)
            alert("Este usuario ya existe")
        });
    }

    crearProfesor = (e) => {
        e.preventDefault();

        let key = this.cajaKeyProfe.current.value;
        let nombre = this.cajaNombre.current.value;
        let email = this.cajaEmail.current.value;
        let contrasenya = this.cajaContrasenya.current.value;
        let rol = this.cajaRol.current.value;
        console.log(rol)

        let request = "api/usuarios/newprofesor/" + key;
        console.log(this.url + request)

        let usernuevo = {
            idUsuario: 0,
            nombre: nombre,
            apellidos: "",
            email: email,
            estadoUsuario: true,
            imagen: "",
            password: contrasenya,
            idRole: rol
        }
        console.log(usernuevo);

        axios.post(this.url + request, usernuevo).then(response => {
            console.log(response)
            this.setState({
                status: true,
                usuarios: response    
            })
            
        }).catch(err => {
            console.log(err)
            alert("Este usuario ya existe")
        });
    }
    
    crearToken = (e) => {
        e.preventDefault();

        let request = "api/auth/login";

        let user = this.cajaUser.current.value;
        let password = this.cajaPassword.current.value;

        let usertoken = {
            userName: user,
            password: password
        }

        console.log(usertoken);

        axios.post(this.url + request, usertoken).then(response => {
            const token = response.data.response; 
            localStorage.setItem('token', token);
            this.setState({
                status: true
            })
        })
    }
    handleRoleChange = (e) => {
        this.setState({ rol: e.target.value });
    }

    render() {
        return (
            <div className="main">

                {this.state.status === true && <Navigate to="/charlas" />}

                <input type="checkbox" id="chk" aria-hidden="true" />
                <div className="signup">
                    <form onSubmit={this.crearUsuario}>
                        <label htmlFor="chk" aria-hidden="true">Sign up</label>
                        
                        <select ref={this.cajaRol} value={this.state.rol} onChange={this.handleRoleChange}>
                            <option value="2">Alumno</option>
                            <option value="1">Profesor</option>
                        </select>

                        {/* Si el rol es "Alumno", requerir "Id Curso", si es "Profesor", no */}
                        {this.state.rol === '1' && (
                            <input type="text" name="txt" placeholder="Key Profesor" required ref={this.cajaKeyProfe} />
                        )}
                        {this.state.rol === '2' && (
                            <input type="text" name="txt" placeholder="Id Curso" required ref={this.cajaIdCurso} />
                        
                        )}

                        <input type="text" name="txt" placeholder="User name" required ref={this.cajaNombre} />
                        <input type="email" name="email" placeholder="Email" required ref={this.cajaEmail} />
                        <input type="password" name="pswd" placeholder="Password" required ref={this.cajaContrasenya} />
                        <button type="submit">Sign up</button>
                    </form>
                </div>

                <div className="login">
                    <form onSubmit={this.crearToken}>
                        <label htmlFor="chk" aria-hidden="true">Login</label>
                        <input type="email" name="email" placeholder="Email" required ref={this.cajaUser} />
                        <input type="password" name="pswd" placeholder="Password" required ref={this.cajaPassword} />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}