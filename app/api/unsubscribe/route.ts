
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const apiKey = process.env.CAMPAIGN_MONITOR_API_KEY;
        const listId = process.env.CAMPAIGN_MONITOR_LIST_ID;

        if (!apiKey || !listId) {
            console.error('Campaign Monitor credentials missing');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const auth = Buffer.from(`${apiKey}:x`).toString('base64');

        // Campaign Monitor API: Unsubscribe Subscriber
        // https://api.createsend.com/api/v3.3/subscribers/{listid}/unsubscribe.{xml|json}
        const response = await fetch(`https://api.createsend.com/api/v3.3/subscribers/${listId}/unsubscribe.json`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmailAddress: email
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Campaign Monitor Unsubscribe Error:', errorText);

            // If user is already unsubscribed or not in list (Code 203 or similar), we can treat it as success for UX
            // But let's log it.
            return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: response.status });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Unsubscribe API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
