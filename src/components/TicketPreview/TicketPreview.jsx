import './TicketPreview.css';

const TicketPreview = ({ ticketData }) => {
  if (!ticketData) return null;

  return (
    <div className="ticket-preview">
      <div className="ticket-header">
        <h2>Techember Fest '25</h2>
        <p>March 15, 2025 | 7:00 PM</p>
      </div>

      <img
        src={ticketData.imageUrl}
        alt="Attendee"
        className="ticket-avatar"
      />

      <div className="ticket-info">
        <h3 className="ticket-name">{ticketData.fullName}</h3>
        <p className="ticket-email">{ticketData.email}</p>
        <div className="ticket-type-badge">
          {ticketData.ticketType.toUpperCase()} TICKET
        </div>
        <p>Quantity: {ticketData.quantity}</p>
      </div>

      <div className="ticket-details">
        <p>Ticket ID: {Math.random().toString(36).substr(2, 9)}</p>
        <p>Generated on {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default TicketPreview;