import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function GET() {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Test the API with a simple completion
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello! This is a test message." }
      ],
      max_tokens: 50,
    });

    return NextResponse.json({
      status: "success",
      message: "OpenAI API is working correctly",
      response: completion.choices[0].message.content
    });
  } catch (error: any) {
    console.error('Test API Error:', error);
    
    return NextResponse.json({
      status: "error",
      message: error.message || "Failed to connect to OpenAI API",
      details: error
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const body = await req.json();
    return NextResponse.json({ 
      message: 'Test successful',
      receivedData: body 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}