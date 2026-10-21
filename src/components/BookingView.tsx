import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  Home,
  AlertCircle,
  Calendar,
  Clock,
  MapPin,
  Car,
  User,
  Phone,
  Wrench,
  FileText,
  Sparkles,
  Search,
  Mail,
  LogOut,
  ShieldCheck,
  ArrowRight,
  ClipboardList,
  QrCode,
} from 'lucide-react';
import {
  BUSINESS_CONFIG,
  VEHICLE_TYPES,
  VEHICLE_BRANDS,
  VEHICLE_MODELS_BY_BRAND,
  SERVICE_TYPES,
  SERVICE_PACKAGES,
  PREFERRED_TIME_SLOTS,
  BookingRecord,
  CustomerAccount,
} from '../config/siteConfig';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CallIcon } from './CallIcon';
import { CustomerLoginIcon } from './CustomerLoginIcon';
import { PaymentQRModal } from './PaymentQRModal';
import { api } from '../config/api';

interface BookingViewProps {
  customerAccount: CustomerAccount | null;
  onCustomerLogin: (account: CustomerAccount) => void;
  onCustomerLogout: () => void;
  customerBookings?: BookingRecord[];
  initialServiceType?: string;
  initialPackageId?: string;
  initialSpecialOfferApplied?: boolean;
  onCreateBooking: (booking: BookingRecord) => void;
  onBackToHome: () => void;
  onOpenChecklistById: (packageId: string) => void;
}

interface FormErrors {
  customerName?: string;
  phoneNumber?: string;
  vehicleType?: string;
  brand?: string;
  model?: string;
  registrationNumber?: string;
  service?: string;
  packageId?: string;
  date?: string;
  time?: string;
  address?: string;
}

