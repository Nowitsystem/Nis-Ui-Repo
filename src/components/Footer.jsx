import { Cpu, Twitter, Linkedin, Github, Youtube, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = [
    {
      title: "Product",
      links: ["Home", "Features", "Pricing", "Integrations"],
    },
    {
      title: "Resources",
      links: ["Blog", "Hiring", "Help Center", "API Docs"],
    },
    {
      title: "Company",
      links: ["About Us", "Contact", "Privacy Policy", "Terms of Service"],
    },
  ];

  return (
    <footer className="bg-[#050510] pt-24 pb-12 relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <Cpu className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                NIS AI
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-8 italic italic opacity-80">
              Empowering teams to have better meetings through the power of
              advanced AI transcription and analysis.
            </p>
            <div className="flex gap-4">
              <Twitter className="w-5 h-5 text-gray-400 hover:text-primary-400 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-primary-400 cursor-pointer transition-colors" />
              <Github className="w-5 h-5 text-gray-400 hover:text-primary-400 cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-primary-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-xs">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary-400 text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
          <p className="text-gray-500 text-xs text-center md:text-left">
            © 2026 NIS AI. All rights reserved. Built with ❤️ for smarter teams.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all ring-1 ring-white/10"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
