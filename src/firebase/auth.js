import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, sendPasswordResetEmail, signInWithPopup, updatePassword } from "firebase/auth"
import { auth } from "./firebase"
import { signInWithEmailAndPassword } from "firebase/auth/cordova"
import { GoogleAuthProvider } from "firebase/auth/web-extension"

// export const doCreateUserWithEmailAndPassword = async (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password)
// }

export const doSignOut = () => {
    return auth.signOut()
}

export const doCreateUserWithEmailAndPassword = async (name, email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(auth.currentUser, { displayName: name }).then(doSignOut()).catch(
        (err) => console.log(err)
    );
}

export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user
}

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email)
}

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password)
}

export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`
    })
}
