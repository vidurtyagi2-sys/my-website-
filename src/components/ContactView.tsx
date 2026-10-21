import React from 'react';
import {
  PhoneCall,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Navigation,
  ShieldCheck,
  CalendarPlus,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/siteConfig';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CallIcon } from './CallIcon';

interface ContactViewProps {
  onNavigateBook: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigateBook }) => {
  const whatsappUrl = `https://wa.me/${
    BUSINESS_CONFIG.whatsappRaw
  }?text=${encodeURIComponent(BUSINESS_CONFIG.whatsappDefaultMessage)}`;

  return (
    <div className="py-5 sm:py-8 space-y-8 pb-12 text-black">
      {/* Top Brand Identity Card */}
      <div className="bg-white rounded-3xl border-2 border-[#DC2626] p-6 sm:p-10 text-center">
        <div className="flex justify-center mb-5">
          <BrandLogo variant="full" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-black">
          {BUSINESS_CONFIG.name}
        </h1>
        <p className="text-sm sm:text-base font-extrabold text-black mt-1">
          {BUSINESS_CONFIG.tagline}
        </p>
        <p className="text-xs sm:text-sm text-black font-medium max-w-xl mx-auto mt-3 leading-relaxed">
          Have a question about periodic bike servicing, doorstep breakdown
          support, or genuine spare parts? Reach out to our service desk
          directly via phone, WhatsApp, or visit our workshop hub.
        </p>

        {/* Primary Action Buttons: Call Now, WhatsApp, Get Directions */}
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-2xl mx-auto">
          <a
            href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
            className="min-h-[48px] px-5 py-3 rounded-xl bg-[#DC2626] hover:bg-red-700 border border-red-800 text-black font-extrabold text-sm flex items-center justify-center gap-2.5 transition-colors shadow-xs whitespace-nowrap"
          >
            <CallIcon className="w-4 h-4" />
            <span>Call Now</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] px-5 py-3 rounded-xl bg-red-100 hover:bg-red-200 border border-[#DC2626] text-black font-extrabold text-sm flex items-center justify-center gap-2.5 transition-colors shadow-xs whitespace-nowrap"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span>WhatsApp</span>
          </a>

          <a
            href={BUSINESS_CONFIG.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] px-5 py-3 rounded-xl border border-neutral-400 hover:border-[#DC2626] text-black bg-white hover:bg-red-50 font-extrabold text-sm flex items-center justify-center gap-2.5 transition-colors whitespace-nowrap"
          >
            <Navigation className="w-4 h-4 shrink-0 text-[#DC2626]" />
            <span>Get Directions</span>
          </a>
        </div>
      </div>

      {/* Contact Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1. Call Us */}
        <div className="bg-white rounded-2xl border border-neutral-300 p-6 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mb-4">
              <CallIcon className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-extrabold text-black flex items-center gap-2">
              <CallIcon className="w-5 h-5" />
              <span>Call Us</span>
            </h2>
            <p className="text-xs sm:text-sm text-black font-medium mt-1">
              Speak directly with our senior service advisor for instant package
              quotes and roadside assistance.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-neutral-200">
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="text-base sm:text-lg font-extrabold text-black hover:underline tabular-nums inline-flex items-center gap-2"
            >
              <CallIcon className="w-4 h-4" />
              <span>{BUSINESS_CONFIG.phoneDisplay}</span>
            </a>
            <span className="text-xs font-bold text-black block">
              Direct Service Helpline
            </span>
          </div>
        </div>

        {/* 2. WhatsApp */}
        <div className="bg-white rounded-2xl border border-neutral-300 p-6 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white border border-red-200 flex items-center justify-center mb-4 p-1.5">
              <WhatsAppIcon className="w-full h-full" />
            </div>
            <h2 className="text-lg font-extrabold text-black flex items-center gap-2">
              <WhatsAppIcon className="w-5 h-5" />
              <span>WhatsApp</span>
            </h2>
            <p className="text-xs sm:text-sm text-black font-medium mt-1">
              Share your vehicle registration, location pin, or engine sound
              video on WhatsApp for quick diagnosis.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-neutral-200">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base sm:text-lg font-extrabold text-black hover:underline tabular-nums inline-flex items-center gap-2"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Chat on WhatsApp · {BUSINESS_CONFIG.phoneDisplay}</span>
            </a>
            <span className="text-xs font-bold text-black">
              Instant reply within 5 minutes
            </span>
          </div>
        </div>

        {/* 3. Email */}
        <div className="bg-white rounded-2xl border border-neutral-300 p-6 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 text-[#DC2626] flex items-center justify-center mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-extrabold text-black">Email</h2>
            <p className="text-xs sm:text-sm text-black font-medium mt-1">
              For corporate fleet maintenance contracts, service invoices, and
              customer support queries.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-neutral-200">
            <a
              href={`mailto:${BUSINESS_CONFIG.email}`}
              className="text-sm sm:text-base font-extrabold text-black hover:underline break-all block"
            >
              {BUSINESS_CONFIG.email}
            </a>
            <span className="text-xs font-bold text-black">
              Official Support Desk
            </span>
          </div>
        </div>
      </div>

      {/* Business Address, Working Hours & Google Maps Location */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Address & Working Hours Column */}
        <div className="lg:col-span-5 space-y-5">
          {/* 4. Business Address */}
          <div className="bg-white rounded-2xl border border-neutral-300 p-6">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-200 text-[#DC2626] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-black">
                  Corporate Office
                </h2>
                <address className="not-italic text-xs sm:text-sm text-black font-medium mt-2 space-y-1 leading-relaxed">
                  <p className="font-extrabold text-black">
                    {BUSINESS_CONFIG.name}
                  </p>
                  <p>6-Floor, 605, TOWER C ,Gardenia Square</p>
                  <p>{BUSINESS_CONFIG.address.line2}</p>
                  <p>
                    {BUSINESS_CONFIG.address.city} –{' '}
                    <span className="tabular-nums font-bold">
                      {BUSINESS_CONFIG.address.pincode}
                    </span>
                  </p>
                </address>
                <div className="mt-4">
                  <a
                    href={BUSINESS_CONFIG.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-extrabold text-black hover:underline inline-flex items-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Working Hours */}
          <div className="bg-white rounded-2xl border border-neutral-300 p-6">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-200 text-[#DC2626] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="w-full">
                <h2 className="text-base sm:text-lg font-extrabold text-black">
                  Working Hours
                </h2>
                <div className="mt-3 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-center justify-between py-1.5 border-b border-neutral-200">
                    <span className="font-semibold text-black">Working Days</span>
                    <span className="font-extrabold text-black">
                      {BUSINESS_CONFIG.workingHours.days}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="font-semibold text-black">
                      Doorstep Slots
                    </span>
                    <span className="font-extrabold text-black tabular-nums">
                      {BUSINESS_CONFIG.workingHours.doorstepTimings}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-black font-bold mt-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#DC2626] shrink-0" />
                  <span>{BUSINESS_CONFIG.workingHours.emergencyNote}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Google Maps Location Interactive Showcase */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-300 overflow-hidden flex flex-col justify-between">
          <div className="p-5 sm:p-6 border-b border-neutral-200 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-black">
                Google Maps Location
              </h2>
              <p className="text-xs font-medium text-black mt-0.5">
                {BUSINESS_CONFIG.address.full}
              </p>
            </div>
            <a
              href={BUSINESS_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[40px] px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-red-700 border border-red-800 text-black font-extrabold text-xs flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Navigation className="w-3.5 h-3.5 text-black" />
              <span>Get Directions</span>
            </a>
          </div>

          <div className="relative flex-1 min-h-[280px] bg-neutral-100">
            <iframe
              title="SAHAJ CAPITAL AUTOMOBILE Corporate Office Location Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.4250%2C28.6180%2C77.4480%2C28.6360&amp;layer=mapnik"
              className="w-full h-full min-h-[280px] border-0"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-xs p-3.5 rounded-2xl border border-[#DC2626] shadow-md flex items-center gap-3 max-w-sm">
              <div className="w-9 h-9 rounded-xl bg-[#DC2626] text-black flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs text-black">
                <strong className="font-extrabold text-black block">
                  {BUSINESS_CONFIG.name}
                </strong>
                <span className="font-medium text-black block">
                  {BUSINESS_CONFIG.address.full}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-red-50/50 border-t border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-bold text-black">
              Prefer doorstep service instead of visiting the workshop?
            </span>
            <button
              type="button"
              onClick={onNavigateBook}
              className="min-h-[40px] px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-red-700 border border-red-800 text-black font-extrabold text-xs inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-black" />
              <span>Book Doorstep Mechanic</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
