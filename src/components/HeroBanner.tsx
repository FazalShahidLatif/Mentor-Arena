import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, ArrowRight, Sparkles, CheckCircle2, Shield, Download } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface StatItem {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string; size?: number }>;
  subtext?: string;
}

export interface HeroBannerProps {
  badge?: {
    text: string;
    icon?: React.ComponentType<{ className?: string; size?: number }>;
    color?: string;
  };
  title: React.ReactNode;
  description: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  primaryCta?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryCta?: {
    text?: string;
    whatsappMessage?: string;
    href?: string;
    onClick?: () => void;
  };
  syllabusCta?: {
    text?: string;
    onClick?: () => void;
    badge?: string;
  };
  image: {
    src: string;
    alt: string;
    badgeText?: string;
    badgeSubtext?: string;
    aspectRatio?: string;
  };
  stats?: StatItem[];
  theme?: 'blue' | 'emerald' | 'purple' | 'amber' | 'slate' | 'indigo';
  children?: React.ReactNode;
  id?: string;
}

const themeStyles = {
  blue: {
    bgGradient: 'from-slate-950 via-blue-950 to-indigo-950',
    badgeBg: 'bg-brand-blue/20 text-blue-300 border-brand-blue/30',
    primaryBtn: 'bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-brand-blue/20',
    glowColor: 'bg-brand-blue/15',
    accentText: 'text-blue-400',
    borderGlow: 'border-blue-500/20'
  },
  emerald: {
    bgGradient: 'from-slate-950 via-emerald-950 to-slate-950',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    primaryBtn: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/20',
    glowColor: 'bg-emerald-500/15',
    accentText: 'text-emerald-400',
    borderGlow: 'border-emerald-500/20'
  },
  purple: {
    bgGradient: 'from-slate-950 via-purple-950 to-indigo-950',
    badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    primaryBtn: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/20',
    glowColor: 'bg-purple-500/15',
    accentText: 'text-purple-400',
    borderGlow: 'border-purple-500/20'
  },
  amber: {
    bgGradient: 'from-slate-950 via-amber-950/70 to-slate-950',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    primaryBtn: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-amber-600/20',
    glowColor: 'bg-amber-500/15',
    accentText: 'text-amber-400',
    borderGlow: 'border-amber-500/20'
  },
  slate: {
    bgGradient: 'from-neutral-950 via-slate-900 to-neutral-950',
    badgeBg: 'bg-slate-700/40 text-slate-300 border-slate-600/40',
    primaryBtn: 'bg-gradient-to-r from-brand-blue to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-blue-900/20',
    glowColor: 'bg-blue-500/10',
    accentText: 'text-blue-300',
    borderGlow: 'border-slate-700/50'
  },
  indigo: {
    bgGradient: 'from-slate-950 via-indigo-950 to-slate-900',
    badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    primaryBtn: 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-indigo-600/20',
    glowColor: 'bg-indigo-500/15',
    accentText: 'text-indigo-400',
    borderGlow: 'border-indigo-500/20'
  }
};

export const HeroBanner: React.FC<HeroBannerProps> = ({
  badge,
  title,
  description,
  breadcrumbs,
  primaryCta,
  secondaryCta,
  syllabusCta,
  image,
  stats,
  theme = 'blue',
  children,
  id
}) => {
  const styles = themeStyles[theme] || themeStyles.blue;
  const BadgeIcon = badge?.icon || Sparkles;

  const whatsappUrl = secondaryCta?.whatsappMessage
    ? `https://wa.me/${BUSINESS_INFO.phone}?text=${encodeURIComponent(secondaryCta.whatsappMessage)}`
    : `https://wa.me/${BUSINESS_INFO.phone}?text=Hi%2C%20I'm%20interested%20in%20learning%20more%20about%20Mentor%20Arena`;

  return (
    <section 
      id={id}
      className={`w-full bg-gradient-to-b ${styles.bgGradient} text-white relative overflow-hidden border-b border-white/10 pt-28 pb-16 md:pt-36 md:pb-20`}
    >
      {/* Background Ambient Glow & Grid Accents */}
      <div className={`absolute top-0 right-1/4 w-96 h-96 ${styles.glowColor} rounded-full blur-3xl pointer-events-none -z-0`} />
      <div className={`absolute bottom-0 left-10 w-80 h-80 ${styles.glowColor} rounded-full blur-3xl pointer-events-none -z-0`} />
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb Bar */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs font-mono font-medium text-slate-400">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-slate-600">/</span>}
                {crumb.onClick || crumb.href ? (
                  <button
                    onClick={(e) => {
                      if (crumb.onClick) {
                        e.preventDefault();
                        crumb.onClick();
                      }
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-slate-400"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className={`${idx === breadcrumbs.length - 1 ? styles.accentText + ' font-bold' : 'text-slate-300'}`}>
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Main Content & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Value Props & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Pill Badge */}
            {badge && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase border ${styles.badgeBg}`}>
                  <BadgeIcon size={14} className="shrink-0" />
                  <span>{badge.text}</span>
                </span>
              </motion.div>
            )}

            {/* H1 Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-black tracking-tight leading-[1.15] text-white"
            >
              {title}
            </motion.h1>

            {/* Description Text */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl"
            >
              {typeof description === 'string' ? <p>{description}</p> : description}
            </motion.div>

            {/* Optional Stats Grid */}
            {stats && stats.length > 0 && (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.25,
                    },
                  },
                }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2"
              >
                {stats.map((stat, sIdx) => {
                  const StatIcon = stat.icon;
                  return (
                    <motion.div 
                      key={sIdx}
                      variants={{
                        hidden: { opacity: 0, y: 12, scale: 0.94 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            type: 'spring',
                            damping: 18,
                            stiffness: 260,
                          },
                        },
                      }}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 flex flex-col justify-between hover:border-white/20 transition-colors cursor-default min-w-0 overflow-hidden"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-wider font-mono text-slate-400 truncate">
                          {stat.label}
                        </span>
                        {StatIcon && <StatIcon size={14} className={`${styles.accentText} shrink-0`} />}
                      </div>
                      <div className={`font-black text-white tracking-tight leading-snug break-words [overflow-wrap:anywhere] min-w-0 ${
                        typeof stat.value === 'string' && stat.value.length > 20
                          ? 'text-xs sm:text-xs md:text-sm font-bold'
                          : typeof stat.value === 'string' && stat.value.length > 11
                            ? 'text-sm sm:text-base md:text-lg font-bold'
                            : 'text-xl sm:text-2xl'
                      }`}>
                        {stat.value}
                      </div>
                      {stat.subtext && (
                        <span className="text-[10px] text-slate-400 mt-1 leading-tight truncate block min-w-0">
                          {stat.subtext}
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Action Buttons */}
            {(primaryCta || secondaryCta) && (
              <motion.div 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 pt-2 items-stretch sm:items-center"
              >
                {primaryCta && (
                  primaryCta.href ? (
                    <a
                      href={primaryCta.href}
                      className={`px-7 py-4 rounded-xl font-bold text-sm text-center shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer ${styles.primaryBtn}`}
                    >
                      <span>{primaryCta.text}</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <button
                      onClick={primaryCta.onClick}
                      className={`px-7 py-4 rounded-xl font-bold text-sm text-center shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer ${styles.primaryBtn}`}
                    >
                      <span>{primaryCta.text}</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  )
                )}

                {secondaryCta && (
                  secondaryCta.href ? (
                    <a
                      href={secondaryCta.href}
                      className="px-7 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer"
                    >
                      <MessageSquare size={16} />
                      <span>{secondaryCta.text || "WhatsApp Lead Instructor"}</span>
                    </a>
                  ) : (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-7 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer"
                    >
                      <MessageSquare size={16} />
                      <span>{secondaryCta.text || "WhatsApp Lead Instructor"}</span>
                    </a>
                  )
                )}
              </motion.div>
            )}

            {/* Syllabus Lead Magnet Instant Download CTA */}
            {syllabusCta && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="pt-1"
              >
                <button
                  type="button"
                  onClick={syllabusCta.onClick}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/15 active:bg-white/20 backdrop-blur-md border border-emerald-400/40 hover:border-emerald-300 rounded-xl text-white font-bold text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-2 transition-all shadow-md group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Download size={16} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>{syllabusCta.text || "Download 2026 Comprehensive 16-Week Roadmap & Lecture Plan (PDF)"}</span>
                  </div>
                  {syllabusCta.badge && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-semibold tracking-wide">
                      {syllabusCta.badge}
                    </span>
                  )}
                </button>
              </motion.div>
            )}

            {/* Custom Embedded Child content (e.g., Quick Answer Box, Search Filter, or Category Pills) */}
            {children && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="pt-2"
              >
                {children}
              </motion.div>
            )}
          </div>

          {/* Right Column: High-Impact Optimized Banner Image */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Outer Glowing Frame */}
              <div className={`relative rounded-3xl overflow-hidden border ${styles.borderGlow} shadow-2xl shadow-black/80 bg-slate-900/60 backdrop-blur-xl group`}>
                
                {/* Visual Image container with proper aspect ratio */}
                <div className={`w-full overflow-hidden ${image.aspectRatio || 'aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]'} relative`}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
                </div>

                {/* Bottom Floating Badge inside Image Frame */}
                {(image.badgeText || image.badgeSubtext) && (
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-slate-950/85 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-between gap-3 text-left">
                    <div className="min-w-0">
                      {image.badgeText && (
                        <div className="text-xs font-bold text-white tracking-tight truncate flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                          <span>{image.badgeText}</span>
                        </div>
                      )}
                      {image.badgeSubtext && (
                        <div className="text-[10px] text-slate-300 font-mono mt-0.5 truncate">
                          {image.badgeSubtext}
                        </div>
                      )}
                    </div>
                    <span className="shrink-0 text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">
                      1-to-1 Verified
                    </span>
                  </div>
                )}
              </div>

              {/* Decorative Corner Accents */}
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full border-2 border-emerald-500/40 bg-emerald-500/10 backdrop-blur-md flex items-center justify-center text-emerald-400">
                <Sparkles size={14} />
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
