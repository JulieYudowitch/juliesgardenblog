import React from "react";
import styles from "./Login.module.css";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import PublicFeed from "../PublicFeed/PublicFeed";
import Header from "../Header/Header";

export default function Login() {
  return (
    <>
      <Header />
      <div className={styles.login} onClick={() => signIn("google")}>
        <FcGoogle className={styles.glogo} />
        <p className={styles.prompt}>Sign in with Google</p>
      </div>
      <PublicFeed />
    </>
  );
}
