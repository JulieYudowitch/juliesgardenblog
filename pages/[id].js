import Head from "next/head";
import React, { useContext } from "react";
import Modal from "../components/Modal/Modal";
import SinglePost from "../components/SinglePost/SinglePost";
import { AppContext } from "../context/AppContext";
import { useRouter } from "next/router";

export default function PostPage() {
  const router = useRouter();
  const [appContext] = useContext(AppContext)
  return (
    (router.isReady && <div>
      <Head>
        <title>Post Reply</title>
        <meta name="description" content="Reply to post"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
      <main>
        <div>
          <SinglePost />
          {appContext?.isModalOpen && <Modal />}
        </div>
      </main>
    </div>)
  );
}
