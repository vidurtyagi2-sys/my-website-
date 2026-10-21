import React, { useState } from 'react';
import { X, QrCode, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/siteConfig';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CallIcon } from './CallIcon';

interface PaymentQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingRef?: string;
  amount?: number;
}

export const PaymentQRModal: React.FC<PaymentQRModalProps> = ({
  isOpen,
  onClose,
  bookingRef,
  amount,
}) => {
  const [copied, setCopied] = useState(false);
  const upiId = '9548984717@okbizaxis';
  const qrImagePath = `${import.meta.env.BASE_URL}assets/aistudio/WhatsApp_Image_2026-10-18_at_6.05.28_PM_387e2141.jpeg`;

  if (!isOpen) return null;

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const whatsappPaymentMsg = encodeURIComponent(
    `Hello ${BUSINESS_CONFIG.name}, I have made an online payment for my bike service booking${
      bookingRef ? ` (Ref: ${bookingRef})` : ''
    }${amount ? ` of ₹${amount}` : ''}.\n\nSharing screenshot for confirmation.`
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 text-black"
      role="dialog"
      aria-modal="true"
      aria-label="UPI Payment & QR Code"
    >
      <div className="bg-white w-full max-w-md rounded-3xl border-2 border-[#DC2626] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-50 via-white to-red-50 px-5 py-4 border-b border-red-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#DC2626] text-white flex items-center justify-center shadow-xs shrink-0">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-black leading-tight">
                Scan &amp; Pay via UPI
              </h2>
              <p className="text-xs font-bold text-neutral-600">
                Sahaj Capital Automobile Official QR
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-xl border border-neutral-300 hover:border-[#DC2626] hover:bg-red-50 text-black flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-center">
          {/* Booking Ref & Amount if present */}
          {(bookingRef || amount) && (
            <div className="p-3 rounded-2xl bg-red-50/80 border border-red-200 flex items-center justify-between text-xs font-extrabold text-black">
              {bookingRef && <span>Booking ID: {bookingRef}</span>}
              {amount && <span className="text-[#DC2626] text-sm">Pay: ₹{amount}</span>}
            </div>
          )}

          {/* QR Code Container */}
          <div className="bg-neutral-50 p-3 sm:p-4 rounded-2xl border-2 border-neutral-200 inline-block max-w-[280px] sm:max-w-[320px] mx-auto shadow-sm">
            <img
              src={qrImagePath}
              alt="Sahaj Capital Automobile Google Pay UPI QR Code"
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>

          {/* UPI ID Details */}
          <div className="space-y-2">
            <div className="p-3 rounded-2xl bg-neutral-100 border border-neutral-300 flex items-center justify-between gap-2">
              <div className="text-left overflow-hidden">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                  Official UPI ID
                </span>
                <span className="text-xs sm:text-sm font-mono font-extrabold text-black select-all truncate block">
                  {upiId}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyUpi}
                className="shrink-0 min-h-[36px] px-3 py-1.5 rounded-xl bg-white hover:bg-red-50 border border-neutral-300 hover:border-[#DC2626] text-xs font-extrabold text-black inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-xs text-neutral-600 font-medium space-y-0.5">
              <p>
                <strong>Business:</strong> Sahaj Capital Automobile
              </p>
              <p>
                <strong>Mobile:</strong> +91 95489 84717
              </p>
              <p className="text-[11px] text-neutral-500 pt-1">
                Accepted: GPay, PhonePe, Paytm, Amazon Pay, BHIM &amp; all Bank UPI Apps
              </p>
            </div>
          </div>

          {/* Post payment instructions */}
          <div className="p-3 rounded-2xl bg-green-50 border border-green-200 text-xs text-green-900 text-left space-y-1.5">
            <p className="font-extrabold flex items-center gap-1.5 text-green-800">
              <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
              <span>Payment Confirmation</span>
            </p>
            <p className="font-medium text-[11px] leading-relaxed">
              Scan &amp; pay with any UPI App. Once paid, share the payment screenshot on WhatsApp to receive your official digital invoice.
            </p>
          </div>

          {/* WhatsApp share action */}
          <a
            href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${whatsappPaymentMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Share Payment Screenshot on WhatsApp</span>
          </a>
        </div>

        {/* Footer */}
        <div className="bg-neutral-50 px-5 py-3 border-t border-neutral-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] font-bold text-neutral-500">
            100% Secure UPI Payment
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-neutral-200 hover:bg-neutral-300 text-black font-extrabold text-xs cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
