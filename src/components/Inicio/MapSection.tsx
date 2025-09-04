// src/components/MapSection.tsx

import './MapSection.css';

const MapSection = () => {
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3878.974559823998!2d-71.90649418951698!3d-13.53715208677774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916e7edf8692efd5%3A0xb2151ede7622f88b!2sUniversidad%20Andina%20del%20Cusco!5e0!3m2!1ses-419!2spe!4v1755482102341!5m2!1ses-419!2spe";

  return (
    <section id="map" className="map-container">
      <div className="map-header">
        <h2>Nuestras <span>Tiendas</span></h2>
        <p>
          Encuentra tu tienda D'JAVI ESPORT más cercana. Visítanos y vive una
          experiencia de compra única con asesoramiento personalizado de
          nuestros expertos.
        </p>
      </div>

      <div className="map-frame-container">
        <iframe
          src={mapEmbedUrl}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de Tiendas D'JAVI ESPORT"
        ></iframe>
      </div>
    </section>
  );
};

export default MapSection;
