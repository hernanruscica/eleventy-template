const all = [
    { title: "¿Cuánto Cuesta una Página Web? Guía de Precios Argentina 2025", url: "/blog/1/", category: "Web Design", tags: ["precios", "argentina", "desarrollo web", "guia"], date: "15 Ene 2025", author: "Admin", excerpt: "Guía completa de precios para desarrollo web en Argentina 2025.", image: "/assets/images/blog-1.jpg" },
    { title: "Seguridad en WordPress: Protege tu Sitio Web", url: "/blog/2/", category: "Seguridad", tags: ["wordpress", "seguridad", "ciberseguridad", "proteccion"], date: "20 Feb 2025", author: "Admin", excerpt: "Tu sitio WordPress puede ser vulnerable si no está bien configurado.", image: "/assets/images/blog-2.jpg" }
];

function getCategories(posts) {
    const seen = new Set();
    return posts.filter(p => {
        if (seen.has(p.category)) return false;
        seen.add(p.category);
        return true;
    }).map(p => ({
        name: p.category,
        slug: p.category.toLowerCase().replace(/\s+/g, '-')
    }));
}

function getTags(posts) {
    const seen = new Set();
    return posts.flatMap(p => p.tags || [])
        .filter(t => {
            const key = t.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        })
        .map(t => ({
            name: t.charAt(0).toUpperCase() + t.slice(1)
        }));
}

export default {
    all,
    categories: getCategories(all),
    tags: getTags(all),
    sidebar: {
        image: "/assets/images/blog-1.jpg",
        plainTextTitle: "Sobre Nosotros",
        plainText: "En Impulsa Internet ayudamos a empresas a incrementar su presencia online. Creamos sitios web optimizados y adaptados a dispositivos móviles.",
        plainTextCtaUrl: "/contacto",
        plainTextCtaText: "Contáctanos"
    }
}
