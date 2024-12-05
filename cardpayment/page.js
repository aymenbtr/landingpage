"use client";
import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

const PaymentForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) return parts.join(' ');
    return value;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const formattedValue = formatCardNumber(value);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else if (name === 'expiryDate') {
      const formatted = value
        .replace(/[^\d]/g, '')
        .substring(0, 4)
        .replace(/(\d{2})(\d)/, '$1/$2');
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const styles = {
    container: {
      maxWidth: '450px',
      margin: '2rem auto',
      padding: '2rem',
      background: 'linear-gradient(135deg, #f6f9fc 0%, #eef2f7 100%)',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.08), 0 10px 20px rgba(0,0,0,0.06)',
      fontFamily: "'Segoe UI', Arial, sans-serif",
    },
    cardPreview: {
      position: 'relative',
      height: '200px',
      marginBottom: '2rem',
      perspective: '2000px',
    },
    card: { 
      position: 'absolute', 
      width: '100%', 
      height: '100%', 
      transformStyle: 'preserve-3d', 
      transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)', 
      willChange: 'transform', 
      cursor: 'pointer', 
    },
    cardFace: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
    },
    cardFront: {
      background: 'url("images/golden-card.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '20px',
    },
    cardBack: {
      transform: 'rotateY(180deg)',
      background: 'linear-gradient(135deg, #1e54a0 0%, #0a2e63 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    cardInfo: {
      position: 'relative',
      zIndex: 2,
      color: '#ffffff',
      textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
    },
    cardNumber: {
      fontSize: '24px',
      letterSpacing: '2.5px',
      marginBottom: '20px',
      fontFamily: 'monospace',
      fontWeight: '500',
    },
    cardDetails: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardName: {
      fontSize: '16px',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
    },
    cardExpiry: {
      fontSize: '16px',
      fontFamily: 'monospace',
    },
    cardStrip: {
      background: 'rgba(0,0,0,0.8)',
      height: '40px',
      marginTop: '20px',
    },
    cardCvv: {
      background: '#fff',
      color: '#000',
      padding: '10px',
      marginTop: '20px',
      borderRadius: '5px',
      fontSize: '16px',
      textAlign: 'right',
      width: '60px',
      marginLeft: 'auto',
      marginRight: '20px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    inputGroup: {
      position: 'relative',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.95rem',
      color: '#4a5568',
      fontWeight: '500',
      letterSpacing: '0.3px',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e2e8f0',
      borderRadius: '10px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      outline: 'none',
      backgroundColor: 'rgba(255,255,255,0.9)',
      color: '#000',
    },
    numericInput: {
      color: '#FFD700',
    },
    row: {
      display: 'flex',
      gap: '1rem',
    },
    submitButton: {
      background: 'linear-gradient(135deg, #1e54a0 0%, #2d7be3 100%)',
      color: '#ffffff',
      padding: '16px',
      border: 'none',
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '1.5rem',
      letterSpacing: '0.5px',
      boxShadow: '0 4px 12px rgba(45,123,227,0.2)',
    },
    successMessage: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: '#4CAF50',
      color: 'white',
      padding: '16px 24px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)',
      animation: 'slideIn 0.5s ease-out',
      zIndex: 1000,
    },
    successIcon: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5001/add-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
        
        setFormData({
          cardNumber: '',
          cardName: '',
          expiryDate: '',
          cvv: ''
        });
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      alert("An error occurred while saving the payment.");
    }
  };

  return (
    <>
      {showSuccess && (
        <div style={styles.successMessage}>
          <div style={styles.successIcon}>
            <Check size={24} />
            <span>Payment sent successfully</span>
          </div>
          <ArrowRight size={24} />
        </div>
      )}
      
      <div style={styles.container}>
        <div style={styles.cardPreview}>
          <div 
            style={{
              ...styles.card,
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
            }}
          >
            <div style={{...styles.cardFace, ...styles.cardFront}}>
              <div style={styles.cardInfo}>
                <div style={styles.cardNumber}>
                  {formData.cardNumber || '•••• •••• •••• ••••'}
                </div>
                <div style={styles.cardDetails}>
                  <div style={styles.cardName}>
                    {formData.cardName || 'CARD HOLDER'}
                  </div>
                  <div style={styles.cardExpiry}>
                    {formData.expiryDate || 'MM/YY'}
                  </div>
                </div>
              </div>
            </div>
            <div style={{...styles.cardFace, ...styles.cardBack}}>
              <div style={styles.cardStrip}></div>
              <div style={styles.cardCvv}>
                {formData.cvv || 'CVV'}
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleInputChange}
              style={{
                ...styles.input,
                '&:focus': {
                  borderColor: '#3182ce',
                  boxShadow: '0 0 0 3px rgba(49,130,206,0.1)',
                }
              }}
              maxLength="19"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Cardholder Name</label>
            <input
              type="text"
              name="cardName"
              placeholder="Enter The Name"
              value={formData.cardName}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleInputChange}
                style={styles.input}
                maxLength="5"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>CVV</label>
              <input
                type="password"
                name="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={handleInputChange}
                style={{
                  ...styles.input,
                  ...(name === 'cvv' ? styles.numericInput : {}),
                }}
                maxLength="3"
                required
                onFocus={() => setIsFlipped(true)}
                onBlur={() => setIsFlipped(false)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            style={styles.submitButton}
            onMouseOver={e => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 16px rgba(45,123,227,0.3)';
              e.target.style.background = 'linear-gradient(135deg, #2d7be3 0%, #1e54a0 100%)';
            }}
            onMouseOut={e => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(45,123,227,0.2)';
              e.target.style.background = 'linear-gradient(135deg, #1e54a0 0%, #2d7be3 100%)';
            }}
          >
            Pay Now
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentForm;