/* eslint-disable @next/next/no-img-element */
import { useSession, signOut } from 'next-auth/react';
import Head from 'next/head';
import { useContext } from "react";
import { AppContext } from '../context/AppContext';
import styles from '../styles/Home.module.css';
import Login from '../components/Login/Login';
import Feed from '../components/Feed/Feed';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import TestFeed from '../components/TestFeed/TestFeed';
import Modal from '../components/Modal/Modal';
import TestFeed2 from '../components/TestFeed2/TestFeed2';

export default function Home() {
  const { data: session } = useSession();
   const [appContext] = useContext(AppContext);
  if(!session) return <Login />
  return (
    <div>
      <Head>
        <title>Julie&apos;s Gardening Blog</title>
        <meta name="description" content="Julie Yudowitch Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      
      <div className={styles.homePage}>
        <div className={styles.user}>
          <div className={styles.welcomeAndLogout}>
            <h2>Hello and welcome to my gardening blog!</h2>

            <div className={styles.logout} onClick={signOut}>
              Logout
            </div>
          </div>
          <div className={styles.userNameImg}>
            <img
              src={session?.user?.image}
              alt=""
              className={styles.usersImg}
            />
            <h3 className={styles.loggedInAs}>
              You are signed in as {session?.user?.name}
            </h3>
          </div>
        </div>
        <div className={styles.feed}>
          
          <Feed />
        </div>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        {/*{appContext?.isModalOpen && <Modal />}*/}
      </div>
      <Footer />
    </div>
  );
}
