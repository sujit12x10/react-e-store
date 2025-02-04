import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, sendPasswordResetEmail, signInWithPopup, updatePassword } from "firebase/auth"
import { auth } from "./firebase"
import { signInWithEmailAndPassword } from "firebase/auth/cordova"
import { GoogleAuthProvider } from "firebase/auth/web-extension"


const  mapAuthCodeToMessage = (authCode) => {
    console.log(authCode);
    
    switch (authCode) {
      case "auth/invalid-password":
        return "Password provided is not corrected";
  
      case "auth/invalid-email":
        return "Email provided is invalid";
  
      // Many more authCode mapping here...
  
      default:
        return "";
    }
}

export const doSignOut = () => {
    return auth.signOut()
}

export const doCreateUserWithEmailAndPassword = async (name, email, password) => {
    try{
        const result = await createUserWithEmailAndPassword(auth, email, password)
        updateProfile(auth.currentUser, { displayName: name }).then(doSignOut())
        return "success"
    } catch (error){
        const errorMessage = error.message;
        return errorMessage
      }
}

export const doSignInWithEmailAndPassword = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password)
        return "success"
    } catch (error){
        const errorMessage = error.message;
        return errorMessage
    }
    
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