export const BookingView: React.FC<BookingViewProps> = ({
  customerAccount,
  onCustomerLogin,
  onCustomerLogout,
  customerBookings = [],
  initialServiceType = 'General Service',
  initialPackageId = 'basic-bike-service',
  initialSpecialOfferApplied = false,
  onCreateBooking,
  onBackToHome,
  onOpenChecklistById,
}) => {
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Customer Email Login / Sign Up Form State
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginError, setLoginError] = useState('');

  // Payment Modal State
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [payModalInfo, setPayModalInfo] = useState<{
    ref?: string;
    amount?: number;
  } | null>(null);

  // Service Booking Form State
  const [customerName, setCustomerName] = useState(
    customerAccount?.name || ''
  );
  const [phoneNumber, setPhoneNumber] = useState(
    customerAccount?.phoneNumber || ''
  );
  const [vehicleType, setVehicleType] = useState<string>('Motorcycle');
  const [brand, setBrand] = useState<string>('Hero');
  const [brandSearch, setBrandSearch] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [service, setService] = useState<string>(initialServiceType);
  const [packageId, setPackageId] = useState<string>(initialPackageId);
  const [date, setDate] = useState<string>(todayStr);
  const [time, setTime] = useState<string>('9 AM - 11 AM');
  const [address, setAddress] = useState('');
  const [specialRequest, setSpecialRequest] = useState(
    initialSpecialOfferApplied
      ? `Applied Promo Code: ${BUSINESS_CONFIG.specialOffer.code} (Flat ₹100 OFF + Free 20-Point Check)`
      : ''
  );

  const [errors, setErrors] = useState<FormErrors>({});
  const [agreedToTermsInForm, setAgreedToTermsInForm] = useState(false);
  const [confirmedBooking, setConfirmedBooking] =
    useState<BookingRecord | null>(null);

  // Sync logged-in customer details into booking form automatically
  useEffect(() => {
    if (customerAccount) {
      if (!customerName.trim() && customerAccount.name) {
        setCustomerName(customerAccount.name);
      }
      if (!phoneNumber.trim() && customerAccount.phoneNumber) {
        setPhoneNumber(customerAccount.phoneNumber);
      }
    }
  }, [customerAccount]);

  useEffect(() => {
    if (initialServiceType) {
      setService(initialServiceType);
    }
  }, [initialServiceType]);

  useEffect(() => {
    if (initialPackageId) {
      setPackageId(initialPackageId);
    }
  }, [initialPackageId]);

  useEffect(() => {
    if (
      initialSpecialOfferApplied &&
      !specialRequest.includes(BUSINESS_CONFIG.specialOffer.code)
    ) {
      setSpecialRequest((prev) =>
        prev
          ? `${prev} | Promo: ${BUSINESS_CONFIG.specialOffer.code}`
          : `Applied Promo Code: ${BUSINESS_CONFIG.specialOffer.code} (Flat ₹100 OFF + Free 20-Point Check)`
      );
    }
  }, [initialSpecialOfferApplied]);

  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  const handleCustomerLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const trimmedEmail = loginEmail.trim().toLowerCase();
    const trimmedName = loginName.trim();
    const cleanedPhone = loginPhone.replace(/\D/g, '');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setLoginError(
        'Please enter a valid Email Id (e.g. yourname@gmail.com) to continue.'
      );
      return;
    }

    if (authMode === 'signup' && (!trimmedName || trimmedName.length < 2)) {
      setLoginError('Please enter your Full Name to sign up.');
      return;
    }

    if (cleanedPhone && !/^[6-9]\d{9}$/.test(cleanedPhone)) {
      setLoginError('Please enter a valid 10-digit Mobile Number.');
      return;
    }

    setIsSubmittingAuth(true);

    // Derive a clean display name if logging in directly with Email Id
    const derivedName =
      trimmedName ||
      trimmedEmail
        .split('@')[0]
        .replace(/[._-]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

    try {
      const res = await api.customerAuth(
        derivedName,
        trimmedEmail,
        cleanedPhone || undefined
      );

      const officialCustomer: CustomerAccount = res?.customer || {
        id: `SCA-CUST-${Math.floor(1000 + Math.random() * 9000)}`,
        name: derivedName,
        email: trimmedEmail,
        phoneNumber: cleanedPhone || undefined,
        loggedInAt: new Date().toLocaleString('en-IN'),
      };

      if (!customerName.trim() && officialCustomer.name) {
        setCustomerName(officialCustomer.name);
      }
      if (officialCustomer.phoneNumber) {
        setPhoneNumber(officialCustomer.phoneNumber);
      }
      onCustomerLogin(officialCustomer);
    } catch {
      const fallbackAccount: CustomerAccount = {
        id: `SCA-CUST-${Math.floor(1000 + Math.random() * 9000)}`,
        name: derivedName,
        email: trimmedEmail,
        phoneNumber: cleanedPhone || undefined,
        loggedInAt: new Date().toLocaleString('en-IN'),
      };
      onCustomerLogin(fallbackAccount);
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleBrandChange = (newBrand: string) => {
    setBrand(newBrand);
    const defaultModels = VEHICLE_MODELS_BY_BRAND[newBrand] || [];
    if (defaultModels.length > 0) {
      setModel(defaultModels[0]);
    } else {
      setModel('');
    }

    if (newBrand === 'Royal Enfield') {
      setPackageId('royal-bike-service');
    } else if (newBrand === 'KTM' || newBrand === 'Aprilia') {
      setPackageId('premium-bike-service');
    } else if (
      newBrand === 'Vespa' ||
      newBrand === 'TVS' ||
      newBrand === 'Bajaj'
    ) {
      setPackageId('classic-bike-service');
    }
  };

  const availableModels = useMemo(() => {
    return VEHICLE_MODELS_BY_BRAND[brand] || [];
  }, [brand]);

  const filteredBrands = useMemo(() => {
    if (!brandSearch.trim()) return [...VEHICLE_BRANDS];
    return VEHICLE_BRANDS.filter((b) =>
      b.toLowerCase().includes(brandSearch.toLowerCase())
    );
  }, [brandSearch]);

  const selectedPackageObj = useMemo(() => {
    return (
      SERVICE_PACKAGES.find((p) => p.id === packageId) || SERVICE_PACKAGES[0]
    );
  }, [packageId]);

  const myBookings = useMemo(() => {
    if (!customerAccount) return [];
    return customerBookings.filter((b) => {
      const matchEmail =
        b.customerEmail &&
        b.customerEmail.toLowerCase() === customerAccount.email.toLowerCase();
      const matchId =
        b.customerId && customerAccount.id && b.customerId === customerAccount.id;
      return matchEmail || matchId;
    });
  }, [customerBookings, customerAccount]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!customerName.trim() || customerName.trim().length < 2) {
      newErrors.customerName = 'Please enter your full name';
    }

    const cleanedPhone = phoneNumber
      .replace(/[\s\-()]/g, '')
      .replace(/^(\+91|91|0)/, '');
    if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      newErrors.phoneNumber =
        'Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9)';
    }

    if (!vehicleType) {
      newErrors.vehicleType = 'Please select your vehicle type';
    }

    if (!brand) {
      newErrors.brand = 'Please select your vehicle brand';
    }

    if (!model.trim()) {
      newErrors.model = 'Please enter or select your vehicle model';
    }

    if (!registrationNumber.trim() || registrationNumber.trim().length < 4) {
      newErrors.registrationNumber =
        'Please enter your vehicle registration number (e.g., DL 10 SC 4821)';
    }

    if (!service) {
      newErrors.service = 'Please select a service type';
    }

    if (!packageId) {
      newErrors.packageId = 'Please select a service package';
    }

    if (!date) {
      newErrors.date = 'Please select a preferred service date';
    }

    if (!time) {
      newErrors.time = 'Please choose a preferred time slot';
    }

    if (!address.trim() || address.trim().length < 5) {
      newErrors.address =
        'Please enter your city or complete doorstep service address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerAccount) {
      return;
    }
    if (!validateForm()) {
      return;
    }

    const cleanedPhone = phoneNumber
      .replace(/[\s\-()]/g, '')
      .replace(/^(\+91|91|0)/, '');
    const randomRef = Math.floor(10000 + Math.random() * 90000);
    const bookingId = `SCA-${randomRef}`;

    const newBooking: BookingRecord = {
      bookingId,
      customerId: customerAccount.id || undefined,
      customerName: customerName.trim(),
      customerEmail: customerAccount.email,
      phoneNumber: cleanedPhone,
      vehicleType,
      brand,
      model: model.trim(),
      registrationNumber: registrationNumber.trim().toUpperCase(),
      service,
      packageId: selectedPackageObj.id,
      packageName: `${selectedPackageObj.name} (${selectedPackageObj.ccCategory})`,
      packagePrice: selectedPackageObj.price,
      date,
      time,
      address: address.trim(),
      specialRequest: specialRequest.trim() || 'None',
      status: 'New',
      createdDate: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    onCreateBooking(newBooking);
    setConfirmedBooking(newBooking);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ==========================================================================
  // STEP 1 GATE: MANDATORY CUSTOMER EMAIL LOGIN BEFORE SERVICE BOOKING
  // Matches the user's reference screenshot with official logo on top
  // ==========================================================================
  if (!customerAccount) {
    return (
      <div className="min-h-[76vh] flex flex-col items-center justify-center py-10 px-4 text-black">
        <div className="w-full max-w-md mx-auto flex flex-col items-center text-center">
          {/* Official SAHAJ CAPITAL AUTOMOBILE Logo at the top */}
          <div className="mb-7">
            <BrandLogo variant="card" showTagline={false} />
          </div>

          {/* Heading & Subheading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-sm sm:text-base font-medium text-neutral-500 mt-2 mb-8">
            {authMode === 'login'
              ? 'Login to your account'
              : 'Sign up with your Email Id to book service'}
          </p>

          {loginError && (
            <div
              role="alert"
              className="w-full mb-5 p-3.5 rounded-2xl bg-red-50 border border-[#DC2626] text-xs font-bold text-black flex items-start gap-2.5 text-left"
            >
              <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form
            onSubmit={handleCustomerLoginSubmit}
            className="w-full space-y-5"
          >
            {authMode === 'signup' && (
              <div className="relative flex items-center w-full">
                <div className="w-11 h-11 rounded-full bg-white shadow-xs border border-neutral-100 flex items-center justify-center absolute left-3 pointer-events-none">
                  <User className="w-5 h-5 text-neutral-500" />
                </div>
                <input
                  id="customerLoginName"
                  type="text"
                  required
                  value={loginName}
                  onChange={(e) => {
                    setLoginName(e.target.value);
                    if (loginError) setLoginError('');
                  }}
                  placeholder="Full Name"
                  aria-label="Full Name"
                  className="w-full h-16 pl-18 pr-6 rounded-3xl border border-neutral-300 bg-white/90 focus:bg-white text-base text-black font-medium placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626] transition-all"
                />
              </div>
            )}

            {/* Email Id Input matching screenshot with CustomerLoginIcon */}
            <div className="relative flex items-center w-full">
              <div className="w-11 h-11 rounded-full bg-white shadow-xs border border-neutral-100 flex items-center justify-center absolute left-3 pointer-events-none">
                <CustomerLoginIcon className="w-5 h-5" />
              </div>
              <input
                id="customerLoginEmail"
                type="email"
                required
                value={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                  if (loginError) setLoginError('');
                }}
                placeholder="Email Id"
                aria-label="Email Id"
                className="w-full h-16 pl-18 pr-6 rounded-3xl border border-neutral-300 bg-white/90 focus:bg-white text-base text-black font-medium placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626] transition-all"
              />
            </div>

            {authMode === 'signup' && (
              <div className="relative flex items-center w-full">
                <div className="w-11 h-11 rounded-full bg-white shadow-xs border border-neutral-100 flex items-center justify-center absolute left-3 pointer-events-none">
                  <CallIcon className="w-4 h-4" />
                </div>
                <input
                  id="customerLoginPhone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={loginPhone}
                  onChange={(e) => {
                    setLoginPhone(e.target.value.replace(/\D/g, ''));
                    if (loginError) setLoginError('');
                  }}
                  placeholder="Mobile Number (10 digits)"
                  aria-label="Mobile Number"
                  className="w-full h-16 pl-18 pr-6 rounded-3xl border border-neutral-300 bg-white/90 focus:bg-white text-base text-black font-medium placeholder:text-neutral-400 tabular-nums focus:outline-none focus:ring-2 focus:ring-[#DC2626] transition-all"
                />
              </div>
            )}

            {/* Bold Red Pill Button matching screenshot */}
            <button
              type="submit"
              disabled={isSubmittingAuth}
              className="w-full h-16 rounded-3xl bg-[#E60000] hover:bg-[#CC0000] active:scale-[0.99] text-white font-bold text-lg tracking-wide flex items-center justify-center transition-all cursor-pointer shadow-md disabled:opacity-75"
            >
              <span>
                {isSubmittingAuth
                  ? 'Verifying...'
                  : authMode === 'login'
                  ? 'Login'
                  : 'Sign Up'}
              </span>
            </button>
          </form>

          {/* Bottom Toggle Link matching screenshot */}
          <p className="mt-7 text-sm sm:text-base font-medium text-neutral-500">
            {authMode === 'login' ? (
              <>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setLoginError('');
                  }}
                  className="font-bold text-[#D91B1B] hover:underline cursor-pointer"
                >
                  Sign up here
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setLoginError('');
                  }}
                  className="font-bold text-[#D91B1B] hover:underline cursor-pointer"
                >
                  Login here
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // SCREEN: PROFESSIONAL BOOKING CONFIRMATION
  // ==========================================================================
  if (confirmedBooking) {
    const whatsappConfirmationText = encodeURIComponent(
      `Hello ${BUSINESS_CONFIG.name}, I have booked a service!\n\n` +
        `Booking Reference: *${confirmedBooking.bookingId}*\n` +
        `Customer ID: *${confirmedBooking.customerId || customerAccount.id || 'N/A'}*\n` +
        `Name: ${confirmedBooking.customerName}\n` +
        `Email: ${confirmedBooking.customerEmail || customerAccount.email}\n` +
        `Phone: +91 ${confirmedBooking.phoneNumber}\n` +
        `Vehicle: ${confirmedBooking.brand} ${confirmedBooking.model} (${confirmedBooking.registrationNumber})\n` +
        `Service: ${confirmedBooking.service} - ${confirmedBooking.packageName}\n` +
        `Preferred Slot: ${confirmedBooking.date} (${confirmedBooking.time})\n` +
        `Address: ${confirmedBooking.address}`
    );

    return (
      <div className="py-6 sm:py-10 max-w-2xl mx-auto pb-12 text-black">
        <div className="bg-white rounded-3xl border-2 border-[#DC2626] p-6 sm:p-10 shadow-xs text-center">
          {/* Official Brand Logo */}
          <div className="flex justify-center mb-6">
            <BrandLogo variant="card" />
          </div>

          {/* Success Icon */}
          <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-[#DC2626] text-[#DC2626] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <p className="text-xs font-extrabold uppercase tracking-wider text-black mb-1">
            Booking Confirmed
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-black">
            Your service request has been received successfully.
          </h1>
          <p className="text-sm text-black font-medium mt-2 max-w-md mx-auto">
            Our service coordinator at {BUSINESS_CONFIG.name} will call you
            shortly to confirm technician assignment.
          </p>

          {/* Booking Reference Box */}
          <div className="my-6 p-4 rounded-2xl bg-red-50 border border-red-300 inline-flex flex-col items-center min-w-[240px]">
            <span className="text-xs font-bold text-black">
              Booking Reference Number
            </span>
            <span className="text-2xl font-extrabold font-mono text-black tracking-wider mt-0.5 tabular-nums">
              {confirmedBooking.bookingId}
            </span>
          </div>

          {/* Summary Details Card */}
          <div className="text-left bg-neutral-50 rounded-2xl border border-neutral-300 p-5 sm:p-6 space-y-4 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-3 gap-2">
              <div>
                <span className="text-xs font-bold text-black block">
                  Customer Account
                </span>
                <span className="text-sm font-extrabold text-black block">
                  {confirmedBooking.customerName} · +91{' '}
                  {confirmedBooking.phoneNumber}
                </span>
                <span className="text-xs font-bold text-black block">
                  Email: {confirmedBooking.customerEmail || customerAccount.email}
                </span>
              </div>
              <span className="text-xs font-extrabold text-black">
                Status: {confirmedBooking.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-bold text-black block">
                  Selected Vehicle
                </span>
                <span className="text-sm font-extrabold text-black block">
                  {confirmedBooking.brand} {confirmedBooking.model} (
                  {confirmedBooking.vehicleType})
                </span>
                <span className="text-xs font-mono font-bold text-black">
                  Reg No: {confirmedBooking.registrationNumber}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-black block">
                  Selected Service &amp; Package
                </span>
                <span className="text-sm font-extrabold text-black block">
                  {confirmedBooking.service}
                </span>
                <span className="text-xs text-black font-bold">
                  {confirmedBooking.packageName} (Starting ₹
                  {confirmedBooking.packagePrice})
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-black block">
                  Preferred Date &amp; Time Slot
                </span>
                <span className="text-sm font-extrabold text-black block tabular-nums">
                  {confirmedBooking.date}
                </span>
                <span className="text-xs text-black font-bold">
                  {confirmedBooking.time}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-black block">
                  Service Location / Address
                </span>
                <span className="text-sm font-extrabold text-black block">
                  {confirmedBooking.address}
                </span>
              </div>
            </div>

            {confirmedBooking.specialRequest &&
              confirmedBooking.specialRequest !== 'None' && (
                <div className="pt-3 border-t border-neutral-200">
                  <span className="text-xs font-bold text-black block">
                    Special Request / Notes
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-black">
                    {confirmedBooking.specialRequest}
                  </span>
                </div>
              )}

            {/* Assigned Mechanic in confirmation if set */}
            {confirmedBooking.assignedMechanicName && (
              <div className="pt-3 border-t border-neutral-200">
                <div className="p-3.5 rounded-xl bg-red-50 border border-[#DC2626] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#DC2626] flex items-center justify-center shrink-0">
                      <Wrench className="w-4 h-4 text-[#DC2626]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 block">
                        Assigned Doorstep Mechanic
                      </span>
                      <span className="text-sm font-extrabold text-black">
                        {confirmedBooking.assignedMechanicName}
                      </span>
                      <span className="text-xs font-semibold text-neutral-600 block">
                        Work par aane wale mechanic
                      </span>
                    </div>
                  </div>

                  {confirmedBooking.assignedMechanicPhone && (
                    <a
                      href={`tel:+91${confirmedBooking.assignedMechanicPhone}`}
                      className="px-3 py-1.5 rounded-lg bg-[#DC2626] text-white font-extrabold text-xs inline-flex items-center gap-1.5 shadow-2xs self-start sm:self-center"
                    >
                      <CallIcon className="w-3.5 h-3.5" />
                      <span>Call Mechanic</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Required Action Buttons: Call Us, WhatsApp Us, Back to Home */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="min-h-[48px] px-5 py-3 rounded-xl bg-[#DC2626] hover:bg-red-700 border border-red-800 text-black font-extrabold text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <CallIcon className="w-4 h-4" />
              <span>Call Us</span>
            </a>

            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${whatsappConfirmationText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] px-5 py-3 rounded-xl bg-red-100 hover:bg-red-200 border border-[#DC2626] text-black font-extrabold text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>WhatsApp Us</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setConfirmedBooking(null);
                onBackToHome();
              }}
              className="min-h-[48px] px-5 py-3 rounded-xl border border-neutral-400 hover:bg-neutral-100 text-black font-extrabold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Home className="w-4 h-4 shrink-0 text-black" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // STEP 2: BOOK NOW FORM (UNLOCKED AFTER CUSTOMER EMAIL LOGIN)
  // ==========================================================================
  return (
    <div className="py-5 sm:py-8 max-w-3xl mx-auto pb-12 text-black space-y-6">
      {/* Logged-In Customer Account Strip */}
      <div className="bg-red-50/90 rounded-2xl border-2 border-[#DC2626] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#DC2626] text-black font-extrabold flex items-center justify-center shrink-0">
            <CustomerLoginIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-black block">
              Logged in Customer Account
            </span>
            <span className="text-sm font-extrabold text-black block">
              {customerAccount.name} ({customerAccount.email})
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onCustomerLogout}
          className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-300 text-xs font-extrabold text-black inline-flex items-center gap-1.5 self-start sm:self-center cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 text-[#DC2626]" />
          <span>Switch Email / Logout</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-neutral-300 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#DC2626] inline-block" />
            <span>STEP 2 OF 2 · DOORSTEP &amp; WORKSHOP SERVICE BOOKING</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-black">
            Book Your Service
          </h1>
          <p className="text-sm sm:text-base text-black font-medium mt-1">
            Get professional automobile service at your convenience.
          </p>
        </div>
        <BrandLogo variant="compact" className="self-start sm:self-center" />
      </div>

      {/* Booking Form Card */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white rounded-3xl border border-neutral-300 p-5 sm:p-8 space-y-6"
      >
        {/* Error summary alert if validation fails */}
        {Object.keys(errors).length > 0 && (
          <div
            role="alert"
            className="p-4 rounded-2xl bg-red-50 border-2 border-[#DC2626] text-black flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-black">
              <strong className="font-extrabold block">
                Please check the highlighted fields below:
              </strong>
              <span className="font-medium">
                Fill in all required contact, vehicle, and schedule details to
                complete your booking.
              </span>
            </div>
          </div>
        )}

        {/* SECTION A: CUSTOMER DETAILS */}
        <div>
          <h2 className="text-base font-extrabold text-black pb-2 border-b border-neutral-200 mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-[#DC2626]" />
            <span>1. Customer Contact Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Field 1: Customer Name */}
            <div>
              <label
                htmlFor="customerName"
                className="block text-xs sm:text-sm font-extrabold text-black mb-1.5"
              >
                Customer Name <span className="text-[#DC2626]">*</span>
              </label>
              <input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  if (errors.customerName)
                    setErrors({ ...errors, customerName: undefined });
                }}
                placeholder="Enter your name"
                className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl border text-sm text-black font-medium placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#DC2626] transition-all ${
                  errors.customerName
                    ? 'border-[#DC2626] bg-red-50/40'
                    : 'border-neutral-300 bg-neutral-50/50 focus:bg-white'
                }`}
              />
              {errors.customerName && (
                <p className="text-xs text-black font-bold mt-1">
                  • {errors.customerName}
                </p>
              )}
            </div>

            {/* Verified Login Email (Read-only) */}
            <div>
              <label
                htmlFor="customerEmailReadonly"
                className="block text-xs sm:text-sm font-extrabold text-black mb-1.5"
              >
                Logged-in Email ID
              </label>
              <input
                id="customerEmailReadonly"
                type="email"
                readOnly
                value={customerAccount.email}
                className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-neutral-300 bg-neutral-100 text-sm text-black font-bold cursor-not-allowed"
              />
            </div>

            {/* Field 2: Mobile Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-xs sm:text-sm font-extrabold text-black mb-1.5"
              >
                Mobile Number <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-sm font-extrabold text-black select-none">
                  +91
                </span>
                <input
                  id="phoneNumber"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={phoneNumber}
                  onChange={(e) => {
                    const digitsOnly = e.target.value.replace(/\D/g, '');
                    setPhoneNumber(digitsOnly);
                    if (errors.phoneNumber)
                      setErrors({ ...errors, phoneNumber: undefined });
                  }}
                  placeholder="Enter phone number"
                  className={`w-full min-h-[48px] pl-12 pr-10 py-2.5 rounded-xl border text-sm text-black font-medium placeholder:text-neutral-500 tabular-nums focus:outline-none focus:ring-2 focus:ring-[#DC2626] transition-all ${
                    errors.phoneNumber
                      ? 'border-[#DC2626] bg-red-50/40'
                      : 'border-neutral-300 bg-neutral-50/50 focus:bg-white'
                  }`}
                />
                <div className="absolute right-3.5 pointer-events-none flex items-center">
                  <CallIcon className="w-4 h-4" />
                </div>
              </div>
              {errors.phoneNumber && (
                <p className="text-xs text-black font-bold mt-1">
                  • {errors.phoneNumber}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION B: VEHICLE DETAILS */}
        <div>
          <h2 className="text-base font-extrabold text-black pb-2 border-b border-neutral-200 mb-4 flex items-center gap-2">
            <Car className="w-4 h-4 text-[#DC2626]" />
            <span>2. Vehicle Information</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Field 3: Vehicle Type */}
            <div>
              <label
                htmlFor="vehicleType"
                className="block text-xs sm:text-sm font-extrabold text-black mb-1.5"
              >
                Vehicle Type <span className="text-[#DC2626]">*</span>
              </label>
              <select
                id="vehicleType"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-neutral-300 bg-neutral-50/50 focus:bg-white text-sm text-black font-semibold focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
              >
                {VEHICLE_TYPES.map((vt) => (
                  <option key={vt} value={vt}>
                    {vt}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 4: Vehicle Brand */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="vehicleBrand"
                  className="block text-xs sm:text-sm font-extrabold text-black"
                >
                  Vehicle Brand <span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative">
                  <Search className="w-3 h-3 text-black absolute left-2 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    placeholder="Filter brand..."
                    aria-label="Filter vehicle brands"
                    className="pl-6 pr-2 py-0.5 text-xs rounded-lg border border-neutral-300 bg-neutral-50 text-black font-medium w-28 focus:outline-none focus:border-[#DC2626]"
                  />
                </div>
              </div>
              <select
                id="vehicleBrand"
                value={brand}
                onChange={(e) => handleBrandChange(e.target.value)}
                className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-neutral-300 bg-neutral-50/50 focus:bg-white text-sm text-black font-semibold focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
              >
                {filteredBrands.map((vb) => (
                  <option key={vb} value={vb}>
                    {vb}
                  </option>
                ))}
                {!filteredBrands.includes(brand as any) && (
                  <option value={brand}>{brand}</option>
                )}
              </select>
            </div>

            {/* Field 5: Vehicle Model */}
            <div>
              <label
                htmlFor="vehicleModel"
                className="block text-xs sm:text-sm font-extrabold text-black mb-1.5"
              >
                Vehicle Model <span className="text-[#DC2626]">*</span>
              </label>
              <input
                id="vehicleModel"
                list="brand-models-list"
                type="text"
                value={model}
                onChange={(e) => {
                  setModel(e.target.value);
                  if (errors.model) setErrors({ ...errors, model: undefined });
                }}
                placeholder={`Search or type ${brand} model (e.g. ${
                  availableModels[0] || 'Splendor / Classic 350'
                })`}
                className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl border text-sm text-black font-medium placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#DC2626] transition-all ${
                  errors.model
                    ? 'border-[#DC2626] bg-red-50/40'
                    : 'border-neutral-300 bg-neutral-50/50 focus:bg-white'
                }`}
              />
              <datalist id="brand-models-list">
                {availableModels.map((m) => (
                  <option key={m} value={m} />
                ))}
              </datalist>
              {availableModels.length > 0 && (
                <div className="mt-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  <span className="text-[11px] font-bold text-black shrink-0">
                    Popular:
                  </span>
                  {availableModels.slice(0, 4).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setModel(m);
                        if (errors.model)
                          setErrors({ ...errors, model: undefined });
                      }}
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md border transition-colors whitespace-nowrap cursor-pointer ${
                        model === m
                          ? 'bg-[#DC2626] text-black border-red-800'
                          : 'bg-neutral-100 text-black border-neutral-300 hover:bg-red-50'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
              {errors.model && (
                <p className="text-xs text-black font-bold mt-1">
                  • {errors.model}
                </p>
              )}
            </div>

            {/* Field 6: Vehicle Registration Number */}
            <div>
              <label
                htmlFor="registrationNumber"
                className="block text-xs sm:text-sm font-extrabold text-black mb-1.5"
              >
                Vehicle Registration Number{' '}
                <span className="text-[#DC2626]">*</span>
              </label>
              <input
                id="registrationNumber"
                type="text"
                value={registrationNumber}
                onChange={(e) => {
                  setRegistrationNumber(e.target.value.toUpperCase());
                  if (errors.registrationNumber)
                    setErrors({ ...errors, registrationNumber: undefined });
                }}
                placeholder="Enter vehicle number"
                className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl border text-sm font-mono font-bold uppercase text-black placeholder:font-sans placeholder:normal-case placeholder:font-normal placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#DC2626] transition-all ${
                  errors.registrationNumber
                    ? 'border-[#DC2626] bg-red-50/40'
                    : 'border-neutral-300 bg-neutral-50/50 focus:bg-white'
                }`}
              />
              {errors.registrationNumber && (
                <p className="text-xs text-black font-bold mt-1">
                  • {errors.registrationNumber}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION C: SERVICE & PACKAGE SELECTION */}
        <div>
          <h2 className="text-base font-extrabold text-black pb-2 border-b border-neutral-200 mb-4 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-[#DC2626]" />
            <span>3. Service Type &amp; Package</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Field 7: Service Type */}
            <div>
              <label
                htmlFor="serviceType"
                className="block text-xs sm:text-sm font-extrabold text-black mb-1.5"
              >
                Service Type <span className="text-[#DC2626]">*</span>
              </label>
              <select
                id="serviceType"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-neutral-300 bg-neutral-50/50 focus:bg-white text-sm text-black font-semibold focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
              >
                {SERVICE_TYPES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 8: Service Package Dropdown */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="servicePackage"
                  className="block text-xs sm:text-sm font-extrabold text-black"
                >
                  Service Package <span className="text-[#DC2626]">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => onOpenChecklistById(packageId)}
                  className="text-xs font-extrabold text-black hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>View Checklist</span>
                </button>
              </div>
              <select
                id="servicePackage"
                value={packageId}
                onChange={(e) => setPackageId(e.target.value)}
                className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-neutral-300 bg-neutral-50/50 focus:bg-white text-sm text-black font-semibold focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
              >
                {SERVICE_PACKAGES.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} ({pkg.ccCategory}) — Starting ₹{pkg.price}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Interactive Package Preview Strip */}
          <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-extrabold text-black">
                Selected: {selectedPackageObj.name} ·{' '}
                {selectedPackageObj.ccCategory}
              </div>
              <p className="text-xs text-black font-medium mt-0.5">
                Includes: {selectedPackageObj.summaryPoints.join(' · ')}
              </p>
            </div>
            <div className="sm:text-right shrink-0">
              <span className="text-xs font-bold text-black block">
                Package Labour Estimate
              </span>
              <span className="text-lg font-extrabold text-black tabular-nums">
                Starting from ₹{selectedPackageObj.price}
              </span>
            </div>
          </div>
        </div>

        {/* SECTION D: DATE, TIME SLOT & ADDRESS */}
        <div>
          <h2 className="text-base font-extrabold text-black pb-2 border-b border-neutral-200 mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#DC2626]" />
            <span>4. Schedule &amp; Doorstep Address</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Field 9: Preferred Date */}
            <div>
              <label
                htmlFor="preferredDate"
                className="block text-xs sm:text-sm font-extrabold text-black mb-1.5"
              >
                Preferred Date <span className="text-[#DC2626]">*</span>
              </label>
              <input
                id="preferredDate"
                type="date"
                min={todayStr}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  if (errors.date) setErrors({ ...errors, date: undefined });
                }}
                className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-neutral-300 bg-neutral-50/50 focus:bg-white text-sm text-black font-semibold tabular-nums focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
              />
              {errors.date && (
                <p className="text-xs text-black font-bold mt-1">
                  • {errors.date}
                </p>
              )}
            </div>

            {/* Field 10: Preferred Time Slot */}
            <div>
              <label
                htmlFor="preferredTimeSlot"
                className="block text-xs sm:text-sm font-extrabold text-black mb-1.5"
              >
                Preferred Time Slot <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative">
                <select
                  id="preferredTimeSlot"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-neutral-300 bg-neutral-50/50 focus:bg-white text-sm text-black font-semibold focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                >
                  {PREFERRED_TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Time Slot Buttons */}
          <div className="mb-5">
            <span className="text-xs font-bold text-black mb-2 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Quick Select Time Slot:</span>
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {PREFERRED_TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={`min-h-[42px] px-3 py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer whitespace-nowrap ${
                    time === slot
                      ? 'bg-[#DC2626] text-black border-red-800 shadow-xs'
                      : 'bg-neutral-50 text-black border-neutral-300 hover:bg-red-50'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Field 11: Service Location / Address */}
          <div className="mb-4">
            <label
              htmlFor="serviceAddress"
              className="block text-xs sm:text-sm font-extrabold text-black mb-1.5"
            >
              Service Location / Address <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#DC2626] absolute left-3.5 top-3.5 pointer-events-none" />
              <textarea
                id="serviceAddress"
                rows={2}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (errors.address)
                    setErrors({ ...errors, address: undefined });
                }}
                placeholder="Enter your city or complete address"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-black font-medium placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#DC2626] transition-all ${
                  errors.address
                    ? 'border-[#DC2626] bg-red-50/40'
                    : 'border-neutral-300 bg-neutral-50/50 focus:bg-white'
                }`}
              />
            </div>
            {errors.address && (
              <p className="text-xs text-black font-bold mt-1">
                • {errors.address}
              </p>
            )}
          </div>

          {/* Field 12: Special Request */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="specialRequest"
                className="block text-xs sm:text-sm font-extrabold text-black"
              >
                Special Request (Optional)
              </label>
            </div>
            <textarea
              id="specialRequest"
              rows={3}
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              placeholder="Describe your problem or special request..."
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-neutral-50/50 focus:bg-white text-sm text-black font-medium placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#DC2626] transition-all"
            />
          </div>
        </div>

        {/* MANDATORY TERMS OF SERVICE CHECKBOX & PAYMENT BUTTON */}
        <div className="pt-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-red-50/70 border border-red-200">
            <label
              htmlFor="bookingFormTermsCheckbox"
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <input
                id="bookingFormTermsCheckbox"
                type="checkbox"
                checked={agreedToTermsInForm}
                onChange={(e) => setAgreedToTermsInForm(e.target.checked)}
                className="w-5 h-5 accent-[#DC2626] rounded cursor-pointer shrink-0"
              />
              <span className="text-xs sm:text-sm font-semibold text-black">
                Yes, I agree to the{' '}
                <strong className="font-extrabold underline">
                  Terms &amp; Conditions
                </strong>
              </span>
            </label>

            {/* Payment Button right where Terms & Conditions is */}
            <button
              type="button"
              onClick={() => {
                setPayModalInfo({
                  amount: selectedPackageObj.price,
                });
                setIsPayModalOpen(true);
              }}
              className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-white hover:bg-red-50 border border-[#DC2626] text-black text-xs font-extrabold inline-flex items-center gap-1.5 self-start sm:self-center cursor-pointer shadow-2xs whitespace-nowrap"
            >
              <QrCode className="w-4 h-4 text-[#DC2626]" />
              <span>Scan &amp; Pay via QR</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={!agreedToTermsInForm}
            className={`w-full min-h-[54px] py-4 px-6 rounded-2xl font-extrabold text-base tracking-wide uppercase flex items-center justify-center gap-2 transition-all border ${
              agreedToTermsInForm
                ? 'bg-[#DC2626] hover:bg-red-700 active:scale-[0.99] text-black shadow-md border-red-800 cursor-pointer'
                : 'bg-neutral-200 border-neutral-300 text-neutral-500 opacity-60 cursor-not-allowed'
            }`}
          >
            <span>Book Now</span>
          </button>
          <p className="text-center text-xs font-bold text-black mt-2">
            No advance payment required now · Pay after service completion
          </p>
        </div>
      </form>

      {/* Customer's Previous Bookings Linked to Email ID */}
      {myBookings.length > 0 && (
        <div className="bg-white rounded-3xl border border-neutral-300 p-5 sm:p-7 space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-200 pb-3">
            <ClipboardList className="w-5 h-5 text-[#DC2626]" />
            <h2 className="text-base sm:text-lg font-extrabold text-black">
              My Bookings ({customerAccount.email})
            </h2>
          </div>

          <div className="space-y-4">
            {myBookings.map((b) => (
              <div
                key={b.bookingId}
                className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-300 space-y-3 text-xs text-black"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-2.5">
                  <div>
                    <span className="font-mono font-extrabold text-sm text-[#DC2626]">
                      {b.bookingId}
                    </span>{' '}
                    ·{' '}
                    <strong className="font-extrabold">
                      {b.brand} {b.model} ({b.registrationNumber})
                    </strong>
                    <p className="font-semibold mt-0.5 text-neutral-700">
                      {b.service} — {b.packageName} (₹{b.packagePrice}) · Slot: {b.date} ({b.time})
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-red-100 border border-[#DC2626] font-extrabold self-start sm:self-center">
                    Status: {b.status}
                  </span>
                </div>

                {/* Assigned Mechanic Highlight for Customer */}
                <div className="p-3.5 rounded-xl bg-white border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-50 border border-[#DC2626] flex items-center justify-center shrink-0">
                      <Wrench className="w-4 h-4 text-[#DC2626]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 block">
                        Assigned Doorstep Mechanic
                      </span>
                      {b.assignedMechanicName ? (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-extrabold text-black">
                            {b.assignedMechanicName}
                          </span>
                          <span className="text-xs font-semibold text-neutral-600">
                            · Work par aane wale mechanic
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-neutral-600">
                          Mechanic assignment in progress · Will be assigned shortly
                        </span>
                      )}
                    </div>
                  </div>

                  {b.assignedMechanicPhone && (
                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <a
                        href={`tel:+91${b.assignedMechanicPhone}`}
                        className="px-3 py-1.5 rounded-lg bg-[#DC2626] hover:bg-red-700 text-white font-extrabold text-xs inline-flex items-center gap-1.5 shadow-2xs"
                      >
                        <CallIcon className="w-3.5 h-3.5" />
                        <span>Call Mechanic</span>
                      </a>
                      <a
                        href={`https://wa.me/91${b.assignedMechanicPhone}?text=${encodeURIComponent(
                          `Hello ${b.assignedMechanicName}, regarding my booking ${b.bookingId} for ${b.brand} ${b.model}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs inline-flex items-center gap-1.5 shadow-2xs"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Address & Pay QR Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs">
                  <span className="font-semibold text-neutral-500">
                    Address: {b.address}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setPayModalInfo({
                        ref: b.bookingId,
                        amount: b.packagePrice,
                      });
                      setIsPayModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-red-50 border border-[#DC2626] text-black font-extrabold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-2xs self-start sm:self-auto"
                  >
                    <QrCode className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Pay via QR (₹{b.packagePrice})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment QR Modal */}
      <PaymentQRModal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        bookingRef={payModalInfo?.ref}
        amount={payModalInfo?.amount}
      />
    </div>
  );
};
