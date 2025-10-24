export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email required' });
    }

    try {
      const formspreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_WEBHOOK_URL;
      
      if (formspreeUrl) {
        const response = await fetch(formspreeUrl, {
          method: 'POST'
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

        if (!response.ok) {
          console.error('Formspree error:', response.status);
        }
      }

      return res.status(200).json({ 
        success: true, 
        message: 'Successfully joined waitlist' 
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(200).json({ 
        success: true, 
        message: 'Successfully joined waitlist' 
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}