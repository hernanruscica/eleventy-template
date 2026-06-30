export default {
  title: "Nuestros precios",
  subtitle: "Paquetes armados para la mayoria de necesidades",
  plans: [
    {
      name: "Basic Plan",
      description: "For Small Size Business",
      price: "49.00",
      period: "Month",
      features: [
        { name: "HTML5 & CSS3", included: true },
        { name: "Bootstrap v5", included: true },
        { name: "Responsive Layout", included: false },
        { name: "Cross-browser Support", included: false }
      ],
      buttonText: "Order Now",
      delay: "0.6s",
      featured: false
    },
    {
      name: "Standard Plan",
      description: "For Medium Size Business",
      price: "99.00",
      period: "Month",
      features: [
        { name: "HTML5 & CSS3", included: true },
        { name: "Bootstrap v5", included: true },
        { name: "Responsive Layout", included: true },
        { name: "Cross-browser Support", included: false }
      ],
      buttonText: "Order Now",
      delay: "0.3s",
      featured: true
    },
    {
      name: "Advanced Plan",
      description: "For Large Size Business",
      price: "149.00",
      period: "Month",
      features: [
        { name: "HTML5 & CSS3", included: true },
        { name: "Bootstrap v5", included: true },
        { name: "Responsive Layout", included: true },
        { name: "Cross-browser Support", included: true }
      ],
      buttonText: "Order Now",
      delay: "0.9s",
      featured: false
    }
  ]
};
