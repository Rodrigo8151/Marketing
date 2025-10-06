import { useParams, Link } from 'react-router-dom';
import './Blog.css';

// --- CONTENIDO DE BLOG AMPLIADO Y MÁS REALISTA ---
const blogPostsData = [
  { 
    id: 'mejores-rutas-quillabamba',
    title: 'Las 5 Mejores Rutas para Correr en Quillabamba',
    imageUrl: '/blog1.jpg',
    author: "D'JAVI ESPORT Team",
    date: '25 de Octubre, 2023',
    content: `
      <p>Correr es más que un ejercicio; es una forma de explorar y conectar con nuestro entorno. En Quillabamba, tenemos la suerte de estar rodeados de paisajes espectaculares que invitan a la aventura. Si eres un corredor apasionado o estás empezando, estas 5 rutas te llevarán a otro nivel y te mostrarán la belleza de nuestra tierra.</p>
      
      <h3>1. El Circuito del Malecón</h3>
      <p><strong>Dificultad:</strong> Baja. <br><strong>Ideal para:</strong> Principiantes, entrenamientos de velocidad y carreras de recuperación. <br>Un recorrido plano, seguro y completamente pavimentado con vistas relajantes al río Urubamba. Es perfecto para correr temprano en la mañana o al atardecer. Puedes hacer varias vueltas para sumar kilómetros sin preocuparte por el tráfico.</p>
      
      <h3>2. Ascenso al Mirador San Lázaro</h3>
      <p><strong>Dificultad:</strong> Media-Alta. <br><strong>Ideal para:</strong> Entrenamiento de cuestas y fortalecimiento. <br>¿Buscas un desafío? Esta ruta pondrá a prueba tu resistencia con una subida constante y gratificante. El esfuerzo vale la pena: la vista panorámica de toda la ciudad desde la cima es la mejor recompensa. ¡No olvides tu cámara!</p>
      
      <h3>3. La Ruta del Café (Circuito Sambaray)</h3>
      <p><strong>Dificultad:</strong> Media. <br><strong>Ideal para:</strong> Trail running y amantes de la naturaleza. <br>Este sendero te sumerge en el corazón de la selva alta. Correrás entre plantaciones de café y vegetación exuberante. El terreno es mixto (tierra, piedras sueltas), por lo que es crucial llevar zapatillas de trail con buen agarre. El aroma a café fresco en el aire es un extra increíble.</p>

      <h3>4. Vuelta a la Laguna de Josefina</h3>
      <p><strong>Dificultad:</strong> Baja-Media. <br><strong>Ideal para:</strong> Carreras largas y de ritmo constante. <br>Un hermoso circuito que rodea la tranquila Laguna de Josefina. El terreno es mayormente plano, con algunas ondulaciones suaves. Es un escape perfecto del ruido de la ciudad, donde solo escucharás el sonido de tus pisadas y la naturaleza.</p>

      <h3>5. El Sendero del Gallito de las Rocas</h3>
      <p><strong>Dificultad:</strong> Alta. <br><strong>Ideal para:</strong> Corredores experimentados y aventureros. <br>Una ruta técnica y exigente que se adentra en el bosque de neblina. Es un desafío tanto físico como mental, pero ofrece la posibilidad de avistar al icónico Gallito de las Rocas. Se recomienda ir en grupo y con buena hidratación.</p>

      <p>Recuerda que para cada tipo de terreno, necesitas el calzado adecuado. Unas buenas zapatillas de asfalto para el malecón no te servirán en el sendero del Gallito. Pásate por nuestra <strong>tienda D'JAVI ESPORT en Quillabamba</strong> y te asesoraremos para que encuentres tu par perfecto.</p>
    `
  },
  { 
    id: 'cuidado-zapatillas-running',
    title: 'Guía Definitiva: Cómo Cuidar tus Zapatillas de Running',
    imageUrl: '/blog3.jpg',
    author: "D'JAVI ESPORT Team",
    date: '15 de Noviembre, 2023',
    content: `
      <p>Tus zapatillas son tu mayor inversión y tu principal herramienta como corredor. Cuidarlas adecuadamente no solo extiende su vida útil, sino que también protege tus articulaciones y previene lesiones. Aquí te dejamos los mejores consejos de nuestros expertos.</p>
      
      <h3>1. Limpieza: Menos es Más</h3>
      <p><strong>Nunca, jamás, las metas en la lavadora o secadora.</strong> El calor y el movimiento agresivo deforman la espuma (EVA), debilitan los adhesivos y destruyen la estructura de la zapatilla. La forma correcta es:</p>
      <ul>
        <li>Quita el exceso de barro y suciedad con un cepillo suave o un paño seco.</li>
        <li>Usa agua fría y un jabón neutro. Frota suavemente las zonas manchadas.</li>
        <li>Limpia las plantillas y los cordones por separado.</li>
      </ul>

      <h3>2. Secado: La Paciencia es tu Aliada</h3>
      <p>El secado es tan importante como la limpieza. <strong>Nunca las expongas al sol directo o a fuentes de calor</strong> como radiadores. El calor daña los materiales y los hace quebradizos. Lo ideal es:</p>
      <ul>
        <li>Rellenarlas con papel de periódico o de cocina para que absorba la humedad desde dentro. Cámbialo cada pocas horas.</li>
        <li>Dejarlas en un lugar ventilado y a la sombra hasta que estén completamente secas.</li>
      </ul>

      <h3>3. Rotación: Dales un Descanso</h3>
      <p>Si corres con frecuencia, tener dos pares de zapatillas y alternarlos es una de las mejores prácticas. ¿Por qué? La espuma de la mediasuela necesita tiempo (unas 24-48h) para descomprimirse y recuperar el 100% de sus propiedades de amortiguación. Al rotarlas, ambas te durarán más y te protegerán mejor.</p>

      <h3>4. Uso Exclusivo para Correr</h3>
      <p>Evita usar tus zapatillas de running para ir al gimnasio, caminar o para tu día a día. Cada actividad tiene patrones de movimiento y desgaste diferentes. Reservarlas solo para correr preservará la integridad de la suela y la amortiguación para lo que fueron diseñadas.</p>
      
      <h3>5. Saber Cuándo Decir Adiós</h3>
      <p>Aunque las cuides con esmero, las zapatillas tienen una vida útil limitada, generalmente entre <strong>600 y 800 kilómetros</strong>. Presta atención a las señales: si sientes menos amortiguación, la suela está visiblemente desgastada o empiezas a tener dolores inusuales, es hora de jubilarlas. ¡Tu cuerpo te lo agradecerá!</p>
    `
  },
  {
    id: 'elegir-zapatilla-perfecta',
    title: '¿No sabes qué zapatilla elegir? Te ayudamos',
    imageUrl: '/blog2.jpg',
    author: "Asesoría D'JAVI",
    date: '02 de Diciembre, 2023',
    content: `
      <p>Entrar a una tienda de zapatillas puede ser abrumador: decenas de marcas, colores llamativos y tecnologías con nombres extraños. Elegir la zapatilla incorrecta es el primer paso hacia una lesión. No te dejes guiar solo por la estética. Considera estos factores clave para hacer una compra inteligente.</p>

      <h3>1. Tipo de Pisada: ¿Pronador, Supinador o Neutro?</h3>
      <p>Es el factor más importante. La <strong>pronación</strong> es el movimiento natural del tobillo hacia adentro al correr. Una pronación excesiva (sobrepronación) requiere zapatillas con soporte o estabilidad. Una pronación insuficiente (supinación) necesita mucha amortiguación. La pisada <strong>neutra</strong> es la más eficiente. Un análisis de pisada es fundamental. En nuestra tienda te ofrecemos uno gratuito para que sepas exactamente qué necesitas.</p>
      
      <h3>2. Terreno Habitual: Asfalto vs. Montaña</h3>
      <p>No es lo mismo correr en la ciudad que en el cerro. Las <strong>zapatillas de asfalto</strong> son ligeras, flexibles y con amortiguación para superficies duras. Las <strong>zapatillas de trail running</strong> son más robustas, tienen una suela con tacos prominentes para mejor agarre y placas protectoras contra rocas.</p>

      <h3>3. Amortiguación: ¿Nubes o Contacto con el Suelo?</h3>
      <p>La cantidad de espuma en la mediasuela determina la sensación al correr. Las zapatillas de <strong>máxima amortiguación</strong> ofrecen una gran comodidad y protección contra impactos, ideales para largas distancias. Las zapatillas <strong>minimalistas</strong> o de baja amortiguación ofrecen una mayor sensación del terreno y promueven una técnica de carrera más natural.</p>

      <h3>4. El "Drop": El Gran Desconocido</h3>
      <p>El drop es la diferencia de altura en milímetros entre el talón y la punta de la zapatilla. Un drop alto (8-12mm) favorece el aterrizaje con el talón. Un drop bajo (0-6mm) promueve un aterrizaje con la parte media o delantera del pie. Un cambio brusco de drop puede causar lesiones, por lo que la transición debe ser gradual.</p>

      <h3>Conclusión: La Zapatilla Perfecta es Personal</h3>
      <p>No existe "la mejor zapatilla del mundo", sino la mejor zapatilla <strong>para ti</strong>. En <strong>D'JAVI ESPORT</strong>, no solo vendemos calzado, ofrecemos asesoría. Ven, conversemos sobre tus objetivos, analicemos tu pisada y encontremos juntos el par que te llevará a cumplir tus metas sin lesiones.</p>
    `
  }
];

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPostsData.find(p => p.id === id);

  if (!post) {
    return (
      <div className="blog-post-container" style={{ textAlign: 'center' }}>
        <h1>Oops! Artículo no encontrado</h1>
        <p>El artículo que buscas no existe o fue movido.</p>
        <Link to="/blog" className="btn-back">← Volver al Blog</Link>
      </div>
    );
  }

  return (
    <>
      <div className="blog-post-container">
        <img src={post.imageUrl} alt={post.title} className="blog-post-hero" />
        <div className="blog-post-content">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span>Por {post.author}</span> | <span>{post.date}</span>
          </div>
          <div className="post-article-content" dangerouslySetInnerHTML={{ __html: post.content }} />
          <Link to="/blog" className="btn-back">← Volver al Blog</Link>
        </div>
      </div>

      <section className="cta-container">
          <h2>Cuida tu Inversión, Maximiza tu Rendimiento</h2>
          <p>Descarga nuestra guía gratuita y aprende a mantener tus zapatillas en perfecto estado.</p>
          <Link to="/guia-cuidado-zapatillas" className="btn-submit">Descargar Guía Gratis</Link>
      </section>
    </>
  );
};

export default BlogPostPage;