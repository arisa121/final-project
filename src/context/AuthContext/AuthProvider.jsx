import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  signInWithCustomToken,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import axiosPublic from "../../api/axiosPublic";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("citizen");
  const [isPremium, setIsPremium] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  //Sync user with backend (MongoDB)
  const syncUserWithBackend = async (firebaseUser) => {
    try {
      const token = await firebaseUser.getIdToken();
      const defaultName = firebaseUser.email?.split("@")[0] || "User";

      const response = await axiosPublic.post(
        "/api/auth/register-or-login",
        {
          firebaseUid: firebaseUser.uid,
          name: firebaseUser.displayName || defaultName,
          email: firebaseUser.email,
          photo: firebaseUser.photoURL || "https://i.ibb.co/placeholder.jpg",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dbUser = response.data.user;

      // Check if blocked
      if (dbUser.isBlocked) {
        alert("Your account has been blocked. Please contact support.");
        await signOut(auth);
        setUser(null);
        setRole("citizen");
        setIsPremium(false);
        setIsBlocked(false);
        return null;
      }

      // Set all states
      setUser(dbUser);
      setRole(dbUser.role || "citizen");
      setIsPremium(dbUser.isPremium || false);
      setIsBlocked(dbUser.isBlocked || false);

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(dbUser));

      return dbUser;
    } catch (error) {
      console.error("Backend sync failed:", error);
      throw error;
    }
  };

  //Email/Password Login (Admin, Staff, Citizen)
  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      // Try Firebase login first
      let credential;
      try {
        credential = await signInWithEmailAndPassword(auth, email, password);
      } catch (firebaseError) {
        // If Firebase login fails, try backend (for custom token)
        if (
          firebaseError.code === "auth/user-not-found" ||
          firebaseError.code === "auth/wrong-password"
        ) {
          const response = await axiosPublic.post("/api/auth/login", {
            email,
            password,
          });

          const { customToken } = response.data;
          credential = await signInWithCustomToken(auth, customToken);
        } else {
          throw firebaseError;
        }
      }

      // Sync with backend
      const dbUser = await syncUserWithBackend(credential.user);

      setLoading(false);
      return { user: dbUser };
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      throw error;
    }
  };

  // Email Registration (Citizen only)
  const registerUser = async (email, password, name, photo) => {
    setLoading(true);
    try {
      // Create user in Firebase
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update profile
      await updateProfile(credential.user, {
        displayName: name,
        photoURL: photo || "https://i.ibb.co/placeholder.jpg",
      });

      // Reload to get updated profile
      await credential.user.reload();

      // Sync with backend
      const dbUser = await syncUserWithBackend(auth.currentUser,password);

      setLoading(false);
      return { user: dbUser };
    } catch (error) {
      setLoading(false);
      console.error("Registration error:", error);

      // Delete Firebase user if backend sync fails
      if (auth.currentUser) {
        try {
          await auth.currentUser.delete();
        } catch (deleteError) {
          console.error("Failed to delete Firebase user:", deleteError);
        }
      }

      throw error;
    }
  };

  // Google Sign-In (All Roles)
  const signInGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // Sync with backend
      const dbUser = await syncUserWithBackend(result.user);

      setLoading(false);
      return { user: dbUser };
    } catch (error) {
      setLoading(false);
      console.error("Google sign-in error:", error);
      throw error;
    }
  };

  //Logout
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);

      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Reset states
      setUser(null);
      setRole("citizen");
      setIsPremium(false);
      setIsBlocked(false);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Logout error:", error);
      throw error;
    }
  };

  //Firebase Auth State Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
       
          const storedUser = localStorage.getItem("user");
          const storedToken = localStorage.getItem("token");

          if (storedUser && storedToken) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setRole(parsedUser.role || "citizen");
            setIsPremium(parsedUser.isPremium || false);
            setIsBlocked(parsedUser.isBlocked || false);
          } else {
          
            await syncUserWithBackend(currentUser);
          }
        } catch (error) {
          console.error("Error syncing user:", error);
          setUser(null);
          setRole("citizen");
          setIsPremium(false);
          setIsBlocked(false);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } else {
        // No Firebase user
        setUser(null);
        setRole("citizen");
        setIsPremium(false);
        setIsBlocked(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    role,
    isPremium,
    isBlocked,
    loading,
    signInUser,
    registerUser,
    signInGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;