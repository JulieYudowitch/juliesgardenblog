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
  const { data: session } = useSession()
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
        <div className={styles.intro}>
          <h2>Hello and welcome to my gardening blog!</h2>
          <h3>This is a place to celebrate all things plants.</h3>
          <p>
            Please feel free to contribute your own gardening related content!
          </p>
          <p>
            Please bear with me while I work out the bugs as this site is still
            under construction
          </p>
        </div>
        <div className={styles.user}>
          <img src={session?.user?.image} alt="" className={styles.usersImg} />
          <div>
            <h4 className={styles.loggedInAs}>
              You are signed in as {session?.user?.name}
            </h4>
          </div>
          <div className={styles.logout} onClick={signOut}>
            Logout
          </div>
        </div>
        <Feed className={styles.feed} />
        <Sidebar className={styles.sidebar} />
      </div>
      <Footer />
    </div>
  );
}
