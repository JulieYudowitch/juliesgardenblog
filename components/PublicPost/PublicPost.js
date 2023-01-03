/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import styles from './PublicPost.module.css'
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { BsChat } from "react-icons/bs";
import Moment from "react-moment";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { AppContext } from "../../context/AppContext";
import {
  deleteDoc,
  setDoc,
  doc,
  onSnapshot,
  query,
  collection,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";
import { signIn } from "next-auth/react";

export default function PublicPost({ id, post }) {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [appContext, setAppContext] = useContext(AppContext);
    const router = useRouter();
    
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc"), limit(20)
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );
 useEffect(
   () =>
     onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
       setLikes(snapshot.docs)
     ),
   [db, id]
 );

  return (
    <div>
      <div className={styles.post}>
        <div className={styles.poster}>
          <img className={styles.posterImg} src={post?.userImg} alt="" />
          <h3>{post?.username}</h3>
        </div>
        <p>{post?.text}</p>
        <img src={post?.image} alt="" className={styles.image} />
        <p>
          <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
        </p>
        <div>
          <div
            className={styles.likeCount}
            onClick={(e) => {
              e.stopPropagation();
              signIn("google");
            }}
          >
            {liked ? <AiFillHeart /> : <AiOutlineHeart />}

            {likes.length > 0 && <span>{likes.length}</span>}
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
    </div>
  );
}

