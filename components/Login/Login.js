import React from "react";
import styles from "./Login.module.css";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <>
      <div className={styles.login} onClick={() => signIn("google")}>
        <FcGoogle className={styles.glogo} />
        <p className={styles.prompt}>Sign in with Google</p>
      </div>
    </>
  );
}
