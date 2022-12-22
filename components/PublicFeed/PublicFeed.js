/* eslint-disable react-hooks/exhaustive-deps */
import styles from './PublicFeed.module.css'
import React, { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import PublicPost from "../PublicPost/PublicPost";

export default function PublicFeed() {
  function getUpper(val) {
    return val.toUpperCase;
  }

  const [posts, setPosts] = useState([]);
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );
  console.log(posts);
  return (
    <div className={styles.feed}>
      
      <div className={styles.posts}>
        {posts.map((post) => (
          <PublicPost
            className={styles.post}
            key={post.id}
            id={post.id}
            post={post.data()}
          />
        ))}
      </div>
    </div>
  );
}
