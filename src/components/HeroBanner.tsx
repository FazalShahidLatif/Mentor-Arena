import React, { useState } from 'react';

interface HeroBannerProps {
  id: string;
  theme: string;
  badge: { text: string; icon: React.ElementType };
  breadcrumbs: { label: string; onClick?: () => void }[];
  title: React.ReactNode;
  subtitle: string;
  cta: { label: string; href: string; variant?: string }[];
  image: { src: string; alt: string; badgeText: string; badgeSubtext: string };
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  id,
  theme,
  badge,
  breadcrumbs,
  title,
  subtitle,
  cta,
  image,
}) => {
  return (
    <div className="relative w-full overflow-hidden" id={id}>
      {/* Hero Image — served from public/ for Vercel Image Optimization */}
      <div className="absolute inset-0 -z-10">
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          width={1200}
          height={600}
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="mx-2">/</span>}
              {idx < breadcrumbs.length - 1 ? (
                <button
                  onClick={crumb.onClick}
                  className="hover:text-brand-blue transition-colors"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-gray-900 font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
          <badge.icon size={14} className="text-brand-blue" />
          {badge.text}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 leading-tight mb-4">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mb-8 leading-relaxed">
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3">
          {cta.map((btn, idx) => (
            <a
              key={idx}
              href={btn.href}
              className={`px-6 py-3 rounded-xl font-bold text-white transition-all ${
                btn.variant === 'secondary'
                  ? 'bg-gray-800 hover:bg-gray-900 shadow-lg'
                  : 'bg-brand-blue hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/20'
              }`}
            >
              {btn.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
