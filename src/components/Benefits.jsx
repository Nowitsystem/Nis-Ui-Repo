import { motion } from "framer-motion";
import { Clock, Target, Rocket, Users, CheckCircle2 } from "lucide-react";

const benefits = [
  {
    title: "Save Time on Note-Taking",
    description:
      "Reduce manual transcription and summarization by up to 90%, allowing you to focus on the conversation.",
    icon: Clock,
    features: ["Automated drafts", "One-click export", "Smart timestamping"],
  },
  {
    title: "Never Miss Critical Details",
    description:
      "Our AI captures every nuance, including speaker intent and emotional context, for complete accuracy.",
    icon: Target,
    features: [
      "Action item identification",
      "Keyword highlighting",
      "Sentiment analysis",
    ],
  },
  {
    title: "Skyrocket Productivity",
    description:
      "Convert hour-long meetings into 5-minute actionable summaries for rapid dissemination.",
    icon: Rocket,
    features: ["Team synchronization", "Priority tagging", "Deadline tracking"],
  },
  {
    title: "Seamless Collaboration",
    description:
      "Share transcripts and insights across Slack, Teams, and shared drives instantly.",
    icon: Users,
    features: ["Role-based access", "Interactive comments", "Version history"],
  },
];

const Benefits = () => {
  return (
    <section
      id="benefits"
      className="py-24 bg-[#050510] relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Built for Modern Teams
          </h2>
          <p className="text-gray-400 text-lg">
            Focus on the people and the ideas, not the typing. NIS AI handles
            the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl glass-dark border border-white/5 hover:border-primary-500/10 transition-all group"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600/20 group-hover:border-primary-600/30 transition-all">
                  <benefit.icon className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-primary-400 transition-all">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6 italic opacity-80">
                    {benefit.description}
                  </p>
                  <ul className="space-y-3">
                    {benefit.features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm text-gray-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500/70" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
