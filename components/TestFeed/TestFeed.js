import styles from './TestFeed.module.css'
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import TestPost from '../../services/TestPost'

export default function PublicFeed() {
  
  
const [postNum, setPostNum] = useState(null)
  const [posts, setPosts] = useState([]);
  const first = query(
    collection(db, "posts"),
    orderBy("desc"),
    limit(3)
  );

  const next = query(collection(db, "posts"), orderBy("desc"), limit(3));

  const documentSnapshots = getDocs(first);
    
  /*useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
            setPosts(snapshot.docs);
            setPostNum();
        }
      ),
    [db]
  );
  
    const nextQuery = () => {
onSnapshot(
  query(collection(db, "posts"), orderBy("timestamp", "desc"), startAfter(posts)),
  (snapshot) => {
      setPosts(snapshot.docs);
      setPostNum(documentSnapshots.docs[documentSnapshots.docs.length-1]);
  }
);
    }*/
    
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
      
          <button onClick={next}>next posts</button>
    </div>
  );
}
