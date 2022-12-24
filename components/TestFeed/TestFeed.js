import styles from './TestFeed.module.css'
import { useFirestore, useFirestoreCollection } from 'reactfire';
import {
  collection,
  CollectionReference,
  limit,
  orderBy,
  startAfter,
  query,
  where,
  DocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase';
import React from 'react'

export default function TestFeed() {

const first = query(collection(db, "posts"), orderBy("asc"), limit(10));
const documentSnapshots = await getDocs(first);

  return (
    <div>TestFeed</div>
  )
}
