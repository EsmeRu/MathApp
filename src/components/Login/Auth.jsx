import React, { useState } from 'react';
import 'firebase/auth';
import logo from "../../assets/img/logo.png";
import { LockClosedIcon } from "@heroicons/react/solid";
import { navigate } from "hookrouter";

import { useFirebaseApp, useUser } from 'reactfire'; //Hooks para usar firebase

export default (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const firebase = useFirebaseApp();
    const user = useUser();

    const submit = async () => {
        navigate("/");
        await firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    const logout = async () => {
        await firebase.auth().signOut();
    }

    const login = async () => {
        await firebase.auth().signInWithEmailAndPassword(email, password);
    }

    const handleLog = () => navigate("/");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bgLogin">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img className="mx-auto w-auto logo" src={logo} alt="Logo-MathApp" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Inicia con tu cuenta
          </h2>
                </div>
                <form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Correo Electrónico"
                                onChange={(ev) => setEmail(ev.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Contraseña"
                                onChange={(ev) => setPassword(ev.target.value)}
                            />
                        </div>
                    </div>

                    <div className="text-sm text-align">
                        <a
                            href="#"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={submit}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon
                                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                    aria-hidden="true"
                                />
                            </span>
                        Aceptar
                        </button>
                    </div>
                    <div className="text-sm text-center">
                        <a
                            href="#"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Registrarse
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}