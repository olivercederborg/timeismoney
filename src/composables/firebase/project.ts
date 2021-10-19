import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from 'lib/firebase'

export const doesProjectExist = async (id: string) =>
	(await getDoc(doc(db, 'projects', id))).exists()

/**
 * Clears projects sessions.
 * @param {string} projectId - The project identifier.
 */
export const clearSessions = (projectId: string) => {
	updateDoc(doc(db, `projects/${projectId}`), {
		sessions: []
	})
}
