import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager @ Meta",
    content:
      "NIS AI has completely transformed our sprint planning. I can finally focus on the discussion instead of frantically typing notes. The summaries are frighteningly accurate.",
    image: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "Marcus Thorne",
    role: "Student @ Stanford",
    content:
      "As a student with a heavy course load, having instant transcripts of my lectures is a lifesaver. The translation feature also helps me with international research papers.",
    image: "https://i.pravatar.cc/150?u=marcus",
  },
  {
    name: "Elena Rodriguez",
    role: "Remote Team Leader",
    content:
      "Managing a global team across 4 time zones is hard. NIS AI ensures everyone stays in the loop, even if they miss a meeting. It is our central source of truth.",
    image: "https://i.pravatar.cc/150?u=elena",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="py-24 bg-gradient-mesh relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#050510]/90 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Loved by Teams Worldwide
          </h2>
          <p className="text-gray-400 text-lg">
            Join 10,000+ professionals who trust NIS AI for smarter meetings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl glass border border-white/10 flex flex-col items-center text-center relative group overflow-hidden"
            >
              <div className="absolute top-4 right-8 opacity-20 group-hover:opacity-40 transition-all">
                <Quote className="w-12 h-12 text-primary-400 rotate-180" />
              </div>

              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full border-2 border-primary-600/30 mb-6 object-cover shadow-xl shadow-primary-600/10"
              />

              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary-400 text-primary-400"
                  />
                ))}
              </div>

              <p className="text-gray-300 italic mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="mt-auto">
                <h4 className="text-white font-bold text-lg">
                  {testimonial.name}
                </h4>
                <p className="text-primary-400 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
