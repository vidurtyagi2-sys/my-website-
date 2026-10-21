/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Home,
  CalendarPlus,
  Wrench,
  PhoneCall,
  UserCheck,
  X,
  MessageCircle,
  MapPin,
  Lock,
  Mail,
  LogOut,
  ArrowUp,
  QrCode,
} from 'lucide-react';
import {
  BUSINESS_CONFIG,
  SERVICE_PACKAGES,
  INITIAL_MOCK_BOOKINGS,
  INITIAL_MECHANICS,
  ServiceItem,
  ServicePackage,
  BookingRecord,
  BookingStatus,
  CustomerAccount,
  SocialLinks,
  MechanicRecord,
  BookingPushAlert,
} from './config/siteConfig';
import { BrandLogo } from './components/BrandLogo';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { CallIcon } from './components/CallIcon';
import { CustomerLoginIcon } from './components/CustomerLoginIcon';
import { AdminTeamIcon } from './components/AdminTeamIcon';
import {
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
  LinkedInIcon,
} from './components/SocialMediaIcons';
import { HomeView } from './components/HomeView';
import { BookingView } from './components/BookingView';
import { PackagesView } from './components/PackagesView';
import { ContactView } from './components/ContactView';
import { ServiceChecklistModal } from './components/ServiceChecklistModal';
import { AdminPortalView } from './components/AdminPortalView';
import { LegalModal, LegalModalType } from './components/LegalModals';
import { PaymentQRModal } from './components/PaymentQRModal';
import { playNotificationChime } from './components/AdminPushNotificationSystem';
import { api } from './config/api';

type ActiveTab = 'home' | 'book' | 'packages' | 'contact' | 'admin-login';

