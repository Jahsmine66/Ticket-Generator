import { useState } from 'react';
import TicketForm from './components/TicketForm/TicketForm';
import TicketPreview from './components/TicketPreview/TicketPreview';
import './App.css';

function App() {
  const [generatedTicket, setGeneratedTicket] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleTicketGeneration = async (formData) => {
    try {
      setError(null);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setGeneratedTicket(formData);
      setSuccess(true);
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
      
      // You would typically make an API call here to save the ticket data
      // const response = await fetch('/api/tickets', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      // const data = await response.json();
      // setGeneratedTicket(data);
    } catch (err) {
      setError('Failed to generate ticket. Please try again.');
      console.error('Ticket generation error:', err);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Conference Ticket Generator</h1>
        <p className="app-description">
          Generate your ticket for Techember Fest '25
        </p>
      </header>

      {error && (
        <div className="error-container" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="success-container" role="alert">
          Ticket generated successfully!
        </div>
      )}

      <TicketForm onSubmit={handleTicketGeneration} />
      
      {generatedTicket && <TicketPreview ticketData={generatedTicket} />}
    </div>
  );
}

export default App;
