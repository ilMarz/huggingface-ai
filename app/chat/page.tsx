'use client';

import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import React, {FormEvent, useRef, useState} from 'react'
import ChatBotContent from "@/components/ChatBotContent";
import Loading from "@/components/ui/loading";
import CustomError from "@/components/ui/error";
import {ChevronDown, ChevronUp} from "lucide-react";
import {PaperAirplaneIcon} from "@heroicons/react/24/solid";
import Image from 'next/image';

interface ConversationMessage  {
    id: number | string;
    role: string;
    content: string;

}

export default function Chat() {
    const [conversation, setConversation] = useState<ConversationMessage[]>([] as ConversationMessage[])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [textMessage, setTextMessage] = useState("");
    const [startConversation, setStartConversation] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [isBoxOpen, setIsBoxOpen] = useState(true);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const toggleBox = () => {
        setIsBoxOpen(prevState => {return !prevState});
        scrollToBottom()
    };

    const handleUserKeyPress = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            // e.preventDefault();
            await onSubmit(e);
        }
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()

        await handleSubmitHugging()

        setTextMessage("");

    }

    const handleSubmitHugging = async () => {
        setIsLoading(true)
        const conversationMessageUser: ConversationMessage = {
            id: Date.now(),
            role: "user",
            content: textMessage
        }
        setConversation(prevConversation => [...prevConversation, conversationMessageUser]);

        const body = JSON.stringify({ messages: textMessage });

        try {
            const res = await fetch('/api/huggingface/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body,
            });

            const data = await res.json();
            const conversationMessage: ConversationMessage = {
                id: data.data.created,
                role: "assistant",
                content: data.data.choices[0]?.message?.content
            }

            setConversation(prevConversation => [...prevConversation, conversationMessage]);
            setIsLoading(false)

        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);  // Usa il messaggio dell'errore
            } else {
                setError("Errore sconosciuto durante la richiesta.");
            }
            console.error("Errore:", error);
            setIsLoading(false)
        }
    };

    return (
        <div className="flex flex-col h-screen bg-primary text-white">
            {/* Fixed header */}
            <div className="text-center rounded-t-lg p-4 bg-primary sticky top-0 z-10">
                <div
                    className={`text-3xl md:text-6xl ${startConversation ? "text-sm md:text-xs" : ""} text-[var(--main-color)] transition-all duration-300`}
                >
                    How can I help you?
                </div>
                <div
                    className={`text-[var(--main-color)] text-base md:text-xl ${startConversation ? "text-xs" : ""} transition-all duration-300`}
                >
                    I am here to assist you with today&#39;s work tasks.
                </div>
            </div>

            {/* Main chat container with flex-grow to take available space */}
            <div className="flex-1 flex flex-col p-4 md:p-10 overflow-hidden">
                <div
                    className={`flex flex-col h-full w-full rounded-lg transition-all duration-300 ease-in-out md:w-3/4 mx-auto`}
                >
                    {/* Scrollable message area */}
                    <div className="flex-grow overflow-y-auto p-2 md:p-4 text-gray-200 text-sm md:text-base">
                        {conversation
                            .filter((m) => m.content !== "")
                            .map((m) => (
                                <div key={m.id}
                                     className={`mb-4 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                    {m.role !== "user" && (
                                        <div
                                            className="h-8 w-8 md:h-12 md:w-12 p-1 md:p-2 rounded-full mr-2 flex justify-center items-center shadow drop-shadow-lg shadow-amber-50">
                                            <Image src="/huggingface-2.svg" alt="assistant" width={40}
                                                   height={40}/>
                                        </div>
                                    )}
                                    <div
                                        className={`mb-4 max-w-[75%] md:max-w-[70%] ${
                                            m.role === "user"
                                                ? "bg-[#C6E4F8] text-[#2E4063] p-2 md:p-3 rounded-lg shadow-md"
                                                : "bg-[#F3F8FA] text-[#2E4063] p-2 md:p-3 rounded-lg shadow-md"
                                        }`}
                                    >
                                        {m.role === "user" ? m.content : <ChatBotContent message={m.content}/>}
                                    </div>
                                    <div ref={messagesEndRef}/>
                                </div>
                            ))}
                        <Loading showLoading={isLoading}/>
                        <CustomError error={error}/>
                    </div>

                    {/* Input area toggle button */}
                    <div className="w-full flex justify-end">
                        <button onClick={toggleBox} className="z-10 bg-primary text-white rounded-full p-1 w-fit">
                            {!isBoxOpen ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                        </button>
                    </div>

                    {/* Input area */}
                    <CardFooter
                        className={`flex flex-col space-y-4 rounded-b-lg p-2 md:p-3 ${!isBoxOpen ? "hidden" : ""}`}>
                        <form onSubmit={onSubmit} className="relative w-full">
              <textarea
                  placeholder="Ask anything..."
                  className="w-full border border-gray-300 p-3 pr-10 md:p-4 md:pr-12 resize-none rounded-lg min-h-[60px] md:min-h-[100px] bg-primary"
                  disabled={isLoading}
                  value={textMessage}
                  onChange={(e) => setTextMessage(e.target.value)}
                  onKeyDown={handleUserKeyPress}
              />
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="absolute bottom-2 right-2 hover:bg-blue-700 text-white rounded-full p-1 md:p-2 transition duration-200 bg-transparent"
                            >
                                <PaperAirplaneIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400"/>
                                <span className="sr-only">Invia</span>
                            </Button>
                        </form>
                    </CardFooter>
                </div>
            </div>
        </div>
    );
}