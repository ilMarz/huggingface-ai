
import { NextRequest, NextResponse } from 'next/server';
import {InferenceClient} from "@huggingface/inference";

export async function POST(req: NextRequest) {
    
  console.log('Using HUGGING: API route called');
  try {
    const { messages, model } = await req.json();

    if(!model || !model.value) {
      throw Error(`model is not correct: ${model}`)
    }
    const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

    const chatOpt = {
      model: model.value,
      messages: [
        { role: "system",
          content: "Sei un assistente che si occupa di fornire informazioni"
        },
        {
          role: "user",
          content: messages
        }
      ],
      max_tokens: 500,
    }

    const chatCompletion = await client.chatCompletion(model.provider ? {...chatOpt, provider: model.provider} : chatOpt);

    console.log("RESPONSE OK FROM HUGGING")

    return NextResponse.json({ data: chatCompletion });
      
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error in API route:', errorMessage);

    return NextResponse.json({ error: errorMessage || 'An error occurred while processing your request' }, { status: 500 });
  }
}

