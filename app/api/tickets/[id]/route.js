import { NextResponse } from 'next/server';
import data from '../../../../_data/db.json'; 

// The second argument to GET, { params }, contains the dynamic route parameters
export async function GET(request, { params }) {
    const resolvedParams = await params; // Await the params to ensure they are resolved

    const ticketId = resolvedParams.id; 

    const ticket = data.tickets.find(t => t.id == ticketId);

    if (ticket) {
        return NextResponse.json(ticket, {
        status: 200,
        });
    }

    return NextResponse.json(
        { message: `Ticket with ID ${ticketId} not found.` },
        {
        status: 404,
        }
    );
}