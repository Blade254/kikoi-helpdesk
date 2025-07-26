import { notFound } from "next/navigation";

export const dynamicParams = true;

const apiUrl = process.env.URL || "http://localhost:3000";

export async function generateStaticParams() {
    const res = await fetch(`${apiUrl}/api/tickets`);
    const tickets = await res.json();

    //map through the tickets and return an array of objects with the id
    return tickets.map((ticket) => ({
        id: ticket.id.toString(),
    }));
}

async function getTicket(id) {
    //imitate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await fetch(`${apiUrl}/api/tickets/${id}`, {
        next: {
          revalidate: 60 // This tells Next.js to re-fetch the data every 60 seconds
        }
    });
    if (!res.ok) {
        notFound();
    }

    return res.json();
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
