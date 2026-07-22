"use client";
import React, { useState } from "react";
import { personalInfo } from "@/lib/data/personal";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { SpiderButton } from "../ui/SpiderButton";
import { Mail, Phone, MapPin, Send, CheckCircle2, Terminal } from "lucide-react";

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    // Hand the message off to the visitor's email client with everything prefilled
    const subject = encodeURIComponent(`Portfolio contact from ${formState.name}`);
    const body = encodeURIComponent(
      `${formState.message}\n\n— ${formState.name} (${formState.email})`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;

    setStatus("sent");
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" aria-label="Contact information" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="SEC_07"
          title="CONTACT // SEND MESSAGE"
          subtitle="Open a channel for communication, collaboration, or project inquiries."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mt-10 sm:mt-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
              <Terminal className="w-5 h-5 text-holo-cyan animate-pulse shrink-0" />
              CONNECTION_PARAMETERS
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Available for research initiatives, agentic frameworks, robotics, full-stack platforms, or collaboration opportunities. Let&apos;s connect.
            </p>

            <GlassCard glowColor="cyan" hoverEffect={false} className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-holo-cyan/10 border border-holo-cyan/20 text-holo-cyan rounded-md shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-gray-500 font-mono">EMAIL</div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-white hover:text-holo-cyan transition-colors text-xs sm:text-sm font-mono break-all"
                >
                  {personalInfo.email}
                </a>
              </div>
            </GlassCard>

            <GlassCard glowColor="red" hoverEffect={false} className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-spidey-red/10 border border-spidey-red/20 text-spidey-red rounded-md shrink-0">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-gray-500 font-mono">PHONE</div>
                <a
                  href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
                  className="text-white hover:text-spidey-red transition-colors text-xs sm:text-sm font-mono"
                >
                  {personalInfo.phone}
                </a>
              </div>
            </GlassCard>

            <GlassCard glowColor="gold" hoverEffect={false} className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-stark-gold/10 border border-stark-gold/20 text-stark-gold rounded-md shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-gray-500 font-mono">LOCATION</div>
                <span className="text-white text-xs sm:text-sm font-mono">{personalInfo.location}</span>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <GlassCard glowColor="red" hoverEffect={false} className="p-4 sm:p-6">
              {status === "sent" ? (
                <div className="py-6 sm:py-8 flex flex-col items-center justify-center text-center space-y-4 font-mono">
                  <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-500 animate-bounce" />
                  <h4 className="text-white font-bold text-base sm:text-lg">MESSAGE_STAGED</h4>
                  <p className="text-xs text-gray-400 max-w-xs">
                    Your email client has been opened with the message prefilled — hit send there to complete. Expected response: &lt; 24h.
                  </p>
                  <SpiderButton variant="secondary" onClick={() => setStatus("idle")}>
                    SEND_ANOTHER
                  </SpiderButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div>
                    <label htmlFor="contact-name" className="block text-gray-500 mb-1.5 uppercase text-[10px] sm:text-xs">NAME</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white text-sm focus:outline-none focus:border-holo-cyan transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-gray-500 mb-1.5 uppercase text-[10px] sm:text-xs">EMAIL</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white text-sm focus:outline-none focus:border-holo-cyan transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-gray-500 mb-1.5 uppercase text-[10px] sm:text-xs">MESSAGE</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Your message here..."
                      className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white text-sm focus:outline-none focus:border-holo-cyan transition-colors resize-none"
                    />
                  </div>

                  <SpiderButton
                    type="submit"
                    variant="primary"
                    disabled={status === "sending"}
                    className="w-full mt-4"
                  >
                    {status === "sending" ? (
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        SENDING...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        SEND_MESSAGE
                      </span>
                    )}
                  </SpiderButton>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};
