import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import './styles.css';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    setIsLoaded(true);
    
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const products = [
    {
      title: "Dream Generator",
      demo: "https://dream-generator-nine.vercel.app",
      description:
        "A full-stack AI-powered dream generator using AWS Lambda, DynamoDB, and S3 to create, store, and edit dreams with keywords, stories, and AI-generated images.",
    }
  ];

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="section hero-section">
        <div className={`hero-content ${isLoaded ? 'loaded' : ''}`}>
          <h1 className="title">Jeff Wu</h1>
          <p className="subtitle">Developer · Dreamer · Dog Dad</p>
          <div className="social-links">
            {[
              { Icon: Github, link: "https://github.com/jeffwu0724" },
              { Icon: Linkedin, link: "https://www.linkedin.com/in/jiefeng-wu/" },
              { 
                Icon: Mail, 
                link: "mailto:jeffwu07242024@gmail.com?subject=Hello Jeff&body=Hi Jeff, I'd like to connect with you!" 
              },
            ].map(({ Icon, link }, index) => (
              <a
                key={link}
                href={link}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={Icon === Mail ? (e) => {
                  e.preventDefault();
                  window.location.href = link;
                } : undefined}
              >
                <Icon size={32} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about-section">
        <div className="about-content fade-in" ref={aboutRef}>
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
      <section className="section projects-section">
        <div className="projects-content">
          <h2 className="section-title fade-in" ref={projectsRef}>Featured Projects</h2>
          <div className="grid">
            {products.map((product, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (cardsRef.current) {
                    cardsRef.current[index] = el;
                  }
                }}
                className="card fade-in"
              >
                <h3>
                  <a
                    href={product.demo}
                    style={{ textDecoration: "underline" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {product.title}
                  </a>
                </h3>
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