import styles from "./TestFeed.module.css";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import TestPost from '../TestPost/TestPost'

export default function TestFeed() {
  const [posts, setPosts] = useState([]);
  const first = query(collection(db, "posts"), orderBy("desc"), limit(1));
  const documentSnapshot = async () => {
    await getDocs(first)
    const lastVisible = data[data.length - 1].doc;
  } 

  
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc"), limit(1)),
        (snapshot) => {
          setPosts(snapshot.docs)
        }
      ),
    [db]
  );
  const nextPosts = () => {
     query(collection(db, "posts"), orderBy("timestamp", "desc"), startAfter(lastVisible), limit(1)),
        (snapshot) => {
          setPosts(snapshot.docs)
        }
   }

  return (
    <div className={styles.feed}>
      <p>test feed</p>
      <div className={styles.posts}>
        {posts.map((post) => (
          <TestPost
            className={styles.post}
            key={post.id}
            id={post.id}
            post={post.data()}
          />
        ))}
      </div>

      <button onClick={nextPosts}>next posts</button>
    </div>
  );
}
