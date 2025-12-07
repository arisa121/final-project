import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role , setRole]= useState("citizen");
    const [loading, setLoading] = useState(true);
    
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth,googleProvider)
    }
    // LogOut Function
     const logOut = () => {
       return signOut(auth);
     };
    const authInfo = {
        user,
        role,
        loading,
        signInUser,
        registerUser,
        signInGoogle,
        logOut

    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
            
        </div>
    );
};

export default AuthProvider;