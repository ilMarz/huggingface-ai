import {useLoading} from "@/lib/utils/context/LoadingContext";
import React from "react";

export const Loader = () => {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="flex">
                <div className="flex justify-center items-center space-x-2">
                    <div className="w-3 h-3 bg-[#BA1F31] rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-[#BA1F31] rounded-full animate-pulse animation-delay-200"></div>
                    <div className="w-3 h-3 bg-[#BA1F31] rounded-full animate-pulse animation-delay-400"></div>
                </div>
            </div>
        </div>
    );
};