import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from './config';
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({});

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }
    useEffect(() => {

        const logout = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            logout();
        }

    },[])

    return(
        <UserContext.Provider value={{ login, logout, user, createUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(UserContext)
}