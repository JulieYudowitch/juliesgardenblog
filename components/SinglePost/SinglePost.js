/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import Post from "../Post/Post";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import Comment from "../Comment/Comment";
import styles from "./SinglePost.module.css";

const SinglePost = () => {
  const [post, setPost] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [comments, setComments] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", id), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  );

  return (
    <section>
      <div>
        <BsArrowLeft
          onClick={() => router.push(`/`)}
        />
        Back
      </div>

      <Post id={id} post={post} />

      <div>
        {comments.length > 0 && (
          <div>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                comment={comment.data()}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SinglePost;
