import { getFirestore } from "firebase/firestore";
import { auth } from "@/lib/firebase";

// Re-export a typed db instance using the same Firebase app
export { getFirestore };
export { auth };

import { getApp } from "firebase/app";
export const db = getFirestore(getApp());
