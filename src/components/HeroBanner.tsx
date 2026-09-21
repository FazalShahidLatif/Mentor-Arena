import React from 'react';
import { ChevronRight, MessageCircle, ArrowRight, Download, Sparkles } from 'lucide-react';

export interface HeroBannerProps {
  id?: string;
  theme?: string;
  badge?: {
    text: string;
    icon?: React.ElementType;
  };
  breadcrumbs?: Array<{
    label: string;
    onClick?: () => void;
  }>;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  stats?: Array<{
    label: string;
    value: string;
    subtext?: string;
  }>;
  primaryCta?: {
    text?: string;
    label?: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryCta?: {
    text?: string;
    label?: string;
    onClick?: () => void;
    href?: string;
    whatsappMessage?: string;
  };
  syllabusCta?: {
    text?: string;
    label?: string;
    onClick?: () => void;
    href?: string;
    badge?: string;
  };
  cta?: Array<{
    label?: string;
    text?: string;
    href?: string;
    variant?: string;
    onClick?: () => void;
  }>;
  image?: {
    src?: string;
    alt?: string;
    badgeText?: string;
    badgeSubtext?: string;
  };
  children?: React.ReactNode;
}

const getThemeAccents = (theme?: string) => {
  switch (theme) {
    case 'amber':
    case 'yellow':
      return {
        badgeBorder: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
        primaryBtn: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20',
        glow: 'from-amber-500/15 via-amber-600/5 to-transparent',
        statBorder: 'border-amber-500/20',
        accentText: 'text-amber-400',
      };
    case 'emerald':
    case 'green':
      return {
        badgeBorder: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
        primaryBtn: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 shadow-emerald-500/20',
        glow: 'from-emerald-500/15 via-emerald-600/5 to-transparent',
        statBorder: 'border-emerald-500/20',
        accentText: 'text-emerald-400',
      };
    case 'purple':
      return {
        badgeBorder: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
        primaryBtn: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-500/20',
        glow: 'from-purple-500/15 via-indigo-600/5 to-transparent',
        statBorder: 'border-purple-500/20',
        accentText: 'text-purple-400',
      };
    case 'indigo':
      return {
        badgeBorder: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300',
        primaryBtn: 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-indigo-500/20',
        glow: 'from-indigo-500/15 via-blue-600/5 to-transparent',
        statBorder: 'border-indigo-500/20',
        accentText: 'text-indigo-400',
      };
    case 'cyan':
      return {
        badgeBorder: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300',
        primaryBtn: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/20',
        glow: 'from-cyan-500/15 via-blue-600/5 to-transparent',
        statBorder: 'border-cyan-500/20',
        accentText: 'text-cyan-400',
      };
    case 'blue':
    default:
      return {
        badgeBorder: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
        primaryBtn: 'bg-gradient-to-r from-blue-600 to-brand-blue hover:from-blue-500 hover:to-blue-600 text-white shadow-blue-500/20',
        glow: 'from-blue-500/15 via-blue-600/5 to-transparent',
        statBorder: 'border-blue-500/20',
        accentText: 'text-blue-400',
      };
  }
};

export const HeroBanner: React.FC<HeroBannerProps> = ({
  id = 'hero-banner',
  theme = 'blue',
  badge,
  breadcrumbs,
  title,
  subtitle,
  description,
  stats,
  primaryCta,
  secondaryCta,
  syllabusCta,
  cta,
  image,
  children,
}) => {
  const styles = getThemeAccents(theme);
  const BadgeIcon = badge?.icon;
  const mainDescription = description || subtitle;

  const getWhatsAppLink = (message?: string) => {
    const text = message || "Hi Mentor Arena, I would like to learn more about the 1-to-1 mentorship tracks.";
    return `https://wa.me/923322137898?text=${encodeURIComponent(text)}`;
  };

  return (
    <header className="relative w-full overflow-hidden bg-slate-950 text-white border-b border-slate-800/80" id={id}>
      {/* Background Image & Atmospheric Lighting */}
      {image?.src && (
        <div className="absolute inset-0 pointer-events-none -z-0 opacity-20 mix-blend-luminosity overflow-hidden">
          <img
            src={image.src}
            alt={image.alt || 'Mentor Arena Course Hero'}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover object-center scale-105 filter blur-[1px]"
            width={1200}
            height={600}
          />
        </div>
      )}
      <div className={`absolute inset-0 bg-gradient-to-b ${styles.glow} pointer-events-none -z-0`} />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 md:pt-14 md:pb-18">
        
        {/* Breadcrumbs Navigation */}
        {breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-slate-400 font-medium">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />}
                  {crumb.onClick && !isLast ? (
                    <button
                      type="button"
                      onClick={crumb.onClick}
                      className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 py-1"
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span className={isLast ? 'text-slate-200 font-semibold truncate max-w-[240px] sm:max-w-none' : 'text-slate-400'}>
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading, Badge, Description, Stats & Actions */}
          <div className={`${image?.src ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-6`}>
            
            {/* Top Badge */}
            {badge && (
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wide uppercase shadow-sm ${styles.badgeBorder}`}>
                {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 flex-shrink-0" />}
                <span>{badge.text}</span>
              </div>
            )}

            {/* Main H1 Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              {title}
            </h1>

            {/* Description / Subtitle */}
            {mainDescription && (
              <div className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl">
                {mainDescription}
              </div>
            )}

            {/* Stats Metric Strip */}
            {stats && Array.isArray(stats) && stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 pb-2">
                {stats.map((st, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm shadow-inner"
                  >
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">
                      {st.label}
                    </span>
                    <strong className="text-sm sm:text-base font-black text-white block truncate">
                      {st.value}
                    </strong>
                    {st.subtext && (
                      <span className="text-[11px] text-slate-400 font-medium block truncate mt-0.5">
                        {st.subtext}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              
              {/* Primary CTA */}
              {primaryCta && (
                primaryCta.href ? (
                  <a
                    href={primaryCta.href}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-black shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${styles.primaryBtn}`}
                  >
                    <span>{primaryCta.text || primaryCta.label || 'Get Started'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={primaryCta.onClick}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-black shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${styles.primaryBtn}`}
                  >
                    <span>{primaryCta.text || primaryCta.label || 'Get Started'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )
              )}

              {/* Secondary CTA (WhatsApp or Action) */}
              {secondaryCta && (
                secondaryCta.whatsappMessage ? (
                  <a
                    href={getWhatsAppLink(secondaryCta.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>{secondaryCta.text || secondaryCta.label || 'WhatsApp Mentor'}</span>
                  </a>
                ) : secondaryCta.href ? (
                  <a
                    href={secondaryCta.href}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
                  >
                    <span>{secondaryCta.text || secondaryCta.label}</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={secondaryCta.onClick}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
                  >
                    <span>{secondaryCta.text || secondaryCta.label}</span>
                  </button>
                )
              )}

              {/* Generic CTA array (if passed) */}
              {cta && Array.isArray(cta) && cta.map((btn, idx) => (
                btn.href ? (
                  <a
                    key={idx}
                    href={btn.href}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                      btn.variant === 'secondary'
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        : styles.primaryBtn
                    }`}
                  >
                    {btn.label || btn.text}
                  </a>
                ) : (
                  <button
                    key={idx}
                    type="button"
                    onClick={btn.onClick}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      btn.variant === 'secondary'
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        : styles.primaryBtn
                    }`}
                  >
                    {btn.label || btn.text}
                  </button>
                )
              ))}

            </div>

            {/* Syllabus Magnet CTA (Optional) */}
            {syllabusCta && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={syllabusCta.onClick}
                  className="w-full sm:w-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors text-left cursor-pointer group"
                >
                  <Download className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="flex-1">{syllabusCta.text || syllabusCta.label}</span>
                  {syllabusCta.badge && (
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {syllabusCta.badge}
                    </span>
                  )}
                </button>
              </div>
            )}

            {/* Children Elements (e.g., Quick Answer Box for GEO) */}
            {children && (
              <div className="pt-2">
                {children}
              </div>
            )}

          </div>

          {/* Right Column: Featured Image Card with Trust Overlays */}
          {image?.src && (
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800/90 shadow-2xl bg-slate-900 group">
                <img
                  src={image.src}
                  alt={image.alt || 'Course Visual Showcase'}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-72 sm:h-80 md:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  width={600}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
                
                {/* Floating Bottom Badge */}
                {(image.badgeText || image.badgeSubtext) && (
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-slate-950/85 backdrop-blur-md rounded-xl border border-slate-800 text-white shadow-xl">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                      <strong className="text-xs font-bold text-white tracking-wide block truncate">
                        {image.badgeText}
                      </strong>
                    </div>
                    {image.badgeSubtext && (
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-tight truncate">
                        {image.badgeSubtext}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};

export default HeroBanner;
