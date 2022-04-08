import React, { Component } from 'react';
import swal from 'sweetalert';
import { navigate } from "hookrouter";

export default class Timer extends Component {
    state = {
        minutes: 2,
        seconds: 0,
    }

    handleNav() {
        navigate("/Home");
    }

    removeTimer() {
        const timerHTML = document.getElementById("timer");
        timerHTML.parentElement.removeChild(timerHTML);
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval);
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval);
    }

    timeOver = () => {
        swal({
            title: "Oh no... :(",
            text: "Se termino el tiempo\n¿Te gustaria intentarlo de nuevo?",
            icon: "error",
            buttons: ["No", "Si"]
        }).then(respuesta => {
            if (respuesta) {
                swal({
                    title: "Aquí vamos de nuevo :)",
                    timer: "3000"
                })
                window.location.reload();
            } else {
                swal({
                    title: "Has regresado a la pantalla de inicio",
                    timer: "2000"
                })
                this.handleNav();
            }
        })
    }

    render() {
        const { minutes, seconds } = this.state
        return (
            <div>
                { minutes === 0 && seconds === 0
                    ? this.timeOver()
                    : <h3>Tiempo restante: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>
                }
            </div>
        )
    }
}