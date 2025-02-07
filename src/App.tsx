import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import "./styles.css";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.7;

      // Check each section
      [heroRef, aboutRef, projectsRef].forEach((ref) => {
        if (!ref.current) return;

        const element = ref.current;
        const elementPosition = element.offsetTop;

        if (scrollPosition > elementPosition) {
          element
            .querySelectorAll(
              ".title, .subtitle, .section-title, .about-content"
            )
            .forEach((item) => item.classList.add("visible"));
        }
      });

      // Check cards separately
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const cardPosition = card.offsetTop;
        if (scrollPosition > cardPosition) {
          setTimeout(() => {
            card.classList.add("visible");
          }, index * 100); // Stagger the card animations
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const products = [
    {
      title: "Dream Generator",
      demo: "https://dream-generator-39akb8at7-jeffwu0724s-projects.vercel.app/",
      description:
        "A full-stack AI-powered dream generator using AWS Lambda, DynamoDB, and S3 to create, store, and edit dreams with keywords, stories, and AI-generated images.",
    },
    // {
    //   title: "Project 2",
    //   description: "Mobile-first design with seamless interactions.",
    // },
  ];

  return (
    <div className="container">
      {/* Hero Section */}
      <section ref={heroRef} className="section hero-section">
        <div className={`hero-content ${isLoaded ? "loaded" : ""}`}>
          <h1 className="title">
            Jeff Wu
            <br />
          </h1>
          <p className="subtitle">Developer · Dreamer · Dog Dad </p>
          <div className="social-links">
            {[
              { Icon: Github, link: "https://github.com/jeffwu0724" },
              {
                Icon: Linkedin,
                link: "https://www.linkedin.com/in/jiefeng-wu/",
              },
              { Icon: Mail, link: "mailto:jeffwu07242024@gmail.com" },
            ].map(({ Icon, link }, index) => (
              <a
                key={link}
                href={link}
                className={`social-link ${isLoaded ? "loaded" : ""}`}
              >
                <Icon size={28} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="section about-section">
        <div className="about-content">
          <h2 className="about-title">About Me</h2>
          <p className="about-text">
            Hi, I'm Jeff Wu, a software engineer with three years of experience
            specializing in security vulnerability fixes, JDK 8 to JDK 17
            migration, and creating hotfixes for client issues. I work at
            Liferay, focusing on patching security flaws, backporting fixes, and
            optimizing system performance. I hold a Master's in Computer Science
            from Georgia Tech and specialize in Java, Python, and AWS services.
            Outside of work, I enjoy doing diy, playing with my dogs, and eating
            good food. Let's connect!
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="section projects-section">
        <div className="projects-content">
          <h2 className="section-title">Featured Projects</h2>
          <div className="grid">
            {products.map((product, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="card"
              >
                {/* <h3>{product.title}</h3> */}
                <h3>
                  <a
                    href={product.demo}
                    style={{ textDecoration: "underline" }}
                  >
                    {product.title}
                  </a>
                </h3>
                {/* <p>{product.demo}</p> */}
                <p>{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
