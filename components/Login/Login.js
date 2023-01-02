import React from "react";
import styles from "./Login.module.css";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import PublicFeed from "../PublicFeed/PublicFeed";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Login() {
  return (
    <>
      <Header />
      <h2 className={styles.loginPrompt}>
        Hello and welcome to my gardening blog!
      </h2>
      <h3 className={styles.loginPrompt}>
        Login to post your own garden related content
      </h3>
      <div className={styles.login} onClick={() => signIn("google")}>
        <FcGoogle className={styles.glogo} />
        <p className={styles.prompt}>Sign in with Google</p>
      </div>
      <PublicFeed className={styles.publicFeed} />
      <Footer />
    </>
  );
}
