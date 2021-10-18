import { signInWithPopup, GithubAuthProvider, signOut } from '@firebase/auth'
import { createUser } from './db'
import { auth } from './firebase'

export const signUpWithGithub = async () => {
	const provider = new GithubAuthProvider()
	try {
		const result = await signInWithPopup(auth, provider)
		const credential = GithubAuthProvider.credentialFromResult(result)
		const token = credential?.accessToken

		const user = result.user

		await createUser({
			displayName: user.displayName,
			authProvider: 'github',
			email: user.email,
			uid: user.uid
		})
	} catch (error: any) {
		console.error(error.message)
	}
}

export const logOut = async () => await signOut(auth)
