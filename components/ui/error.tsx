import React from "react";

type ErrorProps = {
    error: string;
}

export default function CustomError(props: ErrorProps) {


    return (
        <>
            {props.error && (
                <div className="text-center">
              <span className="inline-block p-2 rounded-lg bg-red-200">
                Errore: {props.error }
              </span>
                </div>
            )}
        </>
    );
}