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
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="SEC_06"
          title="ESTABLISH CONDUIT // SEND TRANSMISSION"
          subtitle="Open secure pipeline for communication, integrations, or tactical requests."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
              <Terminal className="w-5 h-5 text-holo-cyan animate-pulse" />
              // CONNECTION_PARAMETERS
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Conduit ports are actively listening. If you want to discuss research initiatives, agentic frameworks, robotics, or full-stack platforms, open a connection.
            </p>

            <GlassCard glowColor="cyan" hoverEffect={false} className="p-4 flex items-center gap-4">
              <div className="p-3 bg-holo-cyan/10 border border-holo-cyan/20 text-holo-cyan rounded-md">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 font-mono">DIRECT_EMAIL_LINK</div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-white hover:text-holo-cyan transition-colors text-sm font-mono"
                >
                  {personalInfo.email}
                </a>
              </div>
            </GlassCard>

            <GlassCard glowColor="red" hoverEffect={false} className="p-4 flex items-center gap-4">
              <div className="p-3 bg-spidey-red/10 border border-spidey-red/20 text-spidey-red rounded-md">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 font-mono">VOICE_CHANNEL</div>
                <a
                  href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
                  className="text-white hover:text-spidey-red transition-colors text-sm font-mono"
                >
                  {personalInfo.phone}
                </a>
              </div>
            </GlassCard>

            <GlassCard glowColor="gold" hoverEffect={false} className="p-4 flex items-center gap-4">
              <div className="p-3 bg-stark-gold/10 border border-stark-gold/20 text-stark-gold rounded-md">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 font-mono">GEO_COORDINATES</div>
                <span className="text-white text-sm font-mono">{personalInfo.location}</span>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Interactive Mock Form */}
          <div className="lg:col-span-7">
            <GlassCard glowColor="red" hoverEffect={false} className="p-6">
              {status === "sent" ? (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-4 font-mono">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-bounce" />
                  <h4 className="text-white font-bold text-lg">TRANSMISSION_STAGED</h4>
                  <p className="text-xs text-gray-400 max-w-xs">
                    Your email client has been opened with the packet prefilled — hit send there to complete the transmission. Expected response: &lt; 24h.
                  </p>
                  <SpiderButton variant="secondary" onClick={() => setStatus("idle")}>
                    RE_INITIALIZE_CONDUIT
                  </SpiderButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block text-gray-500 mb-1.5 uppercase">// CALLSIGN / NAME</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Tony Stark"
                      className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-holo-cyan transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 mb-1.5 uppercase">// PACKET_ORIGIN / EMAIL</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. tony@starkindustries.com"
                      className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-holo-cyan transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 mb-1.5 uppercase">// PAYLOAD_DATA / MESSAGE</label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="e.g. Initialize suit upgrade sequence..."
                      className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-holo-cyan transition-colors resize-none"
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
                        BROADCASTING_PACKET...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        EXECUTE_TRANSMISSION
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
