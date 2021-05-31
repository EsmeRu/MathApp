import React from 'react';
import 'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';
import sesion from "../assets/img/i-corazon.png";
import swal from 'sweetalert';

export default (props) => {
    const { data: user } = useUser();
    const firebase = useFirebaseApp();

    const closeAuth = async () => {
        localStorage.removeItem("Email");
        localStorage.removeItem("key");
        await firebase.auth().signOut();
    }

    const logout = () => {
        swal(
            <div>
                <h3>¿Seguro que desea salir?</h3>
                <button onClick={closeAuth}>Aceptar</button>
            </div>
        )
    }



    if (user !== null) {
        return (
            <a
                href="/"
                className="flex h-7 cursor-pointer hover:text-blue-500 text-xl"
                onClick={logout}
            >
                <img src={sesion} className="p-1" />
                Cerrar sesión
            </a>
        )
    } else {
        return (
            <a
                href="/login"
                className="flex h-7 cursor-pointer hover:text-blue-500 text-xl"
            >
                <img src={sesion} className="p-1" />
                Iniciar Sesión/Registrarse
            </a>
        )

    }
}