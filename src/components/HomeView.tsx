import React from 'react';
import {
  CalendarPlus,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Clock,
  Sparkles,
  ChevronRight,
  Wrench,
  Droplets,
  Disc,
  Zap,
  CircleDot,
  Video,
  Bike,
} from 'lucide-react';
import {
  BUSINESS_CONFIG,
  VISUAL_ASSETS,
  ServiceItem,
  ServicePackage,
  HOME_SERVICES,
} from '../config/siteConfig';
import { BrandLogo } from './BrandLogo';
import { ResilientImage } from './ResilientImage';
import { CallIcon } from './CallIcon';
import { HappyCustomerGearIcon } from './HappyCustomerGearIcon';
import { CustomerRatingThumbIcon } from './CustomerRatingThumbIcon';
import { ExperienceBadgeIcon } from './ExperienceBadgeIcon';

interface HomeViewProps {
  onNavigateTab: (tab: 'home' | 'book' | 'packages' | 'contact') => void;
  onSelectServiceForBooking: (service: ServiceItem) => void;
  onSelectPackageForBooking: (pkg: ServicePackage) => void;
  onViewPackageChecklist: (pkg: ServicePackage) => void;
  onApplySpecialOffer: () => void;
}

const renderServiceIcon = (iconName: string) => {
  const props = { className: 'w-5 h-5 text-black' };
  switch (iconName) {
    case 'Droplets':
      return <Droplets {...props} />;
    case 'Disc':
      return <Disc {...props} />;
    case 'Zap':
      return <Zap {...props} />;
    case 'CircleDot':
      return <CircleDot {...props} />;
    case 'Video':
      return <Video {...props} />;
    case 'Bike':
      return <Bike {...props} />;
    default:
      return <Wrench {...props} />;
  }
};

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigateTab,
  onSelectServiceForBooking,
  onApplySpecialOffer,
}) => {
  return (
    <div className="py-5 sm:py-8 space-y-10 pb-12 text-black">
      {/* =========================================================================
          HERO BANNER SECTION
      ========================================================================= */}
      <section
        aria-labelledby="hero-heading"
        className="relative bg-gradient-to-br from-red-50/80 via-white to-red-100/50 rounded-3xl border-2 border-[#DC2626] overflow-hidden shadow-xs"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Hero Text Content */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-[#DC2626] border border-[#DC2626] text-xs font-extrabold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>Ghaziabad &amp; Noida Trusted</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-black border border-neutral-300 text-xs font-bold">
                <Clock className="w-3 h-3 text-[#DC2626]" />
                <span>Doorstep in 60 Mins</span>
              </span>
            </div>

            <h1
              id="hero-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black leading-tight tracking-tight"
            >
              READY FOR DOORSTEP BIKE SERVICING?
            </h1>

            <p className="text-sm sm:text-base text-black font-semibold leading-relaxed">
              Book Your Doorstep Mechanic or Visit Our Workshop Hub. Get instant slot
              confirmation, 10 days service warranty, and transparent pricing across
              Ghaziabad &amp; Noida.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigateTab('book')}
                className="min-h-[48px] px-6 py-3.5 rounded-xl bg-[#DC2626] hover:bg-red-700 text-black border border-red-800 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xs whitespace-nowrap"
              >
                <CalendarPlus className="w-5 h-5" />
                <span>Book a Service</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('packages')}
                className="min-h-[48px] px-6 py-3.5 rounded-xl bg-white hover:bg-red-50 text-black border-2 border-neutral-400 hover:border-[#DC2626] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all cursor-pointer whitespace-nowrap"
              >
                <Wrench className="w-4 h-4 text-[#DC2626]" />
                <span>View Packages</span>
              </button>

              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="min-h-[48px] px-6 py-3.5 rounded-xl bg-white hover:bg-red-50 text-black border-2 border-black font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all whitespace-nowrap"
              >
                <CallIcon className="w-4 h-4" />
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[340px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-red-200">
            <ResilientImage
              src={VISUAL_ASSETS.heroBanner}
              alt="SAHAJ CAPITAL AUTOMOBILE professional mechanic servicing motorcycle"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          BUSINESS HIGHLIGHTS (3 CARDS)
      ========================================================================= */}
      <section aria-labelledby="highlights-heading">
        <div className="sr-only" id="highlights-heading">
          Why Choose {BUSINESS_CONFIG.name}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {BUSINESS_CONFIG.highlights.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-300 flex items-start gap-4"
            >
              {item.id === 'mechanics' ? (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-red-200 flex items-center justify-center shrink-0 overflow-hidden p-1 shadow-xs">
                  <img
                    src={`${import.meta.env.BASE_URL}expert-mechanic.svg`}
                    alt="Expert Mechanics - Service High Quality"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : item.id === 'parts' ? (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-red-200 flex items-center justify-center shrink-0 overflow-hidden p-1 shadow-xs">
                  <img
                    src={`${import.meta.env.BASE_URL}warranty-stamp.svg`}
                    alt="10 Days Service Warranty Stamp"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-red-200 flex items-center justify-center shrink-0 overflow-hidden p-1 shadow-xs">
                  <img
                    src={`${import.meta.env.BASE_URL}customer-support.svg`}
                    alt="Best Customer Support - 5 Star Service"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-black mb-1">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm text-black font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          CUSTOMER TRUST STATISTICS
      ========================================================================= */}
      <section
        aria-label="Customer Trust Statistics"
        className="bg-white rounded-3xl border border-neutral-300 p-6 sm:p-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-200">
          <div>
            <p className="text-xs font-extrabold text-black mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#DC2626] inline-block" />
              <span>PROVEN SERVICE RECORD</span>
            </p>
            <h2 className="text-xl sm:text-2xl font-extrabold text-black">
              Trusted by Daily Commuters &amp; Tourers Across the City
            </h2>
          </div>
          <BrandLogo variant="compact" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          {BUSINESS_CONFIG.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-red-50/60 border border-red-200"
            >
              <div className="flex flex-col justify-between">
                <span className="text-2xl sm:text-3xl font-extrabold text-black tabular-nums tracking-tight">
                  {stat.value}
                </span>
                <div className="mt-1">
                  <span className="text-sm sm:text-base font-extrabold text-black block">
                    {stat.label}
                  </span>
                  <span className="text-xs font-medium text-black mt-0.5 block">
                    {stat.context}
                  </span>
                </div>
              </div>

              {stat.label === 'Happy Customers' && (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-red-200 flex items-center justify-center shrink-0 p-1.5 shadow-xs">
                  <HappyCustomerGearIcon className="w-full h-full" />
                </div>
              )}

              {stat.label === 'Customer Rating' && (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-red-200 flex items-center justify-center shrink-0 p-1.5 shadow-xs">
                  <CustomerRatingThumbIcon className="w-full h-full" />
                </div>
              )}

              {stat.label === 'Of Experience' && (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-red-200 flex items-center justify-center shrink-0 p-1.5 shadow-xs">
                  <ExperienceBadgeIcon className="w-full h-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          2. SPECIALIZED AUTOMOBILE SERVICES
      ========================================================================= */}
      <section className="bg-white rounded-3xl border border-neutral-300 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <p className="text-xs font-extrabold text-black mb-1 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] inline-block" />
              <span>2. SPECIALIZED AUTOMOBILE SERVICES</span>
            </p>
            <h2 className="text-xl sm:text-2xl font-extrabold text-black">
              Our Core Automotive Capabilities
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-neutral-600 mt-1">
              Stand-alone inspections, breakdown rescue, electricals &amp; mechanical overhauls
            </p>
          </div>
          <span className="text-xs font-bold text-neutral-500">
            {HOME_SERVICES.length} Services Listed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOME_SERVICES.map((service, index) => (
            <div
              key={service.id}
              onClick={() => {
                if (onSelectServiceForBooking) {
                  onSelectServiceForBooking(service);
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (onSelectServiceForBooking) {
                    onSelectServiceForBooking(service);
                  }
                }
              }}
              className="group bg-neutral-50/70 hover:bg-red-50/50 rounded-2xl p-4 sm:p-5 border border-neutral-300 hover:border-[#DC2626] transition-all flex flex-col justify-between cursor-pointer text-left h-full"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#DC2626] border border-red-700 flex items-center justify-center shrink-0 shadow-xs">
                    {renderServiceIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono font-extrabold text-black/60 tabular-nums">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-extrabold text-black leading-snug">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-black font-medium mt-1.5 leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200/80 flex items-center justify-between text-xs font-extrabold text-black">
                <span>{service.duration}</span>
                <span className="inline-flex items-center gap-0.5 text-[#DC2626] group-hover:translate-x-0.5 transition-transform">
                  <span>Book Service</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SPECIAL OFFER PROMOTIONAL BANNER
      ========================================================================= */}
      <section
        aria-label="Limited Time Special Offer"
        className="bg-white rounded-3xl border-2 border-[#DC2626] overflow-hidden p-6 sm:p-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#DC2626]" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#DC2626]">
                {BUSINESS_CONFIG.specialOffer.headline}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-black">
              {BUSINESS_CONFIG.specialOffer.title}
            </h2>
            <p className="text-xs sm:text-sm text-black font-medium leading-relaxed">
              {BUSINESS_CONFIG.specialOffer.subtitle}
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3">
            <div className="p-3 rounded-2xl bg-red-50 border border-red-300 text-left lg:text-right w-full sm:w-auto">
              <span className="text-[10px] font-bold text-black uppercase tracking-wider block">
                Promo Code
              </span>
              <span className="text-lg font-extrabold font-mono text-black">
                {BUSINESS_CONFIG.specialOffer.code}
              </span>
            </div>
            <button
              type="button"
              onClick={onApplySpecialOffer}
              className="min-h-[46px] w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#DC2626] hover:bg-red-700 text-black font-extrabold text-xs sm:text-sm transition-colors cursor-pointer border border-red-800 shadow-xs whitespace-nowrap"
            >
              {BUSINESS_CONFIG.specialOffer.ctaText}
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DOORSTEP SERVICE PROCESS (4 STEPS)
      ========================================================================= */}
      <section
        aria-labelledby="process-heading"
        className="bg-white rounded-3xl border border-neutral-300 p-6 sm:p-8"
      >
        <div className="pb-6 border-b border-neutral-200 mb-6">
          <p className="text-xs font-extrabold text-black mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#DC2626] inline-block" />
            <span>HOW IT WORKS</span>
          </p>
          <h2
            id="process-heading"
            className="text-xl sm:text-2xl font-extrabold text-black"
          >
            How Doorstep Bike Service Works
          </h2>
          <p className="text-xs sm:text-sm font-medium text-black mt-1">
            Easy 4-step process designed for maximum convenience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-300 text-black font-extrabold text-sm flex items-center justify-center">
              01
            </div>
            <h3 className="text-base font-extrabold text-black">Book Online</h3>
            <p className="text-xs sm:text-sm text-black font-medium leading-relaxed">
              Choose your two-wheeler model, select service date &amp; time slot,
              and enter your address.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-300 text-black font-extrabold text-sm flex items-center justify-center">
              02
            </div>
            <h3 className="text-base font-extrabold text-black">Mechanic Arrives</h3>
            <p className="text-xs sm:text-sm text-black font-medium leading-relaxed">
              Our verified doorstep technician reaches your location with
              genuine parts and service toolkits.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-300 text-black font-extrabold text-sm flex items-center justify-center">
              03
            </div>
            <h3 className="text-base font-extrabold text-black">
              Service In Front of You
            </h3>
            <p className="text-xs sm:text-sm text-black font-medium leading-relaxed">
              Periodic service is executed right in front of your eyes with video
              proof recorded for peace of mind.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-300 text-black font-extrabold text-sm flex items-center justify-center">
              04
            </div>
            <h3 className="text-base font-extrabold text-black">
              Test Ride &amp; Warranty
            </h3>
            <p className="text-xs sm:text-sm text-black font-medium leading-relaxed">
              Take a smooth test ride, receive transparent invoice, and enjoy our
              assured 10 days service warranty.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CALL TO ACTION BANNER
      ========================================================================= */}
      <section className="bg-white rounded-3xl border-2 border-[#DC2626] p-6 sm:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="px-3 py-1 rounded-full bg-red-100 text-[#DC2626] border border-[#DC2626] text-[11px] font-black uppercase tracking-wider inline-block">
            FAST DOORSTEP DISPATCH
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-black leading-tight">
            Need Instant Bike Service at Your Home or Office?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-700 font-medium">
            Book now in 60 seconds or speak directly with our service desk. No advance payment required!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigateTab('book')}
            className="min-h-[48px] px-6 py-3 rounded-xl bg-[#DC2626] hover:bg-red-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm whitespace-nowrap"
          >
            <CalendarPlus className="w-4 h-4 text-white" />
            <span>Book Doorstep Slot</span>
          </button>

          <a
            href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
            className="min-h-[48px] px-5 py-3 rounded-xl bg-black hover:bg-neutral-800 text-white border border-neutral-800 font-extrabold text-sm flex items-center justify-center gap-2 transition-all whitespace-nowrap"
          >
            <CallIcon className="w-4 h-4" />
            <span>Call Now</span>
          </a>
        </div>
      </section>
    </div>
  );
};
