import React, { useState } from 'react'; // Importar React y useState
import { useParams, Link } from 'react-router-dom';

// Se importan los dos archivos CSS que usan los componentes.
import '../Inicio/HomePage.css';
import './Blog.css';

// --- COMPONENTE 1: LandingPageGuia (CON LÓGICA DE NETLIFY + DESCARGA) ---

interface LandingPageGuiaProps {
  leadMagnetId: string;
}

export const LandingPageGuia = ({ leadMagnetId }: LandingPageGuiaProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const postData = blogPostsData.find(p => p.id === leadMagnetId);

  if (!postData || !postData.leadMagnet) {
    return <div className="landing-page"><h1>Contenido no disponible</h1></div>;
  }

  const { leadMagnet } = postData;

  const encode = (data: { [key: string]: string }) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formValues: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });

    try {
      // 1. ENVIAMOS LOS DATOS A NETLIFY EN SEGUNDO PLANO
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "lead-capture", ...formValues })
      });

      // 2. SI EL ENVÍO A NETLIFY ES EXITOSO, INICIAMOS LA DESCARGA DEL PDF
      const link = document.createElement('a');
      link.href = leadMagnet.pdfUrl;
      link.setAttribute('download', leadMagnet.pdfFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setSubmitMessage("¡Gracias! Tu descarga ha comenzado.");
      form.reset(); // Limpia el campo de email

    } catch (error) {
      console.error(error);
      setSubmitMessage("Hubo un error al enviar. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        <img src={postData.imageUrl} alt={leadMagnet.title} />
        <div>
          <h2>{leadMagnet.title}</h2>
          <p>{leadMagnet.description}</p>
          <ul>
            {leadMagnet.bulletPoints.map((point, index) => <li key={index}>{point}</li>)}
          </ul>
          
          {/* Este formulario ahora será manejado por nuestra función JS */}
          <form 
            name="lead-capture" 
            data-netlify="true" 
            data-netlify-honeypot="bot-field"
            onSubmit={handleFormSubmit}
            className="landing-form"
          >
            {/* Campo oculto que Netlify necesita para saber a qué formulario pertenece */}
            <input type="hidden" name="form-name" value="lead-capture" />
            <p hidden><label>No llenar: <input name="bot-field" /></label></p>
            
            <input 
              type="email" 
              name="email" // 'name' es crucial
              placeholder="Tu mejor correo electrónico" 
              required 
              disabled={isSubmitting}
            />
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : leadMagnet.buttonText}
            </button>
          </form>
          {/* Mostramos un mensaje de éxito o error al usuario */}
          {submitMessage && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{submitMessage}</p>}
        </div>
      </div>
    </div>
  );
};


