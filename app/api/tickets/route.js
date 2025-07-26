import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import tickets from '../../../_data/db.json';

export async function GET() {
  return NextResponse.json(tickets.tickets, {
    status: 200,
  });
}

export async function POST(request) {
  // Get the new ticket data from the request body
  const newTicket = await request.json();

  // Find the path to the db.json file
  const dbPath = path.join(process.cwd(), '_data', 'db.json');
  
  // Read the current data from the file
  const currentData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

  // Add the new ticket to the array
  currentData.tickets.push(newTicket);
  
  // Write the updated data back to the file
  fs.writeFileSync(dbPath, JSON.stringify(currentData, null, 2));

  // Return a success response with the newly created ticket
  return NextResponse.json(newTicket, {
    status: 201,
  });
}