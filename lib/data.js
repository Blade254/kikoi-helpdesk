import fs from 'fs';
import path from 'path';


const dbPath = path.join(process.cwd(), '_data', 'db.json');

export function getAllTickets() {
  const fileContents = fs.readFileSync(dbPath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.tickets;
}


export function getTicketById(id) {
  const allTickets = getAllTickets();
  
  const ticket = allTickets.find(t => t.id.toString() === id);

  return ticket;
}