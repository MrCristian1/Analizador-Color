import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, Calendar, MapPin } from 'lucide-react';

interface ContrastPreviewProps {
  backgroundColor: string;
  textColor: string;
}

export function ContrastPreview({ backgroundColor, textColor }: ContrastPreviewProps) {
  // Generate accent color based on text color with better logic
  const getAccentColor = (bgColor: string, txtColor: string) => {
    const bgRgb = hexToRgb(bgColor);
    const txtRgb = hexToRgb(txtColor);
    
    // Calculate luminance to determine if we need light or dark accent
    const bgLuminance = getRelativeLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
    const txtLuminance = getRelativeLuminance(txtRgb.r, txtRgb.g, txtRgb.b);
    
    // If background is light, use darker accent colors
    if (bgLuminance > 0.5) {
      return txtLuminance > 0.5 ? '#1e40af' : txtColor; // Use text color if it's dark enough
    } else {
      // If background is dark, use lighter accent colors
      return txtLuminance < 0.5 ? '#60a5fa' : txtColor; // Use text color if it's light enough
    }
  };

  // Helper functions (simplified versions)
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const getRelativeLuminance = (r: number, g: number, b: number) => {
    const getRsRGB = (color: number) => {
      const sRGB = color / 255;
      return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * getRsRGB(r) + 0.7152 * getRsRGB(g) + 0.0722 * getRsRGB(b);
  };

  const accentColor = getAccentColor(backgroundColor, textColor);

  return (
    <div 
      className="min-h-screen transition-all duration-300"
      style={{ backgroundColor, color: textColor }}
    >
      {/* Hero Section */}
      <div className="px-8 py-12 relative">
        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <nav className="flex justify-between items-center mb-12">
            <div className="text-2xl font-bold">Cristian Parada</div>
            <div className="hidden md:flex space-x-8 text-sm">
              <a href="#" className="hover:opacity-75 transition-opacity">Inicio</a>
              <a href="#" className="hover:opacity-75 transition-opacity">Proyectos</a>
              <a href="#" className="hover:opacity-75 transition-opacity">Sobre mí</a>
              <a href="#" className="hover:opacity-75 transition-opacity">Contacto</a>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Desarrollador Full Stack & Diseñador UI/UX
              </h1>
              <p className="text-xl mb-8 opacity-80 leading-relaxed">
                Creo experiencias digitales excepcionales que combinan diseño elegante 
                con código limpio. Especializado en React, Node.js y diseño centrado en el usuario.
              </p>
              <div className="flex gap-4">
                <button 
                  className="px-8 py-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-lg"
                  style={{ backgroundColor: accentColor, color: backgroundColor }}
                >
                  Ver Proyectos
                </button>
                <button 
                  className="px-8 py-4 rounded-lg border-2 hover:bg-current hover:bg-opacity-10 transition-all duration-200 text-lg"
                  style={{ borderColor: accentColor }}
                >
                  Descargar CV
                </button>
              </div>
            </div>
            <div className="relative">
              <div 
                className="w-80 h-80 mx-auto rounded-full border-4 flex items-center justify-center text-8xl font-bold shadow-2xl"
                style={{ borderColor: accentColor, backgroundColor: `${accentColor}10` }}
              >
                CP
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="px-8 py-16" style={{ backgroundColor: `${textColor}05` }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Proyectos Destacados</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Platform",
                description: "Plataforma completa de comercio electrónico con React y Node.js",
                tech: "React • Node.js • MongoDB",
                image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400"
              },
              {
                title: "Task Management App",
                description: "Aplicación de gestión de tareas con colaboración en tiempo real",
                tech: "Vue.js • Firebase • Tailwind",
                image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400"
              },
              {
                title: "Analytics Dashboard",
                description: "Dashboard interactivo para análisis de datos empresariales",
                tech: "React • D3.js • Python",
                image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400"
              }
            ].map((project, index) => (
              <div 
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border hover:scale-105 transition-all duration-300 shadow-lg"
                style={{ borderColor: `${accentColor}30` }}
              >
                <div className="w-full h-48 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="opacity-80 mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs opacity-60">{project.tech}</span>
                  <ExternalLink 
                    className="w-5 h-5 hover:scale-110 transition-transform cursor-pointer" 
                    style={{ color: accentColor }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Sobre Mí</h2>
              <p className="mb-6 opacity-80 leading-relaxed text-lg">
                Con más de 5 años de experiencia en desarrollo web, me especializo en crear 
                soluciones digitales que no solo funcionan perfectamente, sino que también 
                ofrecen experiencias de usuario excepcionales.
              </p>
              <p className="mb-8 opacity-80 leading-relaxed text-lg">
                Mi enfoque combina las mejores prácticas de desarrollo con principios de 
                diseño UX/UI para crear productos que realmente impactan.
              </p>
              <div className="flex gap-6">
                <Github 
                  className="w-8 h-8 hover:scale-110 transition-transform cursor-pointer" 
                  style={{ color: accentColor }}
                />
                <Linkedin 
                  className="w-8 h-8 hover:scale-110 transition-transform cursor-pointer" 
                  style={{ color: accentColor }}
                />
                <Mail 
                  className="w-8 h-8 hover:scale-110 transition-transform cursor-pointer" 
                  style={{ color: accentColor }}
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-lg">
                <Calendar className="w-6 h-6" style={{ color: accentColor }} />
                <span><strong style={{ color: accentColor }}>5+</strong> años de experiencia</span>
              </div>
              <div className="flex items-center gap-4 text-lg">
                <MapPin className="w-6 h-6" style={{ color: accentColor }} />
                <span>Madrid, España</span>
              </div>
              <div className="mt-8">
                <h4 className="font-semibold mb-4 text-xl">Tecnologías</h4>
                <div className="flex flex-wrap gap-3">
                  {['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker'].map((tech) => (
                    <span 
                      key={tech}
                      className="px-4 py-2 rounded-full text-sm border-2 hover:scale-105 transition-transform"
                      style={{ borderColor: accentColor, backgroundColor: `${accentColor}10` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="px-8 py-16" style={{ backgroundColor: `${textColor}05` }}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">¿Tienes un proyecto en mente?</h2>
          <p className="text-xl mb-12 opacity-80 max-w-2xl mx-auto">
            Estoy siempre abierto a discutir nuevas oportunidades y proyectos interesantes.
            ¡Hablemos sobre cómo puedo ayudarte!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              className="px-10 py-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-lg shadow-lg"
              style={{ backgroundColor: accentColor, color: backgroundColor }}
            >
              Enviar Mensaje
            </button>
            <button 
              className="px-10 py-4 rounded-lg border-2 hover:scale-105 hover:bg-opacity-10 transition-all duration-200 text-lg"
              style={{ borderColor: accentColor }}
            >
              Programar Llamada
            </button>
          </div>
          <div className="mt-12 pt-8 border-t opacity-60" style={{ borderColor: `${textColor}20` }}>
            <p className="text-sm">
              © 2025 Cristian Parada. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}