// src/components/Contact.tsx

import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-container light-bg">
      <div className="contact-header">
        <h2>Ponte en <span>Contacto</span></h2>
        <p>¿Tienes dudas sobre un producto, tu pedido o quieres colaborar con nosotros? Nuestro equipo está listo para ayudarte. ¡No dudes en escribirnos!</p>
      </div>

      <div className="contact-content-grid">
        {/* Columna de Información de Contacto */}
        <div className="contact-info-card">
          <h3>Información de Contacto</h3>
          <div className="info-item">
            <img src="/icons/email.svg" alt="Email" className="info-icon" />
            <div>
              <h4>Atención al Cliente</h4>
              <p>soporte@djaviesport.com</p>
            </div>
          </div>
          <div className="info-item">
            <img src="/icons/phone.svg" alt="Phone" className="info-icon" />
            <div>
              <h4>Teléfono</h4>
              <p>+51 984 954 028</p>
            </div>
          </div>
          <div className="info-item">
            <img src="/icons/location.svg" alt="Oficina" className="info-icon" />
            <div>
              <h4>Oficina Central</h4>
              <p>Av. General Gamarra #410, Quillabamba, Perú</p>
            </div>
          </div>
        </div>

        {/* Columna del Formulario */}
        <div className="contact-form-card">
          <h3>Envíanos un Mensaje</h3>
          <form>
            <div className="form-group-split">
              <div className="form-group">
                <label htmlFor="name">Tu Nombre</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Tu Correo</label>
                <input type="email" id="email" name="email" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Asunto</label>
              <input type="text" id="subject" name="subject" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Tu Mensaje</label>
              <textarea id="message" name="message" rows={5} required></textarea>
            </div>
            <button type="submit" className="btn-submit">Enviar Mensaje</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;