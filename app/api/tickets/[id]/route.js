import { NextResponse } from 'next/server';
import data from '../../../../_data/db.json'; 

// The second argument to GET, { params }, contains the dynamic route parameters
export async function GET(request, { params }) {
  const ticketId = await params.id; // This will be '2' from the URL '/api/tickets/2'

  // Find the ticket in our data that matches the ID from the URL
  const ticket = data.tickets.find(t => t.id == ticketId);

  // If a ticket is found, return it
  if (ticket) {
    return NextResponse.json(ticket, {
      status: 200,
    });
  }

  // If no ticket is found, return a 404 error
  return NextResponse.json(
    { message: `Ticket with ID ${ticketId} not found.` },
    {
      status: 404,
    }
  );
}