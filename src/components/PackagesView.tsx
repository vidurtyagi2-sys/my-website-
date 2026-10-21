import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  CalendarPlus,
  Wrench,
} from 'lucide-react';
import {
  SERVICE_PACKAGES,
  BUSINESS_CONFIG,
  ServicePackage,
} from '../config/siteConfig';
import { ResilientImage } from './ResilientImage';
import { BrandLogo } from './BrandLogo';
import { CallIcon } from './CallIcon';

interface PackagesViewProps {
  onViewChecklist: (pkg: ServicePackage) => void;
  onBookPackage: (pkg: ServicePackage) => void;
}

export const PackagesView: React.FC<PackagesViewProps> = ({
  onViewChecklist,
  onBookPackage,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [agreedByPackageId, setAgreedByPackageId] = useState<
    Record<string, boolean>
  >({});

  const toggleAgreement = (pkgId: string, checked: boolean) => {
    setAgreedByPackageId((prev) => ({
      ...prev,
      [pkgId]: checked,
    }));
  };

  const filteredPackages =
    selectedFilter === 'all'
      ? SERVICE_PACKAGES
      : SERVICE_PACKAGES.filter((pkg) => pkg.id === selectedFilter);

  return (
    <div className="py-5 sm:py-8 space-y-10 pb-12 text-black">
      {/* Page Header */}
      <div className="bg-white rounded-3xl border border-neutral-300 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-black mb-1.5">
            <Wrench className="w-4 h-4 text-[#DC2626]" />
            <span>TRANSPARENT SERVICES &amp; PERIODIC PACKAGES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-black">
            Services / Packages
          </h1>
          <p className="text-sm sm:text-base text-black font-medium mt-1.5 max-w-2xl">
            Choose the right service package based on your motorcycle or scooter
            engine displacement (CC). Every service includes doorstep inspection by verified mechanics.
          </p>
        </div>
        <BrandLogo variant="compact" className="self-start md:self-center" />
      </div>

      {/* ENGINE CC PACKAGES */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-black flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" />
              <span>Engine CC Displacement Packages</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-semibold">
              Fixed, honest labour pricing by bike category
            </p>
          </div>

          <span className="text-xs font-bold text-neutral-500">
            {filteredPackages.length} Packages Available
          </span>
        </div>

        {/* Interactive CC Filter Controls */}
        <div
          className="flex items-center gap-1.5 p-1.5 bg-red-100/70 border border-red-200 rounded-2xl overflow-x-auto no-scrollbar"
          role="tablist"
          aria-label="Filter packages by engine CC"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedFilter === 'all'}
            onClick={() => setSelectedFilter('all')}
            className={`min-h-[40px] px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-[#DC2626] text-black shadow-xs border border-red-800'
                : 'text-black hover:bg-red-200/60'
            }`}
          >
            All CC Packages ({SERVICE_PACKAGES.length})
          </button>
          {SERVICE_PACKAGES.map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              role="tab"
              aria-selected={selectedFilter === pkg.id}
              onClick={() => setSelectedFilter(pkg.id)}
              className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === pkg.id
                  ? 'bg-[#DC2626] text-black shadow-xs border border-red-800'
                  : 'text-black hover:bg-red-200/60'
              }`}
            >
              {pkg.ccCategory.replace('For ', '')}
            </button>
          ))}
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPackages.map((pkg, index) => {
            const isAgreed = !!agreedByPackageId[pkg.id];

            return (
              <article
                key={pkg.id}
                className="bg-white rounded-3xl border border-neutral-300 overflow-hidden flex flex-col justify-between transition-all hover:border-[#DC2626]"
              >
                <div>
                  {/* Top Card Banner with Image & Pricing */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 border-b border-neutral-200">
                    <div className="sm:col-span-5 relative h-44 sm:h-full min-h-[160px]">
                      <ResilientImage
                        src={pkg.image}
                        alt={`${pkg.name} - ${pkg.ccCategory}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-3 left-3 sm:hidden bg-white/95 px-3 py-1.5 rounded-xl border border-red-300 text-black">
                        <span className="text-[10px] font-extrabold text-black block">
                          PACKAGE 0{index + 1}
                        </span>
                        <span className="text-base font-extrabold text-black">
                          {pkg.name}
                        </span>
                      </div>
                    </div>

                    <div className="sm:col-span-7 p-5 sm:p-6 flex flex-col justify-between bg-red-50/40">
                      <div>
                        <div className="flex items-center justify-between gap-2 text-xs text-black font-bold mb-1">
                          <span>
                            0{index + 1}. {pkg.ccCategory}
                          </span>
                          <span>·</span>
                          <span>{pkg.estimatedTime}</span>
                        </div>

                        <h2 className="text-xl font-extrabold text-black hidden sm:block">
                          {pkg.name}
                        </h2>

                        <p className="text-xs text-black font-medium mt-1.5 leading-relaxed">
                          <strong className="font-extrabold text-black">
                            Models:
                          </strong>{' '}
                          {pkg.suitableModelsExample}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-red-200 flex items-baseline justify-between">
                        <span className="text-xs font-bold text-black">
                          Package Price
                        </span>
                        <span className="text-xl sm:text-2xl font-extrabold text-black tabular-nums">
                          Starting from ₹{pkg.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Unboxed metadata row */}
                  <div className="px-5 py-4 sm:px-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-black">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#DC2626]" />
                      {pkg.estimatedTime}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#DC2626]" />
                      {pkg.warranty}
                    </span>
                  </div>

                  {/* Summary Points List */}
                  <div className="px-5 pb-4 sm:px-6 space-y-2">
                    <span className="text-xs font-extrabold text-neutral-500 uppercase tracking-wider block">
                      Includes:
                    </span>
                    <ul className="space-y-1.5">
                      {pkg.summaryPoints.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-center gap-2 text-xs sm:text-sm text-black font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-3 grid grid-cols-2 gap-3 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => onViewChecklist(pkg)}
                    className="min-h-[46px] px-3 py-2.5 rounded-xl border border-neutral-300 bg-white hover:border-black text-black hover:bg-red-50 font-extrabold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-4 h-4 shrink-0 text-black" />
                    <span>Checklist</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onBookPackage(pkg)}
                    className="min-h-[46px] px-3 py-2.5 rounded-xl bg-[#DC2626] hover:bg-red-700 text-black font-extrabold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-red-800 shadow-xs"
                  >
                    <CalendarPlus className="w-4 h-4 shrink-0" />
                    <span>Book Package</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>



      {/* Note about Consumables & Custom Bike / Heavy Repairs */}
      <div className="bg-white rounded-2xl border border-neutral-300 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-extrabold text-black">
            Need Bike Service or Custom Engine Overhaul?
          </h3>
          <p className="text-xs sm:text-sm text-black font-medium mt-1">
            Engine oil, filters, and genuine OEM spare parts are billed at
            transparent MRP based on your exact vehicle model. Call our service
            advisor for an instant estimate.
          </p>
        </div>
        <a
          href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
          className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#DC2626] hover:bg-red-700 border border-red-800 text-black font-extrabold text-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
        >
          <CallIcon className="w-4 h-4" />
          <span>Call {BUSINESS_CONFIG.phoneDisplay}</span>
        </a>
      </div>
    </div>
  );
};
