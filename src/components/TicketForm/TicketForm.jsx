import { useState, useEffect } from 'react';
import ImageUpload from '../ImageUpload/ImageUpload';
import { validateForm } from '../../utils/validation';
import './TicketForm.css';

const TicketForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('ticketFormData');
    return saved ? JSON.parse(saved) : {
      fullName: '',
      email: '',
      imageUrl: '',
      imageFile: null,
      ticketType: '',
      quantity: 1
    };
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem('ticketFormData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = ({ url, file }) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: url,
      imageFile: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
      // Clear form
      setFormData({
        fullName: '',
        email: '',
        imageUrl: '',
        imageFile: null,
        ticketType: '',
        quantity: 1
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const ticketTypes = [
    { id: 'free', label: 'FREE', price: '$0' },
    { id: 'vip', label: 'VIP', price: '$50' },
    { id: 'vvip', label: 'VVIP', price: '$150' }
  ];

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h1 className="form-title">Techember Fest '25</h1>
        <h4>Join us for an unforgetable experience at Techember! Secure your spot now</h4>
        <p>AsoRock, Abuja || March 15, 2025 || 7:00 PM</p>
      </div>

      <div className='ticket-type-header'>Select Ticket Type:</div>

      <div className="ticket-type-selection">
        {ticketTypes.map(type => (
          <div
            key={type.id}
            className={`ticket-type ${formData.ticketType === type.id ? 'selected' : ''}`}
            onClick={() => handleChange({ target: { name: 'ticketType', value: type.id } })}
          >
            
            <h3>{type.label}</h3>
            <p>{type.price}</p>
          </div>
        ))}
      </div>

      <ImageUpload onImageChange={handleImageChange} error={errors.image} />

      <div className="form-group">
        <label className="form-label" htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          className="form-input"
          value={formData.fullName}
          onChange={handleChange}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
        />
        {errors.fullName && (
          <p className="error-text" id="fullName-error">{errors.fullName}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p className="error-text" id="email-error">{errors.email}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="quantity">Number of Tickets</label>
        <select
          id="quantity"
          name="quantity"
          className="form-input"
          value={formData.quantity}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={!formData.ticketType}
      >
        Generate Ticket
      </button>
    </form>
  );
};

export default TicketForm;