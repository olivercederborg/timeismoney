import { arrayUnion } from '@firebase/firestore'
import { doc, updateDoc } from '@firebase/firestore'
import { db } from 'lib/firebase'
import { Session } from 'types/index'

/**
 * Saves session to firebase.
 * @param {string} projectId - The project identifier.
 * @param {object} session - The session object to add to sessions array.
 */
export const saveSession = (projectId: string, session: Session) => {
	updateDoc(doc(db, `projects/${projectId}`), {
		sessions: arrayUnion({ ...session })
	})
}
