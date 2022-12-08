import React from 'react'
import styles from './Login.module.css'
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <>     
        <div onClick={() => signIn("google")}>
          <FcGoogle/>
          Sign in with Google
        </div>      
    </>
  );
}
