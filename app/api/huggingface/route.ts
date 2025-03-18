
import { NextRequest, NextResponse } from 'next/server';
import {getHuggingFaceKey} from "../../../../../vercel-rag-chatbot/ai-sdk-rag-starter/lib/utils/serverUtils";

export async function POST(req: NextRequest) {
    
  console.log('Using HUGGING: API route called');
  try {
    const { messages} = await req.json();


    const HF_API_URL = 'https://api-inference.huggingface.co/models/google/gemma-1.1-7b-it/v1/chat/completions'; 
    const HF_API_TOKEN = await getHuggingFaceKey();

        const payload = 
        {
          "model": "google/gemma-2-2b-it",
          "messages": [
            { "role": "user", 
              "content": messages 
            },
            { "role": "system", 
              "content": "Sei un assistente che si occupa di fornire informazioni"
            },
          ] ,
          "max_tokens": 500,
          "stream": false
      }
        
        const response = await fetch(HF_API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HF_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Errore API Hugging Face: ${JSON.stringify(response)}`);
        }

        console.log("RESPONSE OK FROM HUGGING")

        const data = await response.json();

        return NextResponse.json({ data: data });
      
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error in API route:', errorMessage);
    return NextResponse.json({ error: errorMessage || 'An error occurred while processing your request' }, { status: 500 });  
  }
}

