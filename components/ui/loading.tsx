import React from "react";

type LoadingProps = {
    showLoading: boolean;
}

export default function Loading(props: LoadingProps) {


    return (
        <>
            {props.showLoading && (
                <div className="flex justify-center items-center space-x-2">
                    <div className="w-3 h-3 bg-[#BA1F31] rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-[#BA1F31] rounded-full animate-pulse animation-delay-200"></div>
                    <div className="w-3 h-3 bg-[#BA1F31] rounded-full animate-pulse animation-delay-400"></div>
                </div>
            )}
        </>
    );
}