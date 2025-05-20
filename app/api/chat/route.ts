import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    // Log the incoming request
    console.log('Received chat request');

    // Parse request body
    const body = await req.json();
    const { messages, currentChallenge, code } = body;

    // Validate request data
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    // Log request details
    console.log('Chat request details:', {
      messageCount: messages.length,
      hasChallenge: !!currentChallenge,
      hasCode: !!code
    });

    // Create system prompt
    const systemPrompt = `You are Edusmart, an educational AI assistant for a learning platform. 
    Your role is to help students learn and understand concepts.
    
    Current context:
    ${currentChallenge ? `Challenge: ${currentChallenge.title}\nDescription: ${currentChallenge.description}` : ''}
    ${code ? `Current code:\n${code}` : ''}
    
    Guidelines:
    1. Be encouraging and supportive
    2. Provide clear explanations
    3. Give helpful hints without giving away solutions
    4. Help debug code issues
    5. Explain concepts in simple terms
    6. Ask follow-up questions to ensure understanding
    
    Always maintain a friendly and educational tone.`;

    // Make API call to OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Log successful response
    console.log('Successfully received response from OpenAI');

    // Return the response
    return NextResponse.json({
      response: completion.choices[0].message.content,
    });
  } catch (error: any) {
    // Handle errors
    console.error('Chat API Error:', error);
    
    // Check for specific error types
    if (error.status === 401) {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your OpenAI API key configuration.' },
        { status: 401 }
      );
    } else if (error.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to process chat request',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}