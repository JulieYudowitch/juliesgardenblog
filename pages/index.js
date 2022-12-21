/* eslint-disable @next/next/no-img-element */
import { useSession } from 'next-auth/react';
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
    <>
      <Head>
        <title>Julie Yudowitch Gardening Blog</title>
        <meta name="description" content="Julie Yudowitch Gardening Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div>
        <p className={styles.welcome}>
          Hello and welcome to my gardening blog!
        </p>
        <p className={styles.construction}>
          This is a place to celebrate all things plants.
        </p>
        <p className={styles.construction}>
          Please feel free to contribute your own gardening related content!
        </p>
      </div>
      <div className={styles.user}>
        <img src={session?.user?.image} alt="" />
        <div>
          <h4>Welcome {session?.user?.name}!</h4>
        </div>
      </div>
      <div className={styles.layout}>
        <Feed />
        <Sidebar />
      </div>

      <Footer />
    </>
  );
}
