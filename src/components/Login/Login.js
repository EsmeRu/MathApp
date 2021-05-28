import React, { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import "./login.css";
import { navigate } from "hookrouter";
import Auth from './Auth';

import logo from "../../assets/img/logo.png";

function Login() {
  return (
    <div className="Login">
      <Auth />
    </div>
  );
}

export default Login;