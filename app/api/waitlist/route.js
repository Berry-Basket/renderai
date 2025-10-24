import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Send to Formspree
    const formspreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_WEBHOOK_URL;
    
    if (formspreeUrl) {
      try {
        await fetch(formspreeUrl, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            timestamp: new Date().toISOString()
          })
        });
      } catch (fetchError) {
        console.error('Error sending to Formspree:', fetchError);
      }
    }

    console.log('Received waitlist submission:', { name, email });

    return NextResponse.json({
      success: true,
      message: 'Successfully joined waitlist'
    }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}