import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'BUILD_DUMMY_KEY_NOT_A_REAL_KEY',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'verifyed-platform.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'verifyed-platform',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'verifyed-platform.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:1234567890:web:dummy',
};

// Initialize Firebase App safely for static prerendering and client runtime
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const getFirebaseAuth = (): Auth => {
  return getAuth(app);
};

export const auth = getFirebaseAuth();
export default app;
