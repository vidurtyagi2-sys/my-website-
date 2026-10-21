import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Wrench,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { ServicePackage } from '../config/siteConfig';
import { BrandLogo } from './BrandLogo';

interface ServiceChecklistModalProps {
  pkg: ServicePackage | null;
  onClose: () => void;
  onBookPackage: (pkg: ServicePackage) => void;
}

export const ServiceChecklistModal: React.FC<ServiceChecklistModalProps> = ({
  pkg,
  onClose,
  onBookPackage,
}) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);

  // Reset checkbox state whenever a new package modal is opened
  useEffect(() => {
    setAgreedToTerms(false);
    setShowTermsError(false);
  }, [pkg]);

  if (!pkg) return null;

  const handleBookNowClick = () => {
    if (!agreedToTerms) {
      setShowTermsError(true);
      return;
    }
    onBookPackage(pkg);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-fadeIn text-black"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checklist-modal-title"
    >
      <div className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl border-2 border-[#DC2626] max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Mobile grab handle */}
        <div className="sm:hidden w-10 h-1.5 bg-neutral-400 rounded-full mx-auto mt-3 shrink-0" />

        {/* Modal Top Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-neutral-200 flex items-start justify-between gap-4 shrink-0 bg-white">
          <div>
            <div className="text-xs font-bold text-black mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#DC2626] inline-block" />
              <span>{pkg.ccCategory} · Official Service Checklist</span>
            </div>
            <h2
              id="checklist-modal-title"
              className="text-xl sm:text-2xl font-extrabold text-black"
            >
              {pkg.name}
            </h2>
            <p className="text-xs text-black font-medium mt-1">
              Suitable for: {pkg.suitableModelsExample}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close checklist"
            className="min-h-[44px] min-w-[44px] rounded-xl border border-neutral-300 text-black hover:bg-red-50 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-black">
          {/* Price, Time & Warranty Summary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-red-50/70 p-4 rounded-2xl border border-red-200">
            <div>
              <span className="text-xs font-semibold text-black block">
                Package Price
              </span>
              <span className="text-xl font-extrabold text-black tabular-nums">
                Starting from ₹{pkg.price}
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#DC2626] shrink-0 mt-1" />
              <div>
                <span className="text-xs font-semibold text-black block">
                  Estimated Service Time
                </span>
                <span className="text-sm font-bold text-black">
                  {pkg.estimatedTime}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#DC2626] shrink-0 mt-1" />
              <div>
                <span className="text-xs font-semibold text-black block">
                  Service Guarantee
                </span>
                <span className="text-xs font-bold text-black leading-snug block">
                  {pkg.warranty}
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Inspection & Service Checklist */}
          <div>
            <h3 className="text-base font-extrabold text-black mb-3 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#DC2626]" />
              <span>Detailed Service Checklist</span>
            </h3>
            <div className="space-y-4">
              {pkg.detailedChecklist.map((group) => (
                <div
                  key={group.category}
                  className="bg-white rounded-2xl border border-neutral-200 p-4"
                >
                  <h4 className="text-sm font-extrabold text-black mb-3">
                    {group.category}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-black font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* What's Included vs What's Not Included */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-red-50/50 border border-red-200 rounded-2xl p-4">
              <h4 className="text-sm font-extrabold text-black mb-2.5">
                What&apos;s Included
              </h4>
              <ul className="space-y-2">
                {pkg.whatsIncluded.map((inc) => (
                  <li
                    key={inc}
                    className="flex items-start gap-2 text-xs sm:text-sm text-black font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
              <h4 className="text-sm font-extrabold text-black mb-2.5">
                What&apos;s Not Included
              </h4>
              <ul className="space-y-2">
                {pkg.whatsNotIncluded.map((exc) => (
                  <li
                    key={exc}
                    className="flex items-start gap-2 text-xs sm:text-sm text-black font-medium"
                  >
                    <XCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Official Brand Footer Stamp inside Modal */}
          <div className="pt-2 flex items-center justify-between border-t border-neutral-200">
            <BrandLogo variant="compact" />
            <span className="text-xs font-bold text-black">
              100% Transparent Billing
            </span>
          </div>
        </div>

        {/* Sticky Modal Action Footer with Mandatory "Yes, I agree to the Terms of Service" Checkbox */}
        <div className="p-4 sm:px-6 bg-white border-t-2 border-neutral-200 space-y-3 shrink-0">
          <label
            htmlFor="modal-terms-checkbox"
            className="flex items-center gap-3 p-3 rounded-xl bg-red-50/70 border border-red-200 cursor-pointer select-none"
          >
            <input
              id="modal-terms-checkbox"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked);
                if (e.target.checked) setShowTermsError(false);
              }}
              className="w-5 h-5 accent-[#DC2626] rounded cursor-pointer shrink-0"
            />
            <span className="text-xs sm:text-sm font-semibold text-black">
              Yes, I agree to the{' '}
              <strong className="font-extrabold underline">
                Terms of Service
              </strong>
            </span>
          </label>

          {showTermsError && !agreedToTerms && (
            <div className="flex items-center gap-2 text-xs font-bold text-black bg-red-50 border border-[#DC2626] px-3 py-2 rounded-xl">
              <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0" />
              <span>
                Please tick &ldquo;Yes, I agree to the Terms of Service&rdquo; to
                open Booking.
              </span>
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-black block">
                Selected Package
              </span>
              <span className="text-base font-extrabold text-black tabular-nums">
                ₹{pkg.price}{' '}
                <span className="text-xs font-semibold text-black">
                  onwards
                </span>
              </span>
            </div>
            <button
              type="button"
              onClick={handleBookNowClick}
              disabled={!agreedToTerms}
              className={`min-h-[48px] px-7 py-3 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all whitespace-nowrap border ${
                agreedToTerms
                  ? 'bg-[#DC2626] hover:bg-red-700 active:scale-[0.99] border-red-800 cursor-pointer shadow-sm'
                  : 'bg-neutral-200 border-neutral-300 text-neutral-500 opacity-60 cursor-not-allowed'
              }`}
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
