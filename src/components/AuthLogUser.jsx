import React from 'react';
import 'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';
import sesion from "../assets/img/i-corazon.png";
import swal from 'sweetalert';
import { navigate } from "hookrouter";


const AuthLogUser = (props) => {
    const goToLogin = () => navigate("/");
    const { data: user } = useUser();
    const firebase = useFirebaseApp();

    const logout = async (event) => {
        event.preventDefault();
        localStorage.removeItem("Email");
        localStorage.removeItem("key");
        await swal({
            title: "¿Seguro que desea salir?",
            icon: "info",
            buttons: ["Cancelar", "Salir"]
        }).then(respuesta => {
            if (respuesta) {
                firebase.auth().signOut()
                goToLogin();
            }
        })
    }

    if (user !== null) {
        return (
            <a
                href="/"
                className={props.estilos["a"]}
                onClick={logout}
            >
                <img src={sesion} className={props.estilos["img"]} alt="Icono-Cerrar-Sesión" />
                <span className={props.estilos["span"]}>Cerrar sesión</span>
            </a>
        )
    } else {
        return (
            <a
                href="/"
                className={props.estilos["a"]}
            >
                <img src={sesion} className={props.estilos["img"]} alt="Icono-iniciar-Sesión" />
                <span className={props.estilos["span"]}>Iniciar Sesión</span>
            </a>
        )

    }
}

export default AuthLogUser;