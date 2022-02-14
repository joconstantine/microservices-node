import Link from 'next/link';

import buildClient from '../api/build-client';

const LandingPage = ({ tickets }) => {
  let ticketList;
  if (!tickets) {
    ticketList = <h2>No tickets found!</h2>;
  } else {
    ticketList = tickets.map((ticket) => {
      return (
        <tr key={ticket.id}>
          <td>{ticket.title}</td>
          <td>{ticket.price}</td>
          <td>
            <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
              <a>View</a>
            </Link>
          </td>
        </tr>
      );
    });
  }
  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/tickets');
  return {
    props: { tickets: data },
  };
};

export default LandingPage;
