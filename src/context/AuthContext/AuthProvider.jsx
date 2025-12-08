import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import axiosPublic from '../../api/axiosPublic';
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("citizen");
  const [loading, setLoading] = useState(true);
  // save Token
  const saveToken = async (email) => {
    const res = await axiosPublic.post("/auth/jwt", { email });
    const token = res.data.token;
    localStorage.setItem("user-token", token);
    return token;
  };
  // Email Log in
  const signInUser = async (email, password) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password);
    const token = await saveToken(email);
    return token;
  };
  // Email Sign Up
  const registerUser = async (email, password, name, photo) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
    const token = await saveToken(email);
    // Save db
    await axiosPublic.post("/auth/save-user", {
      name,
      email,
      photo,
      role: "citizen",
    });
    return token;
  };
  //  Google Sign In
  const signInGoogle = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, googleProvider);
    const Guser = result.user;
    const token = await saveToken(Guser.email);
    // Save to DB
    await axiosPublic.post("/auth/save-user", {
      name: Guser.displayName,
      email: Guser.email,
      photo: Guser.photoURL,
      role: "citizen",
    });
    return { user:Guser, token };
  };
  // LogOut Function
  const logOut = async () => {
    setLoading(true);
    await signOut(auth);
    localStorage.removeItem("user-token");
    setUser(null);
  };
    // Firebase observer → also fetch DB user info (role, premium, blocked)
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (!currentUser?.email) {
          setUser(null);
          setLoading(false);
          return;
        }
        try {
          const token = localStorage.getItem("user-token");
          const res = await axiosPublic.get(`/auth/user/${currentUser.email}`, {
            headers: {
              Authorization: `Bearer${token}`,
            },
          });
          setUser(res.data)
        }
        catch (error) {
          console.log(error);
          setUser(null);
        }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
  const authInfo = {
    user,
    role,
    loading,
    signInUser,
    registerUser,
    signInGoogle,
    logOut,
  };
  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;