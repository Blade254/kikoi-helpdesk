async function getTickets() {
    const res = await fetch('http://localhost:4000/tickets');
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function TicketList() {
const tickets = await getTickets();

  return (
    <>
        {tickets.map((ticket) => (
          <div className="card my-5" key={ticket.id}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
                {ticket.priority} priority
            </div>
          </div>
        ))}
        {tickets.length === 0 && (
          <div className="card">
            <h3>No tickets found</h3>
            <p>Looks like there are no tickets to display</p>
          </div>
        )}
    </>
  )
}

