import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  getIdToken,
} from 'firebase/auth';

export interface UserSession {
  uid: string;
  email: string | null;
  displayName: string | null;
  accessToken: string | null;
  role: 'STUDENT' | 'UNIVERSITY_ADMIN' | 'ADMIN' | null;
}

export function useAuth() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      setLoading(true);
      if (firebaseUser) {
        try {
          const idToken = await getIdToken(firebaseUser);
          
          // Exchange Firebase ID Token with backend JWT (simulated in frontend, or via API call)
          const role = firebaseUser.email?.includes('admin')
            ? 'ADMIN'
            : firebaseUser.email?.includes('gov')
            ? 'ADMIN'
            : 'UNIVERSITY_ADMIN';

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            accessToken: idToken,
            role: role as any,
          });
        } catch (err: any) {
          setError(err.message || 'Failed to retrieve auth token');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, pass: string) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err: any) {
      let customError = 'Invalid email or password';
      if (err.code === 'auth/invalid-credential') {
        customError = 'Invalid credentials. Please verify your details.';
      } else if (err.code === 'auth/user-not-found') {
        customError = 'Account not found.';
      }
      setError(customError);
      setLoading(false);
      throw new Error(customError);
    }
  };

  const signOut = async () => {
    setLoading(true);
    await firebaseSignOut(auth);
    setUser(null);
    setLoading(false);
  };

  return {
    user,
    loading,
    error,
    signIn,
    signOut,
  };
}
