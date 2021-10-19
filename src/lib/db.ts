import { doc, getDoc, setDoc } from '@firebase/firestore'
import { User } from 'types/index'
import { db } from './firebase'

export const createUser = async (userData: User) => {
	const userDoc = doc(db, `users/${userData.uid}`)
	const snapshot = await getDoc(userDoc)
	if (!snapshot.exists()) {
		await setDoc(userDoc, {
			...userData
		})
	}
}
