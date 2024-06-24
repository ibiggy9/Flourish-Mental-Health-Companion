import React, {createContext, useContext, useEffect, useState} from 'react'
import { 
    createUserWithEmailAndPassword, 
    signout,
    onAuthStateChanged, 
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence,
    getUserByEmail,
    signInWithEmailAndPassword,
    signOut, 
    getAuth,
    GoogleAuthProvider,
    getRedirectResult,

 } from 'firebase/auth'
 import * as AppleAuthentication from 'expo-apple-authentication';
 import {ref, set, get, child, update} from "firebase/database"
 import { AppState } from 'react-native'
import app from '../firebaseConfig'
import { AppContext } from '../App'
import * as Device from 'expo-device';
import DeviceInfo from 'react-native-device-info';

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}   

export function AuthProvider({children, navigation}) {
    const [isFleur, setIsFleur] = useState(false)
    const [chatMenuShow, setChatMenuShow] = useState(true)
    const [firstLogin, setFirstLogin] = useState(false)
    const [user, setUser] = useState()
    const [loginError, setLoginError] = useState()
    const [accessToken, setAccessToken] = useState('')
    const auth = getAuth(app)
    const appState = React.useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);


    

    async function login(email, password){
        //await setPersistence(auth, browserSessionPersistence);
        setLoginError()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCreds)=> {
            if(auth.currentUser.email){
                console.log("successful")  
                
            }
        
        }).catch((error)=>{
            console.log(error.message)
            const errorCode = error.code
            if(errorCode == "auth/wrong-password"){
                setLoginError("Incorrect username or password");
            } else if(errorCode == "auth/too-many-requests"){
                setLoginError("This account has been temporarily disabled due to many failed login attempts. Please try again later.")
            } else if (errorCode == "auth/user-not-found"){
                setLoginError("Incorrect username or password")
            } else if(errorCode=="auth/user-disabled"){
                setLoginError("Account Disabled, Please Contact Us")
            }
            else if(errorCode=="auth/invalid-email"){
                setLoginError("Please enter a properly formatted email.")
            }
            else if(errorCode=="auth/internal-error"){
                setLoginError("Please ensure you entered both your email and password")
            }
            
        })}
    
    async function logout(){
        signOut(auth).then(() => {
        console.log("Signout successful")})
        
        
        .catch((error) => {
            console.log(error)
        })}

    function getUser(){
        setUser(auth.currentUser.uid)
    }

    const value = {
        logout, 
        login,
        firstLogin, 
        setFirstLogin,
        user,
        loginError,
        setLoginError, 
        auth,
        chatMenuShow,
        setChatMenuShow,
        accessToken,
        setAccessToken
        
    }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
