import { notFound } from "next/navigation";
import { getAllTickets, getTicketById } from "../../../lib/data";

export const dynamicParams = true;

const apiUrl = process.env.URL || "http://localhost:3000";

export async function generateStaticParams() {
    const tickets = getAllTickets(); // Direct function call

    return tickets.map((ticket) => ({
        id: ticket.id.toString(),
    }));
}

async function getTicket(id) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const ticket = getTicketById(id); // Direct function call

    if (!ticket) {
        notFound();
    }

    return ticket;
}

export default async function TicketDetails({ params }) {
    //params has to be awaited because of how next 15 handles dynamic APIs
    //normally i would store the id directly in a variable but that would cause an error hence awaiting params first then accesing the value of the 'param' props
    const resolvedParams = await params;
    const ticket  = await getTicket(resolvedParams.id);

    return (
        <main>
            <nav>
                <h2>Ticket Details</h2>
            </nav>
            <div className="card">
                <h3>{ticket.title}</h3>
                <small>Created by {ticket.user_email}</small>
                <p>{ticket.body}</p>
                <div className={`pill ${ticket.priority}`}>
                    {ticket.priority} priority
                </div>
            </div>
        </main>
    )
}
