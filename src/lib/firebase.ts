import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FB_APIKEY,
	authDomain: import.meta.env.VITE_FB_AUTHDOMAIN,
	projectId: import.meta.env.VITE_FB_PROJECTID,
	storageBucket: import.meta.env.VITE_FB_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDERID,
	appId: import.meta.env.VITE_FB_APPID
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
