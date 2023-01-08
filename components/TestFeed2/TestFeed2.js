/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";
import styles from "./TestFeed2.module.css";
import Input from "../Input/Input";
import TestPost2 from "../TestPost2/TestPost2";

export default function TestFeed2() {
  function getUpper(val) {
    return val.toUpperCase;
  }

  const [posts, setPosts] = useState([]);
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc"), limit(20)),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <div>
      <Input />
      <div className={styles.feed}>
        {posts.map((post) => (
          <TestPost2 key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  );
}