// --- CONTENIDO DE BLOG (Sin cambios) ---
const blogPostsData = [
  // ... (todo el contenido de tus blogs se mantiene igual)
  { 
    id: 'cuidado-zapatillas-running',
    title: 'Tus Zapatillas Pueden Durar el Doble: 5 Secretos que Nadie te Cuenta',
    imageUrl: '/blog3.jpg',
    author: "D'JAVI ESPORT Team",
    date: '15 de Noviembre, 2023',
    content: `
      <p>El cuidado adecuado del calzado es un aspecto esencial para conservar su rendimiento, comodidad y apariencia a lo largo del tiempo. Mantener los zapatos en óptimas condiciones no solo refleja una imagen profesional, sino que también prolonga su vida útil y protege la inversión realizada.</p>
      <h3>1. Selección del calzado</h3>
      <p>La durabilidad de un zapato comienza en el momento de la compra. Elegir el modelo correcto según la actividad y el entorno es determinante. Un calzado que se ajusta correctamente al pie, con el tamaño y ancho adecuados, previene deformaciones prematuras y garantiza una experiencia de uso óptima. Asimismo, alternar entre diferentes pares permite que los materiales descansen y mantengan su estructura original.</p>
      <h3>2. Diseño y propósito</h3>
      <p>Cada tipo de zapato responde a un propósito funcional distinto. El calzado de uso diario prioriza la comodidad y la resistencia; el de invierno está diseñado para brindar aislamiento y tracción; el social o de vestir destaca por su elegancia y materiales delicados, mientras que el deportivo requiere una atención especial para conservar sus propiedades técnicas. Utilizar cada par conforme a su propósito es una práctica clave para evitar un desgaste innecesario.</p>
      <h3>3. Materiales y cuidado</h3>
      <p>El material define el método de mantenimiento. El cuero requiere limpieza regular con paño húmedo y la aplicación de cremas nutritivas para preservar su flexibilidad. Las superficies de gamuza o nubuck deben cepillarse con herramientas específicas que mantengan su textura natural. Los tejidos sintéticos y textiles se benefician de una limpieza manual con jabón neutro, evitando la exposición prolongada a la humedad. En todos los casos, es fundamental evitar productos abrasivos o el uso de lavadoras, ya que comprometen la integridad de los materiales.</p>
      <h3>4. Mantenimiento preventivo</h3>
      <p>La prevención es el principio básico del cuidado profesional del calzado. Antes del primer uso, se recomienda aplicar un tratamiento impermeabilizante que actúe como barrera protectora frente a la humedad y la suciedad. Tras cada jornada, los zapatos deben limpiarse suavemente y almacenarse en un lugar seco y ventilado. Secarlos con fuentes de calor directas, como radiadores o exposición al sol, deteriora los adhesivos y endurece los materiales, por lo que el secado natural es siempre la mejor opción. Además, reemplazar cordones, plantillas o suelas a tiempo prolonga la funcionalidad general del zapato.</p>
      <h3>5. Conservación y almacenamiento</h3>
      <p>Un calzado bien conservado mantiene su forma y confort. El uso de calzadores evita daños en el talón, mientras que los tensores o moldes internos ayudan a conservar la estructura del empeine. Guardar los zapatos en fundas transpirables o cajas adecuadas protege contra el polvo y la humedad. El almacenamiento correcto no solo mejora la estética, sino que previene deformaciones y la aparición de olores indeseados.</p>
      <h3>6. Conclusión</h3>
      <p>Cuidar el calzado no es un gesto superficial, sino una práctica de responsabilidad hacia uno mismo y hacia los productos que se adquieren. Una rutina de mantenimiento constante, combinada con un uso adecuado, asegura que cada par conserve su desempeño, su comodidad y su estilo con el paso del tiempo. La diferencia entre un calzado descuidado y uno bien mantenido se percibe no solo en su aspecto, sino también en la confianza y profesionalismo de quien lo lleva.</p>
    `,
    leadMagnet: {
      title: "Descarga la Guía Completa de Cuidado Profesional",
      description: "Extiende la vida útil de tu inversión con nuestra guía detallada.",
      bulletPoints: ["Métodos de limpieza por material", "Técnicas de almacenamiento profesional", "Prevención de olores"],
      buttonText: "¡DESCARGAR GUÍA AHORA!",
      linkTo: "/guia-cuidado-zapatillas",
      pdfUrl: "/pdfs/guia-cuidado-profesional.pdf",
      pdfFileName: "Guia_Cuidado_Calzado_DJAVI.pdf"
    }
  },
  {
    id: 'elegir-zapatilla-perfecta',
    title: 'Deja de Comprar a Ciegas: La Guía para Encontrar tu Zapatilla Ideal',
    imageUrl: '/blog2.jpg',
    author: "Asesoría D'JAVI",
    date: '02 de Diciembre, 2023',
    content: `
      <p>Elegir un calzado adecuado no es una cuestión de moda, sino de salud. Esta guía pretende ofrecer información clara, profesional y útil para todas aquellas personas que buscan comprender cómo un zapato bien seleccionado puede marcar la diferencia en su bienestar diario. Está dirigida a cualquier persona —sin importar edad o género— que experimente molestias, cansancio o incomodidad al caminar o estar de pie, así como a quienes deseen cuidar de su salud y prevenir lesiones mediante una elección informada del calzado.</p>
      <h3>1. Propósito de la guía</h3>
      <p>El objetivo principal de esta guía es orientar al lector en la elección del calzado más adecuado para sus necesidades personales y físicas. Existen muchos factores que intervienen en la comodidad y la seguridad del pie: desde la forma de pisar y el tipo de terreno hasta la calidad de los materiales y la estructura del zapato. Conocerlos es el primer paso para evitar molestias y problemas derivados del uso inadecuado del calzado.</p>
      <h3>2. A quién va dirigida</h3>
      <p>Está pensada para quienes padecen incomodidades menores —como cansancio, rozaduras o durezas— que, aunque no sean incapacitantes, afectan su movilidad o su disfrute de las actividades diarias. También se dirige a personas mayores, cuyo pie suele presentar piel más reseca, menor sensibilidad o ligeras deformaciones que requieren un ajuste más preciso del zapato. Además, es de especial interés para quienes padecen trastornos circulatorios o diabetes, ya que la elección inadecuada del calzado puede tener consecuencias graves por la falta de percepción de presión o fricción.</p>
      <p>Asimismo, personas con sudoración excesiva o con características físicas particulares pueden experimentar un desgaste acelerado del calzado, lo que aumenta el riesgo de caídas o lesiones. Finalmente, la guía también se dirige a quienes, sin padecer molestias específicas, valoran la comodidad, la salud y la durabilidad por encima de las tendencias estéticas.</p>
      <h3>3. Fundamento científico</h3>
      <p>Caminar es un proceso biomecánico complejo que involucra la coordinación de músculos, articulaciones y huesos. En este sistema, el calzado juega un papel fundamental: debe proteger frente a las condiciones externas, ofrecer estabilidad y confort térmico, y acompañar el movimiento natural del pie sin interferir en su función. Un zapato inadecuado puede alterar este equilibrio, generando dolor, fatiga o incluso lesiones articulares.</p>
      <p>Un calzado saludable debe adaptarse a la forma cambiante del pie durante la marcha, distribuir correctamente las presiones, ofrecer amortiguación frente a los impactos y permitir una adecuada transpiración. También debe proporcionar agarre y estabilidad para reducir el riesgo de caídas. En síntesis, debe funcionar como una extensión del pie, complementando su anatomía sin limitar su movimiento natural.</p>
      <h3>4. Elección de la talla y el ajuste</h3>
      <p>El calzado debe adaptarse al pie, no el pie al calzado. Probar ambos zapatos, con los calcetines habituales y al final del día —cuando los pies están ligeramente más dilatados— es una práctica recomendada. Un espacio aproximado de un centímetro entre el dedo más largo y la puntera garantiza comodidad y evita rozaduras. El zapato no debe presionar ni quedar suelto; el ajuste debe ser firme sin causar compresión.</p>
      <p>El ancho del calzado es tan importante como su largo. Debe permitir que los dedos se muevan libremente sin fricción lateral. En modelos con tacón, es esencial que el talón se asiente correctamente y que el pie no deslice hacia adelante. Los pliegues excesivos o las presiones localizadas son señales de un calzado mal ajustado.</p>
      <h3>5. Estructura y funcionalidad</h3>
      <p>Un buen zapato combina flexibilidad, sujeción y ligereza. Debe doblarse de forma natural por la zona donde el pie flexiona al caminar, sin ofrecer resistencia excesiva. Los modelos cerrados, acordonados o con sujeción en el empeine son los más recomendables por su capacidad de ajuste y estabilidad. La parte trasera, o contrafuerte, debe ser firme para mantener el talón en posición y evitar desplazamientos laterales.</p>
      <p>Los calzados abiertos o con tiras deben ofrecer una correcta sujeción y evitar rozaduras en el tobillo o el dorso del pie. En el caso de las personas mayores, es recomendable optar por modelos más ligeros y flexibles, ya que reducen la fatiga muscular y mejoran el equilibrio.</p>
      <h3>6. Estabilidad y amortiguación</h3>
      <p>El diseño de la trasera influye directamente en la estabilidad del paso y en la absorción de impactos. Una base de apoyo amplia y un contrafuerte firme ayudan a prevenir caídas y lesiones en el tobillo. La amortiguación, por su parte, reduce las fuerzas generadas con cada pisada, protegiendo las articulaciones y la espalda. Los materiales blandos pero resistentes en la zona del talón mejoran la comodidad y previenen sobrecargas.</p>
      <p>En personas mayores, con sobrepeso o con patologías articulares, una amortiguación adicional puede marcar una gran diferencia. Los modelos anatómicos, con plantillas moldeadas y materiales absorbentes, proporcionan un soporte más adecuado y un confort superior.</p>
      <h3>7. Conclusión</h3>
      <p>Seleccionar el calzado adecuado es una inversión en salud y bienestar. Más allá de la estética, un zapato debe adaptarse al cuerpo, respetar su movimiento natural y protegerlo frente al desgaste diario. Siguiendo los principios aquí expuestos —ajuste correcto, buena amortiguación, materiales transpirables y estructura estable—, cualquier persona puede disfrutar de una marcha más cómoda, segura y saludable.</p>
    `,
    leadMagnet: {
      title: "Obtén tu Checklist GRATIS para el Calzado Ideal",
      description: "No vuelvas a equivocarte al comprar.",
      bulletPoints: ["Análisis de tu tipo de pisada", "Claves para un ajuste y talla perfectos", "Materiales recomendados"],
      buttonText: "OBTENER CHECKLIST",
      linkTo: "/checklist-calzado-ideal",
      pdfUrl: "/pdfs/checklist-calzado-ideal.pdf",
      pdfFileName: "Checklist_Calzado_Ideal_DJAVI.pdf"
    }
  }
];

// --- COMPONENTE 2: BlogPostPage (Sin cambios) ---
export const BlogPostPage = () => {
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
          <h2>{post.leadMagnet.title}</h2>
          <p>{post.leadMagnet.description}</p>
          <Link to={post.leadMagnet.linkTo} className="btn-submit">
            {post.leadMagnet.buttonText}
          </Link>
      </section>
    </>
  );
};