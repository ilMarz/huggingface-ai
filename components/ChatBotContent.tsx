'use client';
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/solid";

interface ChatBotContentProps {
    message: string;
}

const ChatBotContent = ({ message }: ChatBotContentProps) => {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(code);
            // Ritorna al pulsante originale dopo 2 secondi
            setTimeout(() => setCopied(null), 2000);
        });
    };

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                p: ({ node, ...props }) => (
                    <span  {...props} />
                ),
                ul: ({ node, ...props }) => (
                    <ul className="list-inside list-disc" {...props} />
                ),
                ol: ({ node, ...props }) => (
                    <ol className="list-inside list-decimal" {...props} />
                ),
                strong: ({ node, ...props }) => (
                    <strong className="font-bold" {...props} />
                ),
                code: ({ children, className, ...props }) => {
                    const codeText = String(children).trim();
                    const isInline = !className;

                    if (isInline) {
                        return (
                            <code className="bg-gray-100 px-1 rounded" {...props}>
                                {codeText}
                            </code>
                        );
                    }

                    return (
                        <div className="relative bg-purple-100 text-black p-4 rounded-lg my-4 border-2 border-purple-800">
                            <button
                                onClick={() => handleCopy(codeText)}
                                className="absolute top-2 right-2 flex items-center bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
                            >
                                {copied === codeText ? (
                                    <CheckIcon className="h-5 w-5 mr-1" />
                                ) : (
                                    <ClipboardDocumentIcon className="h-5 w-5 mr-1" />
                                )}
                                {copied === codeText ? "Copiato!" : "Copia codice"}
                            </button>
                            <pre className="overflow-auto">
                <code className={className} {...props}>
                  {codeText}
                </code>
              </pre>
                        </div>
                    );
                },
                img: ({ node, ...props }) => (<div className={"relative"}><img className="w-[50%] m-auto" {...props}  alt={"immage"}/></div>)
            }}
        >
            {message}
        </ReactMarkdown>
    );
};

// Avvolgi il componente con React.memo
export default React.memo(ChatBotContent);