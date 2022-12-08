/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineGif } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import { RiBarChart2Line } from "react-icons/ri";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "../../firebase";

export default function Input() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { data: session } = useSession();
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };
  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }
    setLoading(false);
    setInput("");
    setSelectedFile(null);
  };

  return (
    <div>
      <div>
        <div>
          <img
            src={session?.user?.image}
            alt=""
          />
        </div>
        <div>
          <textarea
            rows="2"
            placeholder="What's Happening?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {selectedFile && (
            <div>
              <div
                onClick={() => setSelectedFile(null)}
              >
                <AiOutlineClose />
              </div>

              <img
                src={selectedFile}
                alt=""
              />
            </div>
          )}

          {!loading && (
            <div>
              <div>
                <label htmlFor="file">
                  <BsImage />
                </label>
                <input type="file" id="file" hidden onChange={addImageToPost} />
                <div>
                  <AiOutlineGif />
                </div>
                <RiBarChart2Line />
                <IoCalendarNumberOutline />
                <HiOutlineLocationMarker />
              </div>
              <button
                disabled={!input.trim() && !selectedFile}
                onClick={sendPost}
              >
                Tweet
              </button>
            </div>
          )}
         
        </div>
      </div>
    </div>
  );
}
