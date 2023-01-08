/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { BsChat } from "react-icons/bs";
import Moment from "react-moment";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSession } from "next-auth/react";
import {
  deleteDoc,
  setDoc,
  doc,
  onSnapshot,
  query,
  collection,
  orderBy,
    limit,
  addDoc
} from "firebase/firestore";
import { db } from "../../firebase";
import styles from "./TestPost2.module.css";

export default function TestPost2({ id, post }) {
    const [isReplying, setIsReplying] = useState(false)
    const [comments, setComments] = useState([]);
    const [appContext, setAppContext] = useContext(AppContext);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const { data: session } = useSession();
  console.log(post.userImg);
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc"),
          limit(20)
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
  useEffect(
    () =>
      setLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );
  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.name,
      });
    }
    };

    const reply = () => {
        setIsReplying(true)
        console.log(isReplying)
        addReply()

    }

    const addReply = async (e) => {
    
        await addDoc(collection(db, "comments"), {
          id: session.user.uid,
          comment: input,
          username: session.user.name,
          tag: session.user.tag,
          userImg: session.user.image,
          timestamp: serverTimestamp(),
        });

      
      setInput("");

    };

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
        <div className={styles.likeEdit}>
          {session.user.uid !== post?.id ? (
            <p></p>
          ) : (
            <RiDeleteBin5Line
              fontSize={22}
              onClick={(e) => {
                e.stopPropagation();
                deleteDoc(doc(db, "posts", id));
              }}
            />
          )}

          <div
            className={styles.likeCount}
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            {liked ? (
              <AiFillHeart fontSize={22} />
            ) : (
              <AiOutlineHeart fontSize={22} />
            )}

            {likes.length > 0 && <span>{likes.length}</span>}
          </div>
          <BsChat
            fontSize={21}
                      onClick={reply}
                
          />
        </div>
              {isReplying && <div>Reply here</div>}
      </div>
      <div className={styles.divider}></div>
    </div>
  );
}
