import { useSession, signOut } from 'next-auth/react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Login from '../components/Login';
import Feed from '../components/Feed/Feed';

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
      <div>
        <p className={styles.welcome}>
          Hello and welcome to my gardening blog!
        </p>
        <p className={styles.construction}>(this site is under contruction)</p>
      </div>
      <div onClick={signOut}>
        <img src={session?.user?.image} alt="" />
        <div>
          <h4>{session?.user?.name}</h4>
          <h4>@{session?.user?.tag}</h4>
        </div>
        <Feed />
      </div>
    </>
  );
}
