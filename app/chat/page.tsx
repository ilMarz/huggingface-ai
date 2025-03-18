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
    const [isPanelOpen, setIsPanelOpen] = useState(true);
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
        <div className="flex flex-row justify-center h-screen p-10 gap-6 text-lg items-stretch bg-primary text-white">
                        <div className={`flex flex-col transition-all duration-300 ease-in-out ${isPanelOpen ? 'w-3/4' : 'w-[calc(100%-60px)]'}`}>
                            <div className="flex flex-col h-full w-full rounded-lg">
                                <div className="text-left  rounded-t-lg ">
                                    <div className={`text-6xl ${startConversation ? 'text-xs' : ''} text-[var(--main-color)] transition-all duration-300`}>How can I help you?</div>
                                    <div className={`text-[var(--main-color)] text-xl ${startConversation ? 'text-xs' : ''} transition-all duration-300`}> I am here to assist you with today&#39;s work
                                        tasks.
                                    </div>
                                </div>
                                <div className="flex-grow overflow-y-auto p-4  text-gray-200 text-base">
                                    {conversation.filter((m) => m.content !== "").map((m) => (
                                        <div key={m.id} className={`mb-4 flex ${m.role === "user" ? "text-right" : "text-left"}`}>
                                            {m.role != "user" && <div
                                                className={"h-12 w-12 p-2 rounded-full mr-2 flex justify-center items-center shadow drop-shadow-lg shadow-amber-50"}>
                                                <Image src={"/huggingface-2.svg"} alt={"huggingface"} width={"40"} height={"40"} />
                                            </div>}
                                            <div
                                                className={`mb-4 ${
                                                    m.role === "user"
                                                        ? "bg-[#C6E4F8] text-[#2E4063] p-3 rounded-lg shadow-md w-fit ml-auto"
                                                        : "bg-[#F3F8FA] text-[#2E4063] p-3 rounded-lg shadow-md w-fit"
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
                                <div className={"w-full flex justify-end"}>
                                    <button
                                        onClick={() => toggleBox()}
                                        className="z-10 bg-primary text-white rounded-full p-1 w-fit"
                                    >
                                        {!isBoxOpen ? <ChevronUp/> : <ChevronDown/>}
                                    </button>
                                </div>
                                <CardFooter
                                    className={`flex flex-col space-y-4  rounded-b-lg p-3 ${!isBoxOpen ? 'hidden' : ''}`}>

                                    <form onSubmit={onSubmit} className="relative w-full">
                                            <textarea
                                                placeholder="Ask anything..."
                                                className="w-full border border-gray-300 p-4 pr-12 resize-none rounded-lg min-h-[100px] bg-primary"
                                                disabled={isLoading}
                                                value={textMessage}
                                                onChange={(e) => {
                                                    setTextMessage(e.target.value)
                                                }}
                                                onKeyDown={handleUserKeyPress}
                                            />
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="absolute bottom-2 right-2 hover:bg-blue-700 text-white rounded-full p-2 transition duration-200 bg-transparent"
                                        >
                                            <PaperAirplaneIcon className="h-5 w-5 text-gray-400"/>
                                            <span className="sr-only">Invia</span>
                                        </Button>
                                    </form>

                                </CardFooter>
                            </div>
                        </div>
        </div>
    );
}