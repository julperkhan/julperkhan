(function (root) {
  'use strict';
  const services = ['Graphic design', 'Web design', 'UI / UX design', 'Creative collaboration', 'Full-time opportunity'];
  function validateContact(data) {
    const name = String(data.name || '').trim();
    const email = String(data.email || '').trim();
    const message = String(data.message || '').trim();
    const service = String(data.service || '');
    if (!name || name.length > 100 || /[\r\n\x00-\x1f]/.test(name)) throw new Error('Please enter your name (up to 100 characters).');
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Please enter a valid email address.');
    if (message.length < 5 || message.length > 2000 || /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(message)) throw new Error('Please write a message between 5 and 2,000 characters.');
    if (!services.includes(service)) throw new Error('Please select a service from the list.');
    return { name, email, message, service };
  }
  function formatMessage(data) {
    const valid = validateContact(data);
    return `Hi Mohamed! I'd like to discuss a project.\n\nName: ${valid.name}\nEmail: ${valid.email}\nInterested in: ${valid.service}\n\n${valid.message}`;
  }
  function whatsappUrl(number, data) {
    const digits = String(number || '').replace(/[+\s()-]/g, '');
    if (!/^[1-9]\d{7,14}$/.test(digits) || (digits.startsWith('91') && digits.length !== 12)) throw new Error('WhatsApp contact is awaiting a full phone number. You can copy your message or email me instead.');
    return `https://wa.me/${digits}?text=${encodeURIComponent(formatMessage(data))}`;
  }
  root.PortfolioContact = { validateContact, formatMessage, whatsappUrl };
})(typeof window !== 'undefined' ? window : globalThis);