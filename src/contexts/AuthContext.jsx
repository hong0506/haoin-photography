import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);

  // 注册
  function signup(email, password) {
    if (!auth) {
      return Promise.reject(new Error('Firebase 未正确初始化'));
    }
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // 登录
  function login(email, password) {
    if (!auth) {
      return Promise.reject(new Error('Firebase 未正确初始化'));
    }
    return signInWithEmailAndPassword(auth, email, password);
  }

  // 登出
  function logout() {
    if (!auth) {
      return Promise.reject(new Error('Firebase 未正确初始化'));
    }
    return signOut(auth);
  }

  // 重置密码
  function resetPassword(email) {
    if (!auth) {
      return Promise.reject(new Error('Firebase 未正确初始化'));
    }
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    // 检查 Firebase auth 是否已初始化
    if (!auth) {
      console.error('Firebase auth is not initialized');
      setFirebaseError('Firebase 配置错误，某些功能可能无法使用');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    firebaseError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
