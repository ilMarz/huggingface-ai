'use client';
import {signIn, useSession} from "next-auth/react";
import React, {useEffect, useState} from "react";
import {useServerCall} from "@/lib/utils/fetch/UseServerCall";

export default function LoginPage() {
    const {fetchWithLoading} = useServerCall();


    const { data: session, status } = useSession();


    const performLogin = () => {
        fetchWithLoading(() => signIn("auth0", {callbackUrl: "/chat"}));
    }

    useEffect(() => {
        if(session && status == "authenticated") {
            performLogin()
        }
    }, [session]);


    return (
        <div
            className="flex items-center justify-center min-h-screen bg-colorprimary text-white p-6">
            <div className="bg-[#FDC533] text-black p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-white">Login</h1>

                <div
                    className="cursor-pointer px-4 py-2 transition duration-200 truncate flex flex-row align-center bg-colorprimary w-full rounded-full justify-center">
                    {status!="loading" &&
                        <button className={"w-full transition duration-200 truncate text-white"}
                             onClick={() => performLogin()}>Accedi
                        </button>}
                </div>
            </div>
            <footer className="mt-auto pt-4 text-sm text-gray-300">
                Hugging Face AI - made with by &#10084 Valerio Marzulli
            </footer>
        </div>
    );
}
