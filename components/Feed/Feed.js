/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import styles from "./Feed.module.css";
import Input from "../Input/Input";
import Post from "../Post/Post";

export default function Feed() {
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
      <Input />
      <div className={styles.posts}>
       
          {posts.map((post) => (
            <Post
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
