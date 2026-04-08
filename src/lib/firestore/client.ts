import { getFirestore } from "firebase/firestore";
import { getApps } from "firebase/app";
import { auth } from "@/lib/firebase";

export { getFirestore };
export { auth };

// Only call getFirestore when the Firebase app has been initialized (i.e. on
// the client at runtime). During SSR/prerender there is no app, so db is null.
export const db = getApps().length > 0
  ? getFirestore(getApps()[0])
  : (null as unknown as ReturnType<typeof getFirestore>);
