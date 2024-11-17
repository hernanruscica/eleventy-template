export default {
    name: "TestSite",
    description: "This is a web site template using Eleventy",
    baseUrl: "http://localhost:8080",
    //baseUrl: "https://impulsainternet.com/test",
    sections: ["pages", "blog", "about", "contact"],
    socials: [
        {   
            name: "facebook",         
            text: "Our products page",
            url: "https://www.facebook.com/pagina",
            icon: "facebook-brands-solid"
        },
        {   
            name: "instagram",         
            text: "Follow us on instagram",
            url: "https://www.instagram.com/pagina",
            icon: "instagram-brands-solid"
        },
        {   
            name: "X",         
            text: "Follow us on X (ex Twitter)",
            url: "https://www.x.com/pagina",
            icon: "x-twitter-brands-solid"
        }    
    ],
    client: {
        name: "Client name",
        description: "Bussiness client description, products and services.",
        telephone: "+123 456 7890",
        email: "contact@clientsite.com",
        address: "fake street 1234, fake city"
    }
}