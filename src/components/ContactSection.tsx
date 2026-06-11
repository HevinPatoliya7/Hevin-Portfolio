import { Linkedin, Github, Twitter, Instagram, ArrowUpRight } from 'lucide-react';
import React, { useRef, useState } from 'react';
import FadeIn from './FadeIn';

const WhatsAppIcon = ({ className, size }: { className?: string; size?: number; strokeWidth?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ width: size, height: size }}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M16 14.5c-.3.7-1.4 1.4-2 1.5-.5.1-1 .3-3.3-.6-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.2-1.6-1.2-3 0-1.4.7-2.1 1-2.4.3-.3.6-.4.8-.4.2 0 .4 0 .6.0.2.0.4-.1.6.5.2.6.8 2 .9 2.1.1.1.1.3 0 .5-.1.2-.1.3-.3.5-.1.2-.3.4-.4.5-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 .8.8 1.6 1 1.8 1.1.2.1.4.1.5-.1.1-.2.6-.7.7-.9.1-.2.3-.2.5-.1.2.1 1.3.6 1.5.7.2.1.4.2.5.3.1.1.1.6-.2 1.3z" />
  </svg>
);

interface ContactMethod {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
  href: string;
  glowColor: string;
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: WhatsAppIcon,
    label: 'WhatsApp',
    value: '+91 9106011772',
    href: 'https://wa.me/919106011772',
    glowColor: 'rgba(37, 211, 102, 0.25)',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Hevin Patoliya',
    href: 'https://www.linkedin.com/in/hevinpatoliya9106011772/',
    glowColor: 'rgba(10, 102, 194, 0.3)',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'HevinPatoliya7',
    href: 'https://github.com/HevinPatoliya7',
    glowColor: 'rgba(255, 255, 255, 0.15)',
  },
  {
    icon: Twitter,
    label: 'Twitter',
    value: 'HevinPatoliya',
    href: 'https://x.com/HevinPatoliya?lang=en',
    glowColor: 'rgba(29, 155, 240, 0.25)',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: 'hevinpatoliya_official',
    href: 'https://www.instagram.com/hevinpatoliya_official/?hl=en',
    glowColor: 'rgba(225, 48, 108, 0.25)',
  },
];

const ContactCard = ({ method }: { method: ContactMethod }) => {
  const boundingRef = useRef<HTMLAnchorElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!boundingRef.current) return;
    const rect = boundingRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Icon = method.icon;
  const isExternal = method.href.startsWith('http');

  return (
    <a
      ref={boundingRef}
      href={method.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onMouseMove={handleMouseMove}
      className="w-full group relative overflow-hidden flex flex-col justify-between gap-8 sm:gap-10 rounded-[28px] sm:rounded-[32px] border-2 border-[#D7E2EA]/20 bg-[#141418] p-6 sm:p-7 md:p-8 transition-all duration-300 hover:border-[#D7E2EA]/60 hover:-translate-y-1"
    >
      {/* Dynamic Glow Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, ${method.glowColor}, transparent 100%)`,
        }}
      />
      
      {/* Content wrapper to ensure it stays above the spotlight */}
      <div className="relative z-10 flex flex-col h-full justify-between gap-8 sm:gap-10">
        <div className="flex items-start justify-between">
          <div className="rounded-full border border-[#D7E2EA]/20 p-3 sm:p-3.5 transition-colors duration-300 group-hover:border-[#D7E2EA]/50 bg-[#141418]/80 backdrop-blur-sm">
            <Icon
              className="text-[#D7E2EA]"
              size={22}
              strokeWidth={1.5}
            />
          </div>
          <ArrowUpRight
            className="text-[#D7E2EA]/40 transition-all duration-300 group-hover:text-[#D7E2EA] group-hover:rotate-12"
            size={22}
            strokeWidth={1.5}
          />
        </div>

        <div className="flex flex-col gap-2 sm:gap-3">
          <span
            className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
            style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
          >
            {method.label}
          </span>
          <span
            className="font-medium text-[#D7E2EA] break-words"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)' }}
          >
            {method.value}
          </span>
        </div>
      </div>
    </a>
  );
};

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20"
    >
      {/* Heading */}
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Get in touch
        </h2>
      </FadeIn>

      <FadeIn delay={0.15} y={20}>
        <p
          className="text-center font-light uppercase tracking-widest text-[#D7E2EA]/60 mb-12 sm:mb-16 md:mb-20"
          style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
        >
          Pick whichever channel suits you
        </p>
      </FadeIn>

      {/* Contact cards */}
      <div className="mx-auto flex flex-wrap justify-center max-w-6xl gap-4 sm:gap-5 md:gap-6">
        {CONTACT_METHODS.map((method, i) => (
          <FadeIn key={method.label} delay={i * 0.1} y={30} className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(20%-1.25rem)] flex">
            <ContactCard method={method} />
          </FadeIn>
        ))}
      </div>

      {/* Glassy Footer */}
      <FadeIn delay={0.4} y={20}>
        <div className="mx-auto mt-20 sm:mt-24 md:mt-28 flex max-w-5xl flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-6 py-5 text-center sm:flex-row sm:justify-between shadow-lg shadow-black/20">
          <span
            className="font-light uppercase tracking-widest text-[#D7E2EA]/60"
            style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)' }}
          >
            © 2026 Hevin Patoliya
          </span>
          <span
            className="font-light uppercase tracking-widest text-[#D7E2EA]/60"
            style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)' }}
          >
            Designed & built in Ahmedabad
          </span>
        </div>
      </FadeIn>
    </section>
  );
};

export default ContactSection;
