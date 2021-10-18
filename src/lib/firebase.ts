import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyAJ_7GA4_0X3f7-5UAEZCyKfHVfWCe8DAM',
	authDomain: 'timeismoney-a116f.firebaseapp.com',
	projectId: 'timeismoney-a116f',
	storageBucket: 'timeismoney-a116f.appspot.com',
	messagingSenderId: '10359526115',
	appId: '1:10359526115:web:d53957bdcacc19ffa2abd6'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
