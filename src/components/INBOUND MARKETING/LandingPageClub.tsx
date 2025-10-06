import { useState } from 'react';
import './LandingPages.css';

const countryCodes = [
  { code: '+51', name: 'Perú (PE)' },
  { code: '+52', name: 'México (MX)' },
  { code: '+57', name: 'Colombia (CO)' },
  { code: '+54', name: 'Argentina (AR)' },
  { code: '+56', name: 'Chile (CL)' },
  { code: '+34', name: 'España (ES)' },
  { code: '+1', name: 'EE.UU. (US)' },
];

const LandingPageClub = () => {
  const [countryCode, setCountryCode] = useState(countryCodes[0].code);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        <img src="/logowhats.png" alt="Club VIP de WhatsApp" />
        <div>
          <h2>Únete al Club VIP de WhatsApp y obtén acceso exclusivo</h2>
          <p>Sé el primero en enterarte de lanzamientos, ofertas secretas y accede a preventas antes que nadie. ¡Directo a tu WhatsApp!</p>
          <ul>
            <li>Ofertas solo para miembros</li>
            <li>Acceso anticipado a nuevos modelos</li>
            <li>Sorteos y regalos exclusivos</li>
          </ul>
          
          <form className="landing-form" onSubmit={handleSubmit}>
            <div className="phone-input-group">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                disabled={isSubmitted}
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {`${country.name} (${country.code})`}
                  </option>
                ))}
              </select>
              <input 
                type="tel" 
                placeholder="Tu número de WhatsApp" 
                required 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                disabled={isSubmitted}
              />
            </div>
            
            <button type="submit" className="btn-submit" disabled={isSubmitted}>
              {isSubmitted ? 'ENVIADO' : '¡UNIRME AL CLUB AHORA!'}
            </button>
          </form>

          {isSubmitted && (
            <div className="confirmation-message">
              Ya se le envió un mensaje a su WhatsApp, gracias.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPageClub;