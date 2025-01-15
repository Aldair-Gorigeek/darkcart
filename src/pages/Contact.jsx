import React from 'react';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact">
      <h1>Contacto</h1>
      <p>¿Tienes alguna pregunta o comentario? ¡Contáctanos!</p>
      <ul>
        <li>Email: contacto@darkcart.com</li>
        <li>Teléfono: +52 123 456 7890</li>
      </ul>
      <form>
        <label>
          Nombre:
          <input type="text" name="name" />
        </label>
        <label>
          Mensaje:
          <textarea name="message" />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contact;
