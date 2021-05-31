import React, { useState } from 'react';
import 'firebase/auth';
import 'firebase/database';
import "firebase/firestore";
import logo from "../../assets/img/logo.png";
import { LockClosedIcon } from "@heroicons/react/solid";
import { navigate } from "hookrouter";
import swal from "sweetalert";

import { useFirebaseApp, useDatabase, useFirestore, useFirestoreDocData } from 'reactfire'; //Hooks para usar firebase

export default (props) => {
    const keysRef = useFirestore().collection("keys").doc('userKeys');
    const [state, data] = useFirestoreDocData(keysRef)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const firebase = useFirebaseApp();
    const handleNav = () => navigate("/");
    const puntosRef = useDatabase();


    const addPointRecord = () => {
        var userEmail = localStorage.getItem("Email").split("@", 1).toString();
        userEmail = userEmail.split(".").toString();
        localStorage.setItem("key", puntosRef.ref().push({
            email: userEmail,
            puntosContar: 0,
            puntosSumar: 0,
            puntosMemorama: 0
        }).key)

        data.set()
    }

    const submit = async () => {
        if (confirmPassword === password) {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    swal({
                        text: "Usuario creado con éxito, bienvenido",
                        icon: "success"
                    })
                    localStorage.setItem('Email', email);
                    addPointRecord();
                    handleNav();
                })
                .catch((error) => {
                    var errorCode = error.code;
                    if (errorCode === 'auth/weak-password') {
                        swal({
                            text: "La contraseña es muy débil",
                            icon: "warning",
                            button: "Aceptar"
                        })
                    } else {
                        console.log(error)
                        swal({
                            text: "Ese correo ya esta registrado",
                            icon: "warning",
                            button: "aceptar"
                        })
                    }
                });
        } else {
            swal({
                text: "Las contraseñas no coinciden",
                icon: "error",
                button: "Aceptar"
            })
        }
    }

    const getKey = () => {
        var refToPuntaje;
        puntosRef.ref().on('value', puntaje => {
            refToPuntaje = puntaje.ref;

            console.log(refToPuntaje.child('email').toString());
        });
    }

    const login = async () => {
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                swal({
                    title: "Bienvenido",
                    text: "Ingreso correcto, bienvenido",
                    icon: "success",
                    button: "aceptar"
                })
                getKey();
                localStorage.setItem('Email', email);
                handleNav();
            })
            .catch((error) => {
                var errorCode = error.code;
                if (errorCode === "auth/wrong-password") {
                    swal({
                        title: "Contraseña incorrecta",
                        text: "Contraseña del correo incorrecta",
                        icon: "error",
                        button: "aceptar"
                    })
                } else {
                    console.log(error)
                    swal({
                        title: "Correo no registrado",
                        text: "Parece que ese correo no se encuentra registrado",
                        icon: "warning",
                        button: "aceptar"
                    })
                }
            });
    }

    const ChangeView = (event) => {
        document.getElementById('LoginDiv').classList.toggle("hide");
        document.getElementById('SigninDiv').classList.toggle("hide");
    }


    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bgLogin" id="LoginDiv">
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
                                    id="emailLogin"
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
                                    id="passwordLogin"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Contraseña"
                                    onChange={(ev) => setPassword(ev.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="button"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={login}
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
                                onClick={ChangeView}
                            >
                                Registrarse
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bgLogin hide" id="SigninDiv">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img className="mx-auto w-auto logo" src={logo} alt="Logo-MathApp" />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Crea tu cuenta
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Correo Electrónico
                                    </label>
                                <input
                                    id="emailSignin"
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
                                    id="passwordSignin"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Contraseña"
                                    onChange={(ev) => setPassword(ev.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Confirmar Contraseña
                                    </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Confirmar Contraseña"
                                    onChange={(ev) => setConfirmPassword(ev.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="button"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={submit}
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon
                                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                        aria-hidden="true"
                                    />
                                </span>
                                Registrame
                                </button>
                        </div>
                        <div className="text-sm text-center">
                            <a
                                href="#"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={ChangeView}
                            >
                                Inicia Sesión
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}