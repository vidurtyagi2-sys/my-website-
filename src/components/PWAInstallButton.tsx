import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Share2,
  X,
  Chrome,
  MoreVertical,
  PlusSquare,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { BrandLogo } from './BrandLogo';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const appUrl =
    typeof window !== 'undefined'
      ? window.location.href.split('#')[0]
      : 'https://vidurtyagi2-sys.github.io/SCA-AAP-/';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SCA SERVICE — SAHAJ CAPITAL AUTOMOBILE App',
          text: 'Download SCA SERVICE App in Chrome for doorstep bike & automobile service booking!',
          url: appUrl,
        });
      } catch {
        // Ignore cancel
      }
    } else {
      handleCopyLink();
    }
  };

  const handleTriggerInstall = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (accepted) {
        onClose();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 text-black"
      role="dialog"
      aria-modal="true"
      aria-label="Download App in Chrome"
    >
      <div className="bg-white w-full max-w-lg rounded-3xl border-2 border-[#DC2626] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Top Modal Header */}
        <div className="bg-red-50 px-5 py-4 border-b border-red-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#DC2626] text-white flex items-center justify-center shadow-xs shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-black leading-tight">
                Download App in Chrome
              </h2>
              <p className="text-xs font-bold text-black">
                SCA SERVICE — Direct Chrome &amp; Android Install
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close download modal"
            className="min-h-[40px] min-w-[40px] rounded-xl bg-white border border-neutral-300 hover:bg-red-100 flex items-center justify-center text-black cursor-pointer transition-colors"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* App Identity Card */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-300 flex items-center justify-between gap-3">
            <BrandLogo variant="compact" />
            <span className="px-2.5 py-1 rounded-full bg-green-100 border border-green-400 text-[11px] font-extrabold text-black inline-flex items-center gap-1 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-700" />
              <span>Verified Web App</span>
            </span>
          </div>

          {/* 1. Direct One-Click Chrome Install (if supported right now) */}
          {isInstalled ? (
            <div className="p-4 rounded-2xl bg-green-50 border-2 border-green-600 text-black flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-700 shrink-0" />
              <div>
                <p className="text-sm font-extrabold text-black">
                  App Already Installed!
                </p>
                <p className="text-xs font-semibold text-black">
                  SCA SERVICE is already installed on your device home screen.
                </p>
              </div>
            </div>
          ) : isInstallable ? (
            <div className="p-4 rounded-2xl bg-red-50 border-2 border-[#DC2626] space-y-3">
              <div className="flex items-start gap-3">
                <Smartphone className="w-6 h-6 text-[#DC2626] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-extrabold text-black">
                    Instant 1-Click Chrome App Install
                  </h3>
                  <p className="text-xs font-semibold text-black mt-0.5">
                    Click the button below to install SCA SERVICE directly to
                    your phone or computer home screen.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleTriggerInstall}
                className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-[#DC2626] hover:bg-red-700 text-black font-extrabold text-sm flex items-center justify-center gap-2 border border-red-800 shadow-sm cursor-pointer transition-all"
              >
                <Download className="w-5 h-5 text-black" />
                <span>Install SCA SERVICE App Now</span>
              </button>
            </div>
          ) : null}

          {/* 2. Direct Chrome Download Link Box */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5">
              <Chrome className="w-4 h-4 text-[#DC2626]" />
              <span>Chrome App Download Link - Copy and Open in Chrome</span>
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="flex-1 px-3.5 py-2.5 rounded-xl bg-neutral-100 border border-neutral-300 text-xs font-mono font-bold text-black break-all select-all">
                {appUrl}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex-1 sm:flex-initial min-h-[42px] px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-red-700 text-black font-extrabold text-xs inline-flex items-center justify-center gap-1.5 border border-red-800 cursor-pointer transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-black" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-black" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleShareLink}
                  aria-label="Share App Link"
                  className="min-h-[42px] px-3 py-2 rounded-xl bg-white hover:bg-red-50 text-black font-extrabold text-xs inline-flex items-center justify-center gap-1.5 border border-neutral-300 cursor-pointer transition-colors"
                >
                  <Share2 className="w-4 h-4 text-[#DC2626]" />
                  <span>Share</span>
                </button>
              </div>
            </div>
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#DC2626] hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Link in New Chrome Tab to Install</span>
              </a>
            </div>
          </div>

          {/* 3. Direct Android APK Download Link */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-extrabold text-black block">
                Direct Android Package APK File
              </span>
              <span className="text-[11px] font-semibold text-black">
                Download SCA-SERVICE.apk directly in Chrome browser
              </span>
            </div>
            <a
              href="/SCA-SERVICE.apk"
              download="SCA-SERVICE.apk"
              className="min-h-[40px] px-4 py-2 rounded-xl bg-white hover:bg-red-50 border-2 border-[#DC2626] text-black font-extrabold text-xs inline-flex items-center justify-center gap-1.5 shrink-0 transition-colors"
            >
              <Download className="w-4 h-4 text-[#DC2626]" />
              <span>Download APK</span>
            </a>
          </div>

          {/* 4. Step-by-Step Chrome Installation Guide */}
          <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200 space-y-2.5">
            <h3 className="text-xs sm:text-sm font-extrabold text-black flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#DC2626]" />
              <span>
                Chrome Mein App Download Kaise Karein - How to Install:
              </span>
            </h3>
            {isIOS ? (
              <ol className="text-xs font-bold text-black space-y-1.5 list-decimal list-inside">
                <li>
                  Upar diya gaya <strong>Link Copy</strong> karein aur{' '}
                  <strong>Safari / Chrome</strong> mein kholein.
                </li>
                <li>
                  Niche <strong>Share</strong> button par tap karein.
                </li>
                <li>
                  <strong>&ldquo;Add to Home Screen&rdquo;</strong> par click
                  karke <strong>Add</strong> दबाएं.
                </li>
              </ol>
            ) : (
              <ol className="text-xs font-bold text-black space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#DC2626] text-white text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    Upar diye gaye link ko copy karke apne mobile ya computer ke{' '}
                    <strong>Google Chrome</strong> browser mein kholein.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#DC2626] text-white text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <span className="flex flex-wrap items-center gap-1">
                    Chrome ke upar right corner mein{' '}
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-white border border-neutral-300">
                      <MoreVertical className="w-3 h-3" /> 3 Dots
                    </span>{' '}
                    par click karein.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#DC2626] text-white text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <span className="flex flex-wrap items-center gap-1">
                    Menu mein{' '}
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white border border-neutral-300">
                      <PlusSquare className="w-3 h-3 text-[#DC2626]" /> Install
                      App / Add to Home Screen
                    </span>{' '}
                    par tap karein — App aapke phone mein download ho jayega!
                  </span>
                </li>
              </ol>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-neutral-100 border-t border-neutral-200 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] px-5 py-2 rounded-xl bg-white hover:bg-neutral-200 border border-neutral-300 text-xs font-extrabold text-black cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface PWAInstallButtonProps {
  onOpenModal: () => void;
  variant?: 'header' | 'hero' | 'footer' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  onOpenModal,
  variant = 'header',
}) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();

  const handleClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (!accepted) {
        onOpenModal();
      }
    } else {
      onOpenModal();
    }
  };

  if (variant === 'header') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex min-h-[40px] px-3 sm:px-3.5 py-2 rounded-xl bg-white hover:bg-red-50 border-2 border-[#DC2626] text-black font-extrabold text-xs items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
        title="Download SCA SERVICE App in Chrome"
      >
        <Download className="w-3.5 h-3.5 text-[#DC2626] shrink-0 animate-bounce" />
        <span>{isInstalled ? 'App Link' : 'Download App'}</span>
      </button>
    );
  }

  if (variant === 'footer') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#DC2626] hover:bg-red-700 border border-red-800 text-black font-extrabold text-xs cursor-pointer transition-colors shadow-2xs"
      >
        <Download className="w-4 h-4 text-black" />
        <span>Download App Chrome</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="min-h-[48px] px-5 py-3.5 rounded-xl bg-red-50 hover:bg-red-100 text-black border-2 border-[#DC2626] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
    >
      <Download className="w-5 h-5 text-[#DC2626] shrink-0" />
      <span>Download App in Chrome</span>
    </button>
  );
};
