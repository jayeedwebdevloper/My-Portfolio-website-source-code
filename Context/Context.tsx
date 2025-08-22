"use client";

import React, { createContext, useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "@/firebase.init";


const auth = getAuth(app);

export const ContextApi = createContext<any>(null);


const Context = ({ children }: { children: React.ReactNode }) => {
    const [userInformation, setUserInformation] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loginUser = async (email: string, password: string) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        localStorage.setItem("authToken", token);
        return userCredential;
    };


    const logOutUser = () => {
        return auth.signOut();
    }

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserInformation(user);
            } else {
                setUserInformation(null);
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const values = {
        userInformation,
        isLoading,
        setIsLoading,
        loginUser,
        logOutUser
    };
    return (
        <ContextApi.Provider value={values}>
            {children}
        </ContextApi.Provider>
    );
};

export default Context;