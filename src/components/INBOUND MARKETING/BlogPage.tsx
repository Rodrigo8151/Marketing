import { Link } from 'react-router-dom';
// 1. La ruta al CSS cambia porque ahora está en la misma carpeta
import './Blog.css'; // -> CAMBIO AQUÍ

const mockBlogPosts = [
  { id: 'cuidado-zapatillas-running', title: 'Guía Definitiva: Cómo Cuidar tus Zapatillas de Running', excerpt: 'Aprende los secretos para que tu calzado de alto rendimiento dure mucho más tiempo y se mantenga como nuevo.', imageUrl: '/blog3.jpg' },
  { id: 'elegir-zapatilla-perfecta', title: '¿No sabes qué zapatilla elegir? Te ayudamos', excerpt: 'Analizamos los tipos de pisada, terrenos y necesidades para que hagas la compra perfecta.', imageUrl: '/blog2.jpg' }
];

const BlogPage = () => {
  return (
    <div className="blog-page-container">
      <div className="blog-header">
        <h2>Nuestro <span>Blog</span></h2>
        <p>Consejos, guías y las últimas novedades del mundo del calzado deportivo. Contenido de valor para nuestra comunidad.</p>
      </div>
      <div className="blog-grid">
        {mockBlogPosts.map(post => (
          <Link to={`/blog/${post.id}`} className="blog-card" key={post.id}>
            <img src={post.imageUrl} alt={post.title} />
            <div className="blog-card-content">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span>Leer más →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;