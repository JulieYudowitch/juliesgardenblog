/* eslint-disable @next/next/no-img-element */
import { useSession, signOut } from 'next-auth/react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Login from '../components/Login/Login';
import Feed from '../components/Feed/Feed';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';

export default function Home() {
  const { data: session } = useSession();
  if(!session) return <Login />
  return (
    <div>
      <Head>
        <title>Julie Yudowitch Gardening Blog</title>
        <meta name="description" content="Julie Yudowitch Gardening Blog" />
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
            <h4 className={styles.loggedInAs}>
              You are signed in as {session?.user?.name}
            </h4>
          </div>
        </div>
        <div className={styles.feed}>
          <Feed />
        </div>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
      </div>
      <Footer />
    </div>
  );
}