const STORAGE_KEY = 'sahaj_capital_automobile_bookings_v1';
const CUSTOMER_AUTH_KEY = 'sahaj_capital_customer_email_auth_v1';
const SOCIAL_LINKS_STORAGE_KEY = 'sahaj_capital_social_links_v1';
const MECHANICS_STORAGE_KEY = 'sahaj_capital_automobile_mechanics_v1';
const PUSH_NOTIFICATIONS_STORAGE_KEY = 'sca_admin_push_notifications_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [legalModalType, setLegalModalType] = useState<LegalModalType>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

  const [socialLinks, setSocialLinks] = useState<SocialLinks>(() => {
    try {
      const saved = localStorage.getItem(SOCIAL_LINKS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            facebook: parsed.facebook || BUSINESS_CONFIG.socialLinks.facebook,
            instagram:
              parsed.instagram || BUSINESS_CONFIG.socialLinks.instagram,
            youtube: parsed.youtube || BUSINESS_CONFIG.socialLinks.youtube,
            linkedin: parsed.linkedin || BUSINESS_CONFIG.socialLinks.linkedin,
          };
        }
      }
    } catch {
      // Ignore storage error
    }
    return BUSINESS_CONFIG.socialLinks;
  });

  const handleUpdateSocialLinks = (updated: SocialLinks) => {
    setSocialLinks(updated);
    try {
      localStorage.setItem(SOCIAL_LINKS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage error
    }
  };

  const [customerAccount, setCustomerAccount] =
    useState<CustomerAccount | null>(() => {
      try {
        const saved = localStorage.getItem(CUSTOMER_AUTH_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.email) return parsed;
        }
      } catch {
        // Ignore storage error
      }
      return null;
    });

  const handleCustomerLogin = (account: CustomerAccount) => {
    setCustomerAccount(account);
    try {
      localStorage.setItem(CUSTOMER_AUTH_KEY, JSON.stringify(account));
    } catch {
      // Ignore
    }
  };

  const handleCustomerLogout = () => {
    setCustomerAccount(null);
    try {
      localStorage.removeItem(CUSTOMER_AUTH_KEY);
    } catch {
      // Ignore
    }
  };

  const [selectedServiceType, setSelectedServiceType] =
    useState<string>('General Service');
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    'basic-bike-service'
  );
  const [specialOfferApplied, setSpecialOfferApplied] =
    useState<boolean>(false);

  const [checklistModalPkg, setChecklistModalPkg] =
    useState<ServicePackage | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 180) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_MOCK_BOOKINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch {
      // Ignore storage quota errors
    }
  }, [bookings]);

  const [mechanics, setMechanics] = useState<MechanicRecord[]>(() => {
    try {
      const saved = localStorage.getItem(MECHANICS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore
    }
    return INITIAL_MECHANICS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(MECHANICS_STORAGE_KEY, JSON.stringify(mechanics));
    } catch {
      // Ignore
    }
  }, [mechanics]);

  // Real-time Push Notifications for Admin Panel (Clean, no fake dummy leads)
  const [pushNotifications, setPushNotifications] = useState<
    BookingPushAlert[]
  >(() => {
    try {
      const saved = localStorage.getItem(PUSH_NOTIFICATIONS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        PUSH_NOTIFICATIONS_STORAGE_KEY,
        JSON.stringify(pushNotifications)
      );
    } catch {
      // Ignore
    }
  }, [pushNotifications]);

  const [isPushingActive, setIsPushingActive] = useState<boolean>(false);
  const [latestActiveAlert, setLatestActiveAlert] =
    useState<BookingPushAlert | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // 1. Initial server bootstrap synchronization
  useEffect(() => {
    let isMounted = true;
    const loadInitialServerData = async () => {
      const data = await api.getBootstrap();
      if (!isMounted || !data) return;
      if (Array.isArray(data.bookings)) {
        setBookings(data.bookings);
      }
      if (Array.isArray(data.notifications)) {
        setPushNotifications(data.notifications);
      }
      if (Array.isArray(data.mechanics) && data.mechanics.length > 0) {
        setMechanics(data.mechanics);
      }
      if (data.socialLinks) {
        setSocialLinks(data.socialLinks);
      }
    };

    loadInitialServerData();

    // If customer already has session saved in browser, synchronize customerId with server
    if (customerAccount && customerAccount.email) {
      api
        .customerAuth(
          customerAccount.name || '',
          customerAccount.email,
          customerAccount.phoneNumber
        )
        .then((res) => {
          if (isMounted && res?.customer) {
            setCustomerAccount(res.customer);
            try {
              localStorage.setItem(
                CUSTOMER_AUTH_KEY,
                JSON.stringify(res.customer)
              );
            } catch {
              // Ignore
            }
          }
        })
        .catch(() => {});
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Background polling every 3.5s so when ANY customer books on the live site,
  // the Admin Panel gets the booking immediately and rings the push alert chime!
  useEffect(() => {
    let isMounted = true;

    const interval = setInterval(async () => {
      try {
        const [freshBookings, freshNotifs] = await Promise.all([
          api.getBookings(),
          api.getNotifications(),
        ]);

        if (!isMounted) return;

        if (Array.isArray(freshBookings)) {
          setBookings((prev) => {
            const prevIds = new Set(prev.map((b) => b.bookingId));
            const newArrivals = freshBookings.filter(
              (b) => !prevIds.has(b.bookingId)
            );

            // Real customer booking arrived!
            if (newArrivals.length > 0 && prev.length > 0) {
              playNotificationChime();
              setIsPushingActive(true);
              const newest = newArrivals[0];
              const matching = freshNotifs.find(
                (n) => n.bookingId === newest.bookingId
              );
              if (matching) {
                setLatestActiveAlert(matching);
              }
              if (
                typeof window !== 'undefined' &&
                'Notification' in window &&
                Notification.permission === 'granted'
              ) {
                try {
                  new Notification(`New Customer Booking: ${newest.customerName}`, {
                    body: `${newest.brand} ${newest.model} · ${newest.service} (${newest.time})`,
                    icon: '/favicon.ico',
                  });
                } catch {
                  // Ignore
                }
              }
              setTimeout(() => setIsPushingActive(false), 20000);
            }
            return freshBookings;
          });
        }

        if (Array.isArray(freshNotifs)) {
          setPushNotifications(freshNotifs);
        }
      } catch {
        // Ignore network polling error
      }
    }, 3500);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleRefreshLiveBookings = async () => {
    setIsRefreshing(true);
    try {
      const [freshBookings, freshNotifs] = await Promise.all([
        api.getBookings(),
        api.getNotifications(),
      ]);
      if (Array.isArray(freshBookings)) setBookings(freshBookings);
      if (Array.isArray(freshNotifs)) setPushNotifications(freshNotifs);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleAddMechanic = (newMech: MechanicRecord) => {
    setMechanics((prev) => [newMech, ...prev]);
    api.addMechanic(newMech);
  };

  const handleDeleteMechanic = (mechId: string) => {
    setMechanics((prev) => prev.filter((m) => m.id !== mechId));
    api.deleteMechanic(mechId);
  };

  const handleAssignMechanic = (bookingId: string, mechanicId: string) => {
    const selectedMech = mechanics.find((m) => m.id === mechanicId);
    setBookings((prev) =>
      prev.map((b) => {
        if (b.bookingId === bookingId) {
          return {
            ...b,
            assignedMechanicId: selectedMech ? selectedMech.id : undefined,
            assignedMechanicName: selectedMech ? selectedMech.name : undefined,
            assignedMechanicPhone: selectedMech
              ? selectedMech.phoneNumber
              : undefined,
            status:
              selectedMech && (b.status === 'New' || b.status === 'Confirmed')
                ? 'Assigned'
                : b.status,
          };
        }
        return b;
      })
    );

    setPushNotifications((prev) =>
      prev.map((n) =>
        n.bookingId === bookingId
          ? {
              ...n,
              assignedMechanicName: selectedMech ? selectedMech.name : undefined,
            }
          : n
      )
    );

    api.assignMechanic(bookingId, mechanicId);
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setPushNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    api.markNotificationAsRead(id);
  };

  const handleMarkAllNotificationsAsRead = () => {
    setPushNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setIsPushingActive(false);
    api.markAllNotificationsAsRead();
  };

  const handleClearAllNotifications = () => {
    setPushNotifications([]);
    setIsPushingActive(false);
    setLatestActiveAlert(null);
    api.clearAllNotifications();
  };

  const handleNavigateTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceForBooking = (service: ServiceItem) => {
    setSelectedServiceType(service.serviceTypeValue);
    setSelectedPackageId(service.recommendedPackageId);
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPackageForBooking = (pkg: ServicePackage) => {
    setSelectedServiceType('General Service');
    setSelectedPackageId(pkg.id);
    setChecklistModalPkg(null);
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplySpecialOffer = () => {
    setSpecialOfferApplied(true);
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenChecklistById = (packageId: string) => {
    const found =
      SERVICE_PACKAGES.find((p) => p.id === packageId) || SERVICE_PACKAGES[0];
    setChecklistModalPkg(found);
  };

  const handleCreateBooking = async (newBooking: BookingRecord) => {
    // 1. Post to persistent server
    const res = await api.createBooking(newBooking);
    const savedBooking = res?.booking || newBooking;
    const alert = res?.notification;

    // 2. Update client state
    setBookings((prev) => [
      savedBooking,
      ...prev.filter((b) => b.bookingId !== savedBooking.bookingId),
    ]);

    if (alert) {
      setPushNotifications((prev) => [
        alert,
        ...prev.filter((n) => n.id !== alert.id),
      ]);
      setLatestActiveAlert(alert);
    }

    setIsPushingActive(true);
    playNotificationChime();

    if (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      Notification.permission === 'granted'
    ) {
      try {
        new Notification(`New Booking Received: ${savedBooking.customerName}`, {
          body: `${savedBooking.brand} ${savedBooking.model} · ${savedBooking.service} (${savedBooking.time})`,
          icon: '/favicon.ico',
        });
      } catch {
        // Ignore
      }
    }

    setTimeout(() => {
      setIsPushingActive(false);
    }, 20000);
  };

  const handleUpdateBookingStatus = (
    bookingId: string,
    newStatus: BookingStatus
  ) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.bookingId === bookingId ? { ...b, status: newStatus } : b
      )
    );
    api.updateBookingStatus(bookingId, newStatus);
  };

  const handleDeleteBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
    setPushNotifications((prev) =>
      prev.filter((n) => n.bookingId !== bookingId)
    );
    api.deleteBooking(bookingId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100/60 text-black">
      {/* Centered App Canvas Container with crisp subtle side borders on large viewports and full-bleed on mobile */}
      <div className="min-h-screen flex flex-col bg-neutral-50 text-black max-w-7xl mx-auto w-full shadow-xs border-x border-neutral-200">
        {/* TOP HEADER (3-Zone Contract: Brand Logo/Name — Desktop Nav Links — Right Profile/Action) */}
        <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b-2 border-[#DC2626] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: SAHAJ CAPITAL AUTOMOBILE Official Logo */}
          <button
            type="button"
            onClick={() => handleNavigateTab('home')}
            className="flex items-center text-left cursor-pointer focus:outline-none group"
          >
            <BrandLogo variant="compact" />
          </button>

        {/* Zone 2: Clean Desktop Navigation Links (Home, Book Now, Services / Packages, Contact) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-extrabold text-black"
        >
          <button
            type="button"
            onClick={() => handleNavigateTab('home')}
            className={`py-1 border-b-2 transition-colors cursor-pointer whitespace-nowrap text-black ${
              activeTab === 'home'
                ? 'border-[#DC2626]'
                : 'border-transparent hover:border-red-300'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleNavigateTab('book')}
            className={`py-1 border-b-2 transition-colors cursor-pointer whitespace-nowrap text-black ${
              activeTab === 'book'
                ? 'border-[#DC2626]'
                : 'border-transparent hover:border-red-300'
            }`}
          >
            Book Now
          </button>
          <button
            type="button"
            onClick={() => handleNavigateTab('packages')}
            className={`py-1 border-b-2 transition-colors cursor-pointer whitespace-nowrap text-black ${
              activeTab === 'packages'
                ? 'border-[#DC2626]'
                : 'border-transparent hover:border-red-300'
            }`}
          >
            Services / Packages
          </button>
          <button
            type="button"
            onClick={() => handleNavigateTab('contact')}
            className={`py-1 border-b-2 transition-colors cursor-pointer whitespace-nowrap text-black ${
              activeTab === 'contact'
                ? 'border-[#DC2626]'
                : 'border-transparent hover:border-red-300'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Right Primary Action & Profile/Menu Icon */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleNavigateTab('book')}
            className="inline-flex min-h-[40px] px-3.5 sm:px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-red-700 border border-red-800 text-black font-extrabold text-xs items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shadow-xs"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-black" />
            <span>Book Service</span>
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            className="min-h-[40px] min-w-[40px] sm:min-h-[44px] sm:min-w-[44px] rounded-xl border border-[#DC2626] bg-red-50 hover:bg-red-100 text-black flex items-center justify-center transition-colors cursor-pointer relative"
          >
            <UserCheck className="w-5 h-5 text-black" />
            <span className="sr-only">Navigation Menu</span>
          </button>
        </div>
      </header>

      {/* PROFILE / QUICK MENU DRAWER */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end text-black"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Drawer"
        >
          <div className="bg-white w-full max-w-sm h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto border-l-2 border-[#DC2626]">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-neutral-200">
                <BrandLogo variant="compact" />
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  className="min-h-[44px] min-w-[44px] rounded-xl border border-neutral-300 flex items-center justify-center text-black hover:bg-red-50 cursor-pointer"
                >
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>

              <div className="py-4 border-b border-neutral-200 space-y-2">
                {customerAccount ? (
                  <div className="mt-2 p-3 rounded-xl bg-red-50 border border-[#DC2626] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CustomerLoginIcon className="w-5 h-5" />
                      <div className="min-w-0">
                        <span className="text-[11px] font-extrabold text-black block">
                          Customer Logged In:
                        </span>
                        <span className="text-xs font-extrabold text-black truncate block">
                          {customerAccount.email}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCustomerLogout}
                      className="px-2.5 py-1 rounded-lg bg-white border border-neutral-300 text-[11px] font-extrabold text-black hover:bg-neutral-100 inline-flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      <LogOut className="w-3 h-3 text-[#DC2626]" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleNavigateTab('book')}
                    className="mt-2 w-full py-2.5 px-3 rounded-xl bg-red-50 border border-[#DC2626] text-xs font-extrabold text-black flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CustomerLoginIcon className="w-5 h-5" />
                    <span>Customer Login with Email ID</span>
                  </button>
                )}
              </div>

              {/* Quick Navigation Links inside Drawer */}
              <div className="py-4 space-y-1.5">
                <button
                  type="button"
                  onClick={() => handleNavigateTab('home')}
                  className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl text-left text-sm font-extrabold flex items-center gap-3 transition-colors cursor-pointer ${
                    activeTab === 'home'
                      ? 'bg-[#DC2626] text-black'
                      : 'text-black hover:bg-red-50'
                  }`}
                >
                  <Home className="w-4 h-4 text-black" />
                  <span>Home</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigateTab('book')}
                  className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl text-left text-sm font-extrabold flex items-center gap-3 transition-colors cursor-pointer ${
                    activeTab === 'book'
                      ? 'bg-[#DC2626] text-black'
                      : 'text-black hover:bg-red-50'
                  }`}
                >
                  <CalendarPlus className="w-4 h-4 text-black" />
                  <span>Book Your Service</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigateTab('packages')}
                  className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl text-left text-sm font-extrabold flex items-center gap-3 transition-colors cursor-pointer ${
                    activeTab === 'packages'
                      ? 'bg-[#DC2626] text-black'
                      : 'text-black hover:bg-red-50'
                  }`}
                >
                  <Wrench className="w-4 h-4 text-black" />
                  <span>Service Packages (CC Wise)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigateTab('contact')}
                  className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl text-left text-sm font-extrabold flex items-center gap-3 transition-colors cursor-pointer ${
                    activeTab === 'contact'
                      ? 'bg-[#DC2626] text-black'
                      : 'text-black hover:bg-red-50'
                  }`}
                >
                  <CallIcon className="w-4 h-4" />
                  <span>Contact &amp; Workshop Map</span>
                </button>

                <div className="pt-3 mt-3 border-t border-neutral-200 space-y-2">
                  <button
                    type="button"
                    onClick={() => handleNavigateTab('admin-login')}
                    className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl text-left text-sm font-extrabold flex items-center justify-between transition-colors cursor-pointer ${
                      activeTab === 'admin-login'
                        ? 'bg-[#DC2626] text-black'
                        : 'bg-neutral-100 text-black hover:bg-red-50'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <AdminTeamIcon className="w-5 h-5 text-[#DC2626]" />
                      <span>Admin Login - Staff Only</span>
                    </span>
                  </button>

                  <div className="flex items-center justify-center gap-3 px-2 pt-1 text-xs text-neutral-500">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setLegalModalType('privacy');
                      }}
                      className="hover:text-[#DC2626] underline cursor-pointer text-[11px] font-semibold"
                    >
                      Privacy Policy
                    </button>
                    <span className="text-neutral-300">·</span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setLegalModalType('terms');
                      }}
                      className="hover:text-[#DC2626] underline cursor-pointer text-[11px] font-semibold"
                    >
                      Terms &amp; Conditions
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Helpline Box */}
            <div className="pt-4 border-t border-neutral-200 space-y-3">
              <div className="text-xs text-black pt-1">
                <strong className="font-extrabold text-black block">
                  Need Immediate Assistance?
                </strong>
                <span className="font-semibold">
                  {BUSINESS_CONFIG.workingHours.days}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                  className="min-h-[44px] px-3 py-2 rounded-xl bg-[#DC2626] border border-red-800 text-black font-extrabold text-xs flex items-center justify-center gap-1.5"
                >
                  <CallIcon className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-3 py-2 rounded-xl bg-red-100 border border-[#DC2626] text-black font-extrabold text-xs flex items-center justify-center gap-1.5"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-12">
        {activeTab === 'home' && (
          <HomeView
            onNavigateTab={handleNavigateTab}
            onSelectServiceForBooking={handleSelectServiceForBooking}
            onSelectPackageForBooking={handleSelectPackageForBooking}
            onViewPackageChecklist={(pkg) => setChecklistModalPkg(pkg)}
            onApplySpecialOffer={handleApplySpecialOffer}
          />
        )}

        {activeTab === 'book' && (
          <BookingView
            customerAccount={customerAccount}
            onCustomerLogin={handleCustomerLogin}
            onCustomerLogout={handleCustomerLogout}
            customerBookings={bookings}
            initialServiceType={selectedServiceType}
            initialPackageId={selectedPackageId}
            initialSpecialOfferApplied={specialOfferApplied}
            onCreateBooking={handleCreateBooking}
            onBackToHome={() => handleNavigateTab('home')}
            onOpenChecklistById={handleOpenChecklistById}
          />
        )}

        {activeTab === 'packages' && (
          <PackagesView
            onViewChecklist={(pkg) => setChecklistModalPkg(pkg)}
            onBookPackage={handleSelectPackageForBooking}
          />
        )}

        {activeTab === 'contact' && (
          <ContactView onNavigateBook={() => handleNavigateTab('book')} />
        )}

        {activeTab === 'admin-login' && (
          <AdminPortalView
            bookings={bookings}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onDeleteBooking={handleDeleteBooking}
            onExitAdmin={() => handleNavigateTab('home')}
            socialLinks={socialLinks}
            onUpdateSocialLinks={handleUpdateSocialLinks}
            mechanics={mechanics}
            onAddMechanic={handleAddMechanic}
            onDeleteMechanic={handleDeleteMechanic}
            onAssignMechanic={handleAssignMechanic}
            notifications={pushNotifications}
            onMarkNotificationAsRead={handleMarkNotificationAsRead}
            onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
            onClearAllNotifications={handleClearAllNotifications}
            isPushingActive={isPushingActive}
            latestActiveAlert={latestActiveAlert}
            onDismissToast={() => setLatestActiveAlert(null)}
            onRefreshData={handleRefreshLiveBookings}
            isRefreshing={isRefreshing}
          />
        )}
      </main>

      {/* WELL-ORGANIZED PROFESSIONAL FOOTER */}
      <footer className="bg-white border-t-2 border-[#DC2626] pb-24 md:pb-10 pt-8 sm:pt-10 px-4 sm:px-6 lg:px-8 text-black">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Top 3-Column Structured Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 pb-8 border-b border-neutral-200">
            {/* Section 1: Brand Identity & Corporate Office Address (5 cols) */}
            <div className="lg:col-span-5 bg-neutral-50/70 rounded-2xl p-5 border border-neutral-200 flex flex-col justify-between space-y-4">
              <div className="flex items-start gap-3.5">
                <BrandLogo variant="compact" showTagline={false} />
                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-extrabold text-black leading-tight">
                    {BUSINESS_CONFIG.name}
                  </p>
                  <p className="text-xs font-bold text-[#DC2626] mt-0.5">
                    {BUSINESS_CONFIG.tagline}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-neutral-200/80 text-xs text-black">
                <p className="font-semibold flex items-start gap-2 leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <span>{BUSINESS_CONFIG.address.full}</span>
                </p>
                <p className="font-bold text-black pl-6">
                  {BUSINESS_CONFIG.workingHours.days} · Doorstep:{' '}
                  {BUSINESS_CONFIG.workingHours.doorstepTimings}
                </p>
              </div>
            </div>

            {/* Section 2: Quick Navigation & Direct Helpline (4 cols) */}
            <div className="lg:col-span-4 bg-neutral-50/70 rounded-2xl p-5 border border-neutral-200 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-black mb-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#DC2626] inline-block" />
                  <span>Quick Navigation</span>
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs font-extrabold text-black">
                  <button
                    type="button"
                    onClick={() => handleNavigateTab('home')}
                    className={`min-h-[38px] px-3 py-2 rounded-xl border text-left transition-colors cursor-pointer flex items-center gap-2 ${
                      activeTab === 'home'
                        ? 'bg-[#DC2626] border-red-800 text-black'
                        : 'bg-white border-neutral-300 hover:border-[#DC2626] hover:bg-red-50 text-black'
                    }`}
                  >
                    <Home className="w-3.5 h-3.5 shrink-0" />
                    <span>Home</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavigateTab('book')}
                    className={`min-h-[38px] px-3 py-2 rounded-xl border text-left transition-colors cursor-pointer flex items-center gap-2 ${
                      activeTab === 'book'
                        ? 'bg-[#DC2626] border-red-800 text-black'
                        : 'bg-white border-neutral-300 hover:border-[#DC2626] hover:bg-red-50 text-black'
                    }`}
                  >
                    <CalendarPlus className="w-3.5 h-3.5 shrink-0" />
                    <span>Book Service</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavigateTab('packages')}
                    className={`min-h-[38px] px-3 py-2 rounded-xl border text-left transition-colors cursor-pointer flex items-center gap-2 ${
                      activeTab === 'packages'
                        ? 'bg-[#DC2626] border-red-800 text-black'
                        : 'bg-white border-neutral-300 hover:border-[#DC2626] hover:bg-red-50 text-black'
                    }`}
                  >
                    <Wrench className="w-3.5 h-3.5 shrink-0" />
                    <span>Packages</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavigateTab('contact')}
                    className={`min-h-[38px] px-3 py-2 rounded-xl border text-left transition-colors cursor-pointer flex items-center gap-2 ${
                      activeTab === 'contact'
                        ? 'bg-[#DC2626] border-red-800 text-black'
                        : 'bg-white border-neutral-300 hover:border-[#DC2626] hover:bg-red-50 text-black'
                    }`}
                  >
                    <CallIcon className="w-3.5 h-3.5" />
                    <span>Contact Us</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-200/80 grid grid-cols-2 gap-2 text-xs font-extrabold text-black">
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                  className="min-h-[38px] px-3 py-2 rounded-xl bg-red-50 border border-red-200 hover:border-[#DC2626] text-black flex items-center justify-center gap-1.5 transition-colors tabular-nums"
                >
                  <CallIcon className="w-3.5 h-3.5" />
                  <span>{BUSINESS_CONFIG.phoneDisplay}</span>
                </a>
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[38px] px-3 py-2 rounded-xl bg-red-50 border border-red-200 hover:border-[#DC2626] text-black flex items-center justify-center gap-1.5 transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Section 3: Admin & Staff Access (3 cols) */}
            <div className="md:col-span-2 lg:col-span-3 bg-neutral-50/70 rounded-2xl p-5 border border-neutral-200 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-black mb-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#DC2626] inline-block" />
                  <span>Admin &amp; Staff Access</span>
                </h3>
                <p className="text-xs font-medium text-black leading-relaxed">
                  Authorized access for mechanics, team supervisors, and workshop management.
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-200/80">
                <button
                  type="button"
                  onClick={() => handleNavigateTab('admin-login')}
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-xl border border-neutral-300 hover:border-[#DC2626] bg-white hover:bg-red-50 text-xs font-extrabold text-black inline-flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
                >
                  <AdminTeamIcon className="w-4 h-4 text-[#DC2626]" />
                  <span>Admin Login Staff</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Social Media Channels & Copyright */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
            <div className="space-y-1.5 text-center lg:text-left">
              <p className="text-xs font-extrabold text-black">
                Connect With {BUSINESS_CONFIG.name}
              </p>
              <p className="text-xs font-semibold text-neutral-600">
                © {new Date().getFullYear()} {BUSINESS_CONFIG.name}. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={() => setLegalModalType('privacy')}
                  className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-red-50 border border-neutral-300 hover:border-[#DC2626] text-[11px] font-bold text-neutral-800 hover:text-[#DC2626] transition-all cursor-pointer shadow-2xs"
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => setLegalModalType('terms')}
                  className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-red-50 border border-neutral-300 hover:border-[#DC2626] text-[11px] font-bold text-neutral-800 hover:text-[#DC2626] transition-all cursor-pointer shadow-2xs"
                >
                  Terms &amp; Conditions
                </button>
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="px-2.5 py-1 rounded-lg bg-[#DC2626] hover:bg-red-700 border border-red-800 text-[11px] font-bold text-white transition-all cursor-pointer shadow-2xs inline-flex items-center gap-1"
                >
                  <QrCode className="w-3.5 h-3.5 text-white" />
                  <span>Payment (QR)</span>
                </button>
              </div>
            </div>

            {/* 4 Social Links in a clean uniform 2x2 mobile / 4-col desktop grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <a
                href={socialLinks.facebook || 'https://www.facebook.com/'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="min-h-[42px] px-3.5 py-2 rounded-xl bg-white hover:bg-red-50 border border-neutral-300 hover:border-[#DC2626] text-black font-extrabold text-xs inline-flex items-center justify-center gap-2 transition-all shadow-2xs"
              >
                <FacebookIcon className="w-5 h-5 shrink-0" />
                <span>Facebook</span>
              </a>

              <a
                href={socialLinks.instagram || 'https://www.instagram.com/'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="min-h-[42px] px-3.5 py-2 rounded-xl bg-white hover:bg-red-50 border border-neutral-300 hover:border-[#DC2626] text-black font-extrabold text-xs inline-flex items-center justify-center gap-2 transition-all shadow-2xs"
              >
                <InstagramIcon className="w-5 h-5 shrink-0" />
                <span>Instagram</span>
              </a>

              <a
                href={socialLinks.youtube || 'https://www.youtube.com/'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe on YouTube"
                className="min-h-[42px] px-3.5 py-2 rounded-xl bg-white hover:bg-red-50 border border-neutral-300 hover:border-[#DC2626] text-black font-extrabold text-xs inline-flex items-center justify-center gap-2 transition-all shadow-2xs"
              >
                <YouTubeIcon className="w-5 h-5 shrink-0" />
                <span>YouTube</span>
              </a>

              <a
                href={socialLinks.linkedin || 'https://www.linkedin.com/'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on LinkedIn"
                className="min-h-[42px] px-3.5 py-2 rounded-xl bg-white hover:bg-red-50 border border-neutral-300 hover:border-[#DC2626] text-black font-extrabold text-xs inline-flex items-center justify-center gap-2 transition-all shadow-2xs"
              >
                <LinkedInIcon className="w-5 h-5 shrink-0" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* FIXED BOTTOM NAVIGATION BAR ON MOBILE */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-[#DC2626] grid grid-cols-4 items-center h-16 px-1 text-black"
      >
        <button
          type="button"
          onClick={() => handleNavigateTab('home')}
          className={`min-h-[48px] mx-1 rounded-xl flex flex-col items-center justify-center transition-colors cursor-pointer text-black ${
            activeTab === 'home'
              ? 'bg-[#DC2626] font-extrabold'
              : 'hover:bg-red-50 font-semibold'
          }`}
        >
          <Home className="w-5 h-5 text-black" />
          <span className="text-[11px] tracking-tight mt-0.5 whitespace-nowrap text-black">
            Home
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigateTab('book')}
          className={`min-h-[48px] mx-1 rounded-xl flex flex-col items-center justify-center transition-colors cursor-pointer text-black ${
            activeTab === 'book'
              ? 'bg-[#DC2626] font-extrabold'
              : 'hover:bg-red-50 font-semibold'
          }`}
        >
          <CalendarPlus className="w-5 h-5 text-black" />
          <span className="text-[11px] tracking-tight mt-0.5 whitespace-nowrap text-black">
            Book Now
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigateTab('packages')}
          className={`min-h-[48px] mx-1 rounded-xl flex flex-col items-center justify-center transition-colors cursor-pointer text-black ${
            activeTab === 'packages'
              ? 'bg-[#DC2626] font-extrabold'
              : 'hover:bg-red-50 font-semibold'
          }`}
        >
          <Wrench className="w-5 h-5 text-black" />
          <span className="text-[11px] tracking-tight mt-0.5 whitespace-nowrap text-black">
            Services
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigateTab('contact')}
          className={`min-h-[48px] mx-1 rounded-xl flex flex-col items-center justify-center transition-colors cursor-pointer text-black ${
            activeTab === 'contact'
              ? 'bg-[#DC2626] font-extrabold'
              : 'hover:bg-red-50 font-semibold'
          }`}
        >
          <CallIcon className="w-5 h-5" />
          <span className="text-[11px] tracking-tight mt-0.5 whitespace-nowrap text-black">
            Contact
          </span>
        </button>
      </nav>

      {/* SERVICE DETAIL / CHECKLIST MODAL */}
      <ServiceChecklistModal
        pkg={checklistModalPkg}
        onClose={() => setChecklistModalPkg(null)}
        onBookPackage={handleSelectPackageForBooking}
      />

      {/* FLOATING SCROLL-TO-TOP ARROW BUTTON (Side Me Teer Ka Button) */}
      {showScrollTop && (
        <button
          type="button"
          onClick={handleScrollToTop}
          aria-label="Scroll to top"
          title="Page ke upar jayein"
          className="fixed bottom-20 md:bottom-8 right-4 sm:right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#DC2626] hover:bg-red-700 active:scale-90 text-white shadow-xl border-2 border-white flex items-center justify-center transition-all cursor-pointer group"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.5] group-hover:-translate-y-0.5 transition-transform" />
          <span className="sr-only">Scroll to top</span>
        </button>
      )}

      {/* LEGAL MODALS (Privacy Policy & Terms and Conditions) */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
        onOpenPaymentQR={() => setIsPaymentModalOpen(true)}
      />

      {/* ONLINE PAYMENT QR CODE MODAL */}
      <PaymentQRModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
      </div>
    </div>
  );
}
