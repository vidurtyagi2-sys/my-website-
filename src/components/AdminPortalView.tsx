import React, { useState, useEffect } from 'react';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  LogOut,
  ClipboardList,
  PhoneCall,
  MessageCircle,
  Search,
  Calendar,
  MapPin,
  Car,
  Wrench,
  Trash2,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  Download,
  UserPlus,
  Users,
  KeyRound,
  CheckCircle2,
  Bell,
  BellRing,
  RefreshCw,
} from 'lucide-react';
import {
  BUSINESS_CONFIG,
  BookingRecord,
  BookingStatus,
  BOOKING_STATUS_OPTIONS,
  StaffAccount,
  SocialLinks,
  MechanicRecord,
  BookingPushAlert,
} from '../config/siteConfig';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CallIcon } from './CallIcon';
import { AdminTeamIcon } from './AdminTeamIcon';
import {
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
  LinkedInIcon,
} from './SocialMediaIcons';
import { AdminPushNotificationSystem } from './AdminPushNotificationSystem';

interface AdminPortalViewProps {
  bookings: BookingRecord[];
  onUpdateBookingStatus: (bookingId: string, newStatus: BookingStatus) => void;
  onDeleteBooking: (bookingId: string) => void;
  onExitAdmin: () => void;
  socialLinks: SocialLinks;
  onUpdateSocialLinks: (updated: SocialLinks) => void;
  mechanics: MechanicRecord[];
  onAddMechanic: (mechanic: MechanicRecord) => void;
  onDeleteMechanic: (mechanicId: string) => void;
  onAssignMechanic: (bookingId: string, mechanicId: string) => void;
  notifications: BookingPushAlert[];
  onMarkNotificationAsRead: (id: string) => void;
  onMarkAllNotificationsAsRead: () => void;
  onClearAllNotifications: () => void;
  isPushingActive: boolean;
  latestActiveAlert: BookingPushAlert | null;
  onDismissToast: () => void;
  onRefreshData?: () => void;
  isRefreshing?: boolean;
}

const ADMIN_SESSION_KEY = 'sca_service_admin_session_user_v1';
const STAFF_STORAGE_KEY = 'sca_service_staff_accounts_v1';

interface LoggedInUser {
  name: string;
  loginId: string;
  role: string;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({
  bookings,
  onUpdateBookingStatus,
  onDeleteBooking,
  onExitAdmin,
  socialLinks,
  onUpdateSocialLinks,
  mechanics,
  onAddMechanic,
  onDeleteMechanic,
  onAssignMechanic,
  notifications,
  onMarkNotificationAsRead,
  onMarkAllNotificationsAsRead,
  onClearAllNotifications,
  isPushingActive,
  latestActiveAlert,
  onDismissToast,
  onRefreshData,
  isRefreshing = false,
}) => {
  // Persisted Staff Accounts created by Owner/Admin
  const [staffAccounts, setStaffAccounts] = useState<StaffAccount[]>(() => {
    try {
      const saved = localStorage.getItem(STAFF_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STAFF_STORAGE_KEY, JSON.stringify(staffAccounts));
    } catch {
      // Ignore storage errors
    }
  }, [staffAccounts]);

  // Logged-in Admin or Staff Session
  const [currentUser, setCurrentUser] = useState<LoggedInUser | null>(() => {
    try {
      const saved = sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
    return null;
  });

  // Login Form State
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard Active Section ('bookings' | 'mechanics' | 'staff' | 'social')
  const [activeAdminSection, setActiveAdminSection] = useState<
    'bookings' | 'mechanics' | 'staff' | 'social'
  >('bookings');

  // Mechanic Management Form State
  const [mechName, setMechName] = useState('');
  const [mechPhone, setMechPhone] = useState('');
  const [mechSpecialization, setMechSpecialization] = useState(
    'Royal Enfield, Classic 350 & Heavy Cruiser'
  );
  const [mechExperience, setMechExperience] = useState('5 Years');
  const [mechStatus, setMechStatus] = useState<'Available' | 'On Duty' | 'Inactive'>('Available');
  const [mechSuccessMsg, setMechSuccessMsg] = useState('');
  const [mechErrorMsg, setMechErrorMsg] = useState('');

  const handleCreateMechanic = (e: React.FormEvent) => {
    e.preventDefault();
    setMechErrorMsg('');
    setMechSuccessMsg('');

    const cleanName = mechName.trim();
    const cleanPhone = mechPhone.trim();

    if (!cleanName || cleanName.length < 2) {
      setMechErrorMsg('Please enter mechanic full name.');
      return;
    }

    if (!cleanPhone || cleanPhone.length !== 10) {
      setMechErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    const newMechanic: MechanicRecord = {
      id: `mech-${Date.now()}`,
      name: cleanName,
      phoneNumber: cleanPhone,
      specialization: mechSpecialization,
      experienceYears: mechExperience,
      status: mechStatus,
      joinedDate: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };

    onAddMechanic(newMechanic);
    setMechName('');
    setMechPhone('');
    setMechSuccessMsg(
      `Mechanic "${newMechanic.name}" added successfully! You can now assign them to any service booking.`
    );
  };

  // Social Media Links Form State
  const [fbInput, setFbInput] = useState(socialLinks.facebook);
  const [igInput, setIgInput] = useState(socialLinks.instagram);
  const [ytInput, setYtInput] = useState(socialLinks.youtube);
  const [liInput, setLiInput] = useState(socialLinks.linkedin);
  const [socialSavedMsg, setSocialSavedMsg] = useState('');

  const handleSaveSocialLinks = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSocialLinks({
      facebook: fbInput.trim() || 'https://www.facebook.com/',
      instagram: igInput.trim() || 'https://www.instagram.com/',
      youtube: ytInput.trim() || 'https://www.youtube.com/',
      linkedin: liInput.trim() || 'https://www.linkedin.com/',
    });
    setSocialSavedMsg(
      'Facebook, Instagram, YouTube, and LinkedIn links saved! The footer icons now open your updated links.'
    );
  };

  // Bookings Filter State
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Create Staff ID Form State
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffLoginId, setNewStaffLoginId] = useState('');
  const [newStaffPassword, setNewStaffPassword] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('Service Manager / Staff');
  const [staffFormError, setStaffFormError] = useState('');
  const [staffSuccessMsg, setStaffSuccessMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedId = loginId.trim().toLowerCase();
    const validEmail = BUSINESS_CONFIG.adminAuth.adminId.toLowerCase();
    const validAlt = BUSINESS_CONFIG.adminAuth.alternateId.toLowerCase();
    const validPhone = '9548984717';

    const isOwnerMatch =
      (trimmedId === validEmail ||
        trimmedId === validAlt ||
        trimmedId === validPhone ||
        trimmedId === '09548984717') &&
      password === BUSINESS_CONFIG.adminAuth.password;

    if (isOwnerMatch) {
      const userObj: LoggedInUser = {
        name: 'Owner / Super Admin',
        loginId: BUSINESS_CONFIG.email,
        role: 'Owner',
      };
      setCurrentUser(userObj);
      setLoginError('');
      try {
        sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(userObj));
      } catch {
        // Ignore
      }
      return;
    }

    // Check against generated Staff IDs
    const matchedStaff = staffAccounts.find(
      (s) =>
        s.loginId.trim().toLowerCase() === trimmedId && s.password === password
    );

    if (matchedStaff) {
      const userObj: LoggedInUser = {
        name: matchedStaff.name,
        loginId: matchedStaff.loginId,
        role: matchedStaff.role,
      };
      setCurrentUser(userObj);
      setLoginError('');
      try {
        sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(userObj));
      } catch {
        // Ignore
      }
      return;
    }

    setLoginError(
      'Invalid Admin/Staff ID or Password. Please check your credentials and try again.'
    );
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginId('');
    setPassword('');
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {
      // Ignore
    }
  };

  const handleGenerateRandomStaffCredentials = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    setNewStaffLoginId(`staff${randomNum}@sca`);
    setNewStaffPassword(`sca#${Math.floor(1000 + Math.random() * 9000)}`);
    setStaffFormError('');
  };

  const handleCreateStaffAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setStaffFormError('');
    setStaffSuccessMsg('');

    const cleanName = newStaffName.trim();
    const cleanId = newStaffLoginId.trim();
    const cleanPass = newStaffPassword.trim();

    if (!cleanName) {
      setStaffFormError('Please enter the staff member name.');
      return;
    }
    if (!cleanId || cleanId.length < 3) {
      setStaffFormError(
        'Please enter a Staff Login ID / Username (at least 3 characters).'
      );
      return;
    }
    if (!cleanPass || cleanPass.length < 4) {
      setStaffFormError(
        'Please enter a Staff Password (at least 4 characters).'
      );
      return;
    }

    const exists = staffAccounts.some(
      (s) => s.loginId.toLowerCase() === cleanId.toLowerCase()
    );
    if (
      exists ||
      cleanId.toLowerCase() === 'admin' ||
      cleanId.toLowerCase() === BUSINESS_CONFIG.adminAuth.adminId.toLowerCase()
    ) {
      setStaffFormError(
        'This Login ID already exists. Please choose a different Staff ID.'
      );
      return;
    }

    const newAccount: StaffAccount = {
      id: `STF-${Date.now()}`,
      name: cleanName,
      loginId: cleanId,
      password: cleanPass,
      role: newStaffRole,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };

    setStaffAccounts((prev) => [newAccount, ...prev]);
    setNewStaffName('');
    setNewStaffLoginId('');
    setNewStaffPassword('');
    setStaffSuccessMsg(
      `Staff ID "${newAccount.loginId}" created for ${newAccount.name}! They can now log in and view the full Admin Dashboard.`
    );
  };

  const handleDeleteStaff = (id: string) => {
    setStaffAccounts((prev) => prev.filter((s) => s.id !== id));
  };

  const handleExportCSV = () => {
    if (bookings.length === 0) return;
    const headers = [
      'Booking ID',
      'Customer Name',
      'Customer Email',
      'Phone Number',
      'Vehicle Type',
      'Brand',
      'Model',
      'Registration No',
      'Service',
      'Package',
      'Price (INR)',
      'Preferred Date',
      'Preferred Time',
      'Address',
      'Special Request',
      'Status',
      'Created Date',
    ];
    const rows = bookings.map((b) => [
      b.bookingId,
      `"${b.customerName.replace(/"/g, '""')}"`,
      `"${(b.customerEmail || '').replace(/"/g, '""')}"`,
      b.phoneNumber,
      b.vehicleType,
      b.brand,
      `"${b.model.replace(/"/g, '""')}"`,
      b.registrationNumber,
      b.service,
      `"${b.packageName.replace(/"/g, '""')}"`,
      b.packagePrice,
      b.date,
      b.time,
      `"${b.address.replace(/"/g, '""')}"`,
      `"${b.specialRequest.replace(/"/g, '""')}"`,
      b.status,
      `"${b.createdDate}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `SCA-SERVICE-Bookings-${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ============================================================================
  // SCREEN A: DEDICATED ADMIN & STAFF LOGIN PORTAL (NO VISIBLE CREDENTIALS)
  // ============================================================================
  if (!currentUser) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-8 px-4 text-black">
        <div className="w-full max-w-md bg-white rounded-3xl border-2 border-[#DC2626] p-6 sm:p-8 shadow-lg">
          {/* Top Back Button */}
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-black hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#DC2626]" />
              <span>Back to Customer App</span>
            </button>
            <span className="text-xs font-extrabold text-black flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#DC2626]" />
              <span>Authorized Access</span>
            </span>
          </div>

          {/* Official Brand Logo */}
          <div className="flex justify-center mb-5">
            <BrandLogo variant="card" showTagline={false} />
          </div>

          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-3 p-2">
              <AdminTeamIcon className="w-full h-full" />
            </div>
            <h1 className="text-2xl font-extrabold text-black flex items-center justify-center gap-2">
              <AdminTeamIcon className="w-6 h-6" />
              <span>{BUSINESS_CONFIG.appName} — Admin &amp; Staff Login</span>
            </h1>
            <p className="text-xs sm:text-sm font-medium text-black mt-1">
              Enter your Admin or Staff Login ID and Password to access the full
              booking dashboard.
            </p>
          </div>

          {loginError && (
            <div
              role="alert"
              className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-[#DC2626] text-xs font-bold text-black flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="adminLoginId"
                className="block text-xs sm:text-sm font-extrabold text-black mb-1.5"
              >
                Admin / Staff Login ID
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                  <AdminTeamIcon className="w-4 h-4" />
                </div>
                <input
                  id="adminLoginId"
                  type="text"
                  required
                  value={loginId}
                  onChange={(e) => {
                    setLoginId(e.target.value);
                    if (loginError) setLoginError('');
                  }}
                  placeholder="Enter your Login ID or Email"
                  className="w-full min-h-[48px] pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 bg-neutral-50 focus:bg-white text-sm text-black font-semibold placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="adminPassword"
                className="block text-xs sm:text-sm font-extrabold text-black mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#DC2626] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="adminPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (loginError) setLoginError('');
                  }}
                  placeholder="Enter your password"
                  className="w-full min-h-[48px] pl-10 pr-11 py-2.5 rounded-xl border border-neutral-300 bg-neutral-50 focus:bg-white text-sm text-black font-semibold placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-black hover:text-[#DC2626] cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full min-h-[50px] py-3 px-6 rounded-xl bg-[#DC2626] hover:bg-red-700 active:scale-[0.99] border border-red-800 text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <Lock className="w-4 h-4 text-black" />
              <span>LOGIN TO DASHBOARD</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ============================================================================
  // SCREEN B: FULL ADMIN & STAFF DASHBOARD
  // ============================================================================
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      b.bookingId.toLowerCase().includes(q) ||
      b.customerName.toLowerCase().includes(q) ||
      (b.customerEmail && b.customerEmail.toLowerCase().includes(q)) ||
      b.phoneNumber.includes(q) ||
      b.registrationNumber.toLowerCase().includes(q) ||
      b.model.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const countByStatus = (status: BookingStatus) =>
    bookings.filter((b) => b.status === status).length;

  return (
    <div className="py-5 sm:py-8 space-y-6 pb-12 text-black">
      {/* Top Admin Header Bar */}
      <div className="bg-white rounded-3xl border-2 border-[#DC2626] p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <BrandLogo variant="compact" showTagline={false} />
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-black uppercase tracking-wider mb-0.5">
              <ClipboardList className="w-4 h-4 text-[#DC2626]" />
              <span>FULL ADMIN &amp; STAFF DASHBOARD</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-black">
              {BUSINESS_CONFIG.appName} — Control Panel
            </h1>
            <p className="text-xs sm:text-sm text-black font-medium">
              Logged in: <strong>{currentUser.name}</strong> (
              {currentUser.loginId} · {currentUser.role})
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {onRefreshData && (
            <button
              type="button"
              onClick={onRefreshData}
              disabled={isRefreshing}
              className="min-h-[42px] px-3.5 py-2 rounded-xl border border-neutral-300 hover:border-[#DC2626] bg-white hover:bg-red-50 text-black text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition-all shadow-2xs"
              title="Sync with live customer database"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-[#DC2626] ${
                  isRefreshing ? 'animate-spin' : ''
                }`}
              />
              <span>{isRefreshing ? 'Syncing...' : 'Live Sync'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleExportCSV}
            className="min-h-[42px] px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 border border-[#DC2626] text-black font-extrabold text-xs inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={onExitAdmin}
            className="min-h-[42px] px-4 py-2 rounded-xl border border-neutral-400 hover:bg-neutral-100 text-black font-extrabold text-xs inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-black" />
            <span>Customer View</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="min-h-[42px] px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-red-700 border border-red-800 text-black font-extrabold text-xs inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <LogOut className="w-3.5 h-3.5 text-black" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Dashboard Mode Switcher: 1. Bookings Dashboard | 2. Manage / Generate Staff IDs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-2xl border border-neutral-300">
        <button
          type="button"
          onClick={() => setActiveAdminSection('bookings')}
          className={`flex-1 sm:flex-initial min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold inline-flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeAdminSection === 'bookings'
              ? 'bg-[#DC2626] text-black border border-red-800 shadow-xs'
              : 'text-black hover:bg-red-50'
          }`}
        >
          <ClipboardList className="w-4 h-4 text-black" />
          <span>All Service Bookings ({bookings.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveAdminSection('mechanics');
            setMechSuccessMsg('');
            setMechErrorMsg('');
          }}
          className={`flex-1 sm:flex-initial min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold inline-flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeAdminSection === 'mechanics'
              ? 'bg-[#DC2626] text-black border border-red-800 shadow-xs'
              : 'text-black hover:bg-red-50'
          }`}
        >
          <Wrench className="w-4 h-4 text-black" />
          <span>Add &amp; Assign Mechanics ({mechanics.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveAdminSection('staff')}
          className={`flex-1 sm:flex-initial min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold inline-flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeAdminSection === 'staff'
              ? 'bg-[#DC2626] text-black border border-red-800 shadow-xs'
              : 'text-black hover:bg-red-50'
          }`}
        >
          <UserPlus className="w-4 h-4 text-black" />
          <span>Generate &amp; Manage Staff IDs ({staffAccounts.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveAdminSection('social');
            setSocialSavedMsg('');
          }}
          className={`flex-1 sm:flex-initial min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold inline-flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeAdminSection === 'social'
              ? 'bg-[#DC2626] text-black border border-red-800 shadow-xs'
              : 'text-black hover:bg-red-50'
          }`}
        >
          <FacebookIcon className="w-4 h-4" />
          <InstagramIcon className="w-4 h-4" />
          <YouTubeIcon className="w-4 h-4" />
          <LinkedInIcon className="w-4 h-4" />
          <span>Social Media Links</span>
        </button>
      </div>

      {/* ==================================================================== */}
      {/* TAB: ADD & MANAGE WORKSHOP MECHANICS                                  */}
      {/* ==================================================================== */}
      {activeAdminSection === 'mechanics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Add Mechanic Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-neutral-300 p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-neutral-200">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-[#DC2626]" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-black">
                  Add New Mechanic
                </h2>
                <p className="text-xs font-medium text-black">
                  Register your workshop technicians so you can assign them to bookings
                </p>
              </div>
            </div>

            {mechSuccessMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-[#DC2626] text-xs font-bold text-black flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                <span>{mechSuccessMsg}</span>
              </div>
            )}

            {mechErrorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-[#DC2626] text-xs font-bold text-black flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                <span>{mechErrorMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateMechanic} className="space-y-4">
              <div>
                <label
                  htmlFor="mechNameInput"
                  className="block text-xs sm:text-sm font-extrabold text-black mb-1.5"
                >
                  Mechanic Full Name <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  id="mechNameInput"
                  type="text"
                  required
                  value={mechName}
                  onChange={(e) => {
                    setMechName(e.target.value);
                    if (mechErrorMsg) setMechErrorMsg('');
                  }}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full min-h-[46px] px-3.5 py-2 rounded-xl border border-neutral-300 bg-neutral-50 focus:bg-white text-sm text-black font-semibold placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                />
              </div>

              <div>
                <label
                  htmlFor="mechPhoneInput"
                  className="block text-xs sm:text-sm font-extrabold text-black mb-1.5"
                >
                  Mobile Number (10 digits) <span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-500 font-mono">
                    +91
                  </span>
                  <input
                    id="mechPhoneInput"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    required
                    value={mechPhone}
                    onChange={(e) => {
                      setMechPhone(e.target.value.replace(/\D/g, ''));
                      if (mechErrorMsg) setMechErrorMsg('');
                    }}
                    placeholder="9876543210"
                    className="w-full min-h-[46px] pl-12 pr-3.5 py-2 rounded-xl border border-neutral-300 bg-neutral-50 focus:bg-white text-sm text-black font-mono font-bold placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="mechSpecializationSelect"
                  className="block text-xs sm:text-sm font-extrabold text-black mb-1.5"
                >
                  Vehicle Specialization
                </label>
                <select
                  id="mechSpecializationSelect"
                  value={mechSpecialization}
                  onChange={(e) => setMechSpecialization(e.target.value)}
                  className="w-full min-h-[46px] px-3.5 py-2 rounded-xl border border-neutral-300 bg-neutral-50 focus:bg-white text-xs sm:text-sm text-black font-bold focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                >
                  <option value="Royal Enfield, Classic 350 & Heavy Cruiser">
                    Royal Enfield, Classic 350 &amp; Heavy Cruiser
                  </option>
                  <option value="KTM Duke, Apache RTR & Sports Bikes">
                    KTM Duke, Apache RTR &amp; Sports Bikes
                  </option>
                  <option value="Hero Splendor, Honda & Commuter Two-Wheelers">
                    Hero Splendor, Honda &amp; Commuter Two-Wheelers
                  </option>
                  <option value="Honda Activa, Scooters & Automatic Bikes">
                    Honda Activa, Scooters &amp; Automatic Bikes
                  </option>
                  <option value="Multi-brand Two-Wheelers & Major Overhauls">
                    Multi-brand Two-Wheelers &amp; Major Overhauls
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="mechExpInput"
                    className="block text-xs sm:text-sm font-extrabold text-black mb-1.5"
                  >
                    Experience
                  </label>
                  <select
                    id="mechExpInput"
                    value={mechExperience}
                    onChange={(e) => setMechExperience(e.target.value)}
                    className="w-full min-h-[46px] px-3 py-2 rounded-xl border border-neutral-300 bg-neutral-50 focus:bg-white text-xs text-black font-bold focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                  >
                    <option value="3 Years">3 Years</option>
                    <option value="5 Years">5 Years</option>
                    <option value="8 Years">8 Years</option>
                    <option value="10+ Years">10+ Years</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="mechStatusInput"
                    className="block text-xs sm:text-sm font-extrabold text-black mb-1.5"
                  >
                    Current Status
                  </label>
                  <select
                    id="mechStatusInput"
                    value={mechStatus}
                    onChange={(e) => setMechStatus(e.target.value as 'Available' | 'On Duty' | 'Inactive')}
                    className="w-full min-h-[46px] px-3 py-2 rounded-xl border border-neutral-300 bg-neutral-50 focus:bg-white text-xs text-black font-bold focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                  >
                    <option value="Available">Available</option>
                    <option value="On Duty">On Duty</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] py-3 px-5 rounded-xl bg-[#DC2626] hover:bg-red-700 border border-red-800 text-black font-extrabold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Wrench className="w-4 h-4 text-black" />
                <span>Add Mechanic</span>
              </button>
            </form>
          </div>

          {/* Right Column: Mechanics Directory */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-300 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#DC2626]" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-extrabold text-black">
                      Workshop Mechanics Directory ({mechanics.length})
                    </h2>
                    <p className="text-xs font-medium text-black">
                      Technicians available to be assigned on incoming customer bookings
                    </p>
                  </div>
                </div>
              </div>

              {mechanics.length === 0 ? (
                <div className="py-12 text-center bg-neutral-50 rounded-2xl border border-neutral-200 p-6">
                  <Wrench className="w-8 h-8 text-[#DC2626] mx-auto mb-2" />
                  <p className="text-sm font-extrabold text-black">
                    No Mechanics Added Yet
                  </p>
                  <p className="text-xs font-medium text-black mt-1 max-w-sm mx-auto">
                    Use the form on the left to add mechanics with their contact and vehicle specialization.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {mechanics.map((mech) => {
                    const assignedCount = bookings.filter(
                      (b) => b.assignedMechanicId === mech.id
                    ).length;

                    return (
                      <div
                        key={mech.id}
                        className="p-4 rounded-2xl bg-neutral-50 border border-neutral-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-extrabold text-black">
                              {mech.name}
                            </span>
                            <span className="text-xs font-mono font-bold text-black bg-white px-2 py-0.5 rounded border border-neutral-300">
                              +91 {mech.phoneNumber}
                            </span>
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                                mech.status === 'Available'
                                  ? 'bg-green-100 text-green-800 border-green-300'
                                  : mech.status === 'On Duty'
                                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                                  : 'bg-neutral-200 text-neutral-700 border-neutral-300'
                              }`}
                            >
                              {mech.status}
                            </span>
                          </div>

                          <p className="text-xs font-semibold text-neutral-700">
                            <strong>Specialization:</strong> {mech.specialization} ({mech.experienceYears || 'Experienced'})
                          </p>

                          <div className="flex items-center gap-3 text-xs text-neutral-600">
                            <span className="font-extrabold text-black">
                              Assigned Bookings: <strong className="text-[#DC2626] font-mono">{assignedCount}</strong>
                            </span>
                            <span>·</span>
                            <span>Added: {mech.joinedDate}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-center">
                          <a
                            href={`tel:+91${mech.phoneNumber}`}
                            className="min-h-[36px] px-3 py-1.5 rounded-xl border border-neutral-300 hover:border-[#DC2626] bg-white hover:bg-red-50 text-black text-xs font-extrabold inline-flex items-center gap-1.5 shadow-2xs"
                            title="Call Mechanic"
                          >
                            <CallIcon className="w-3.5 h-3.5" />
                            <span>Call</span>
                          </a>

                          <a
                            href={`https://wa.me/91${mech.phoneNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-[36px] px-3 py-1.5 rounded-xl border border-neutral-300 hover:border-[#25D366] bg-white hover:bg-green-50 text-black text-xs font-extrabold inline-flex items-center gap-1.5 shadow-2xs"
                            title="WhatsApp Mechanic"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => onDeleteMechanic(mech.id)}
                            className="min-h-[36px] px-2.5 py-1.5 rounded-xl border border-neutral-300 hover:border-[#DC2626] bg-white hover:bg-red-50 text-black text-xs font-extrabold inline-flex items-center gap-1 cursor-pointer"
                            title="Remove Mechanic"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-[#DC2626]" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-200 text-xs font-semibold text-black flex items-center justify-between">
              <span>
                Assign any of these mechanics directly from the Bookings tab.
              </span>
              <button
                type="button"
                onClick={() => setActiveAdminSection('bookings')}
                className="font-extrabold underline hover:text-[#DC2626] cursor-pointer"
              >
                Go to Bookings &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: FACEBOOK, INSTAGRAM, YOUTUBE & LINKEDIN LINKS                 */}
      {/* ==================================================================== */}
      {activeAdminSection === 'social' && (
        <div className="bg-white rounded-3xl border border-neutral-300 p-6 sm:p-8 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1.5">
              <FacebookIcon className="w-6 h-6" />
              <InstagramIcon className="w-6 h-6" />
              <YouTubeIcon className="w-6 h-6" />
              <LinkedInIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-black">
                Add / Update Social Media Links
              </h2>
              <p className="text-xs font-medium text-black">
                Paste your official Facebook, Instagram, YouTube, and LinkedIn
                links below for the bottom footer icons.
              </p>
            </div>
          </div>

          {socialSavedMsg && (
            <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-[#DC2626] text-xs font-bold text-black flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
              <span>{socialSavedMsg}</span>
            </div>
          )}

          <form onSubmit={handleSaveSocialLinks} className="space-y-4">
            <div>
              <label
                htmlFor="fbLinkInput"
                className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-black mb-1.5"
              >
                <FacebookIcon className="w-4 h-4" />
                <span>Facebook Page Link</span>
              </label>
              <input
                id="fbLinkInput"
                type="url"
                value={fbInput}
                onChange={(e) => {
                  setFbInput(e.target.value);
                  if (socialSavedMsg) setSocialSavedMsg('');
                }}
                placeholder="https://www.facebook.com/yourpage"
                className="w-full min-h-[46px] px-3.5 py-2 rounded-xl border border-neutral-300 bg-neutral-50 focus:bg-white text-sm text-black font-semibold placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
              />
            </div>

            <div>
              <label
                htmlFor="igLinkInput"
                className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-black mb-1.5"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram Profile Link</span>
              </label>
              <input
                id="igLinkInput"
                type="url"
                value={igInput}
                onChange={(e) => {
                  setIgInput(e.target.value);
                  if (socialSavedMsg) setSocialSavedMsg('');
                }}
                placeholder="https://www.instagram.com/yourhandle"
                className="w-full min-h-[46px] px-3.5 py-2 rounded-xl border border-neutral-300 bg-neutral-50 focus:bg-white text-sm text-black font-semibold placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
              />
            </div>

            <div>
              <label
                htmlFor="ytLinkInput"
                className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-black mb-1.5"
              >
                <YouTubeIcon className="w-4 h-4" />
                <span>YouTube Channel Link</span>
              </label>
              <input
                id="ytLinkInput"
                type="url"
                value={ytInput}
                onChange={(e) => {
                  setYtInput(e.target.value);
                  if (socialSavedMsg) setSocialSavedMsg('');
                }}
                placeholder="https://www.youtube.com/@yourchannel"
                className="w-full min-h-[46px] px-3.5 py-2 rounded-xl border border-neutral-300 bg-neutral-50 focus:bg-white text-sm text-black font-semibold placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
              />
            </div>

            <div>
              <label
                htmlFor="liLinkInput"
                className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-black mb-1.5"
              >
                <LinkedInIcon className="w-4 h-4" />
                <span>LinkedIn Company / Profile Link</span>
              </label>
              <input
                id="liLinkInput"
                type="url"
                value={liInput}
                onChange={(e) => {
                  setLiInput(e.target.value);
                  if (socialSavedMsg) setSocialSavedMsg('');
                }}
                placeholder="https://www.linkedin.com/company/yourcompany"
                className="w-full min-h-[46px] px-3.5 py-2 rounded-xl border border-neutral-300 bg-neutral-50 focus:bg-white text-sm text-black font-semibold placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
              />
            </div>

            <button
              type="submit"
              className="min-h-[48px] px-6 py-3 rounded-xl bg-[#DC2626] hover:bg-red-700 border border-red-800 text-black font-extrabold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-black" />
              <span>Save Social Media Links</span>
            </button>
          </form>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: GENERATE & MANAGE STAFF IDs                                   */}
      {/* ==================================================================== */}
      {activeAdminSection === 'staff' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Create New Staff ID Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-neutral-300 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-[#DC2626]" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-black">
                    Generate New Staff ID
                  </h2>
                  <p className="text-xs font-medium text-black">
                    Staff will get full access to this Admin Dashboard
                  </p>
                </div>
              </div>
            </div>

            {staffFormError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-[#DC2626] text-xs font-bold text-black flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                <span>{staffFormError}</span>
              </div>
            )}

            {staffSuccessMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-[#DC2626] text-xs font-bold text-black flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                <span>{staffSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateStaffAccount} className="space-y-4">
              <div>
                <label
                  htmlFor="staffName"
                  className="block text-xs font-extrabold text-black mb-1"
                >
                  Staff Member Name <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  id="staffName"
                  type="text"
                  value={newStaffName}
                  onChange={(e) => setNewStaffName(e.target.value)}
                  placeholder="e.g. Rahul Kumar"
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-neutral-300 bg-neutral-50 focus:bg-white text-sm text-black font-semibold placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="staffLoginId"
                    className="block text-xs font-extrabold text-black"
                  >
                    Staff Login ID / Username{' '}
                    <span className="text-[#DC2626]">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateRandomStaffCredentials}
                    className="text-[11px] font-extrabold text-black underline hover:text-[#DC2626] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <KeyRound className="w-3 h-3 text-[#DC2626]" />
                    <span>Auto-Generate ID &amp; Pass</span>
                  </button>
                </div>
                <input
                  id="staffLoginId"
                  type="text"
                  value={newStaffLoginId}
                  onChange={(e) => setNewStaffLoginId(e.target.value)}
                  placeholder="e.g. rahul@sca or 9876543210"
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-neutral-300 bg-neutral-50 focus:bg-white text-sm font-mono text-black font-bold placeholder:font-sans placeholder:font-normal placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                />
              </div>

              <div>
                <label
                  htmlFor="staffPassword"
                  className="block text-xs font-extrabold text-black mb-1"
                >
                  Staff Password <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  id="staffPassword"
                  type="text"
                  value={newStaffPassword}
                  onChange={(e) => setNewStaffPassword(e.target.value)}
                  placeholder="Enter password for staff"
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-neutral-300 bg-neutral-50 focus:bg-white text-sm font-mono text-black font-bold placeholder:font-sans placeholder:font-normal placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                />
              </div>

              <div>
                <label
                  htmlFor="staffRole"
                  className="block text-xs font-extrabold text-black mb-1"
                >
                  Designation / Role
                </label>
                <select
                  id="staffRole"
                  value={newStaffRole}
                  onChange={(e) => setNewStaffRole(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-neutral-300 bg-neutral-50 focus:bg-white text-sm text-black font-semibold focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                >
                  <option value="Service Manager / Staff">
                    Service Manager / Staff (Full Dashboard Access)
                  </option>
                  <option value="Workshop Supervisor">
                    Workshop Supervisor (Full Dashboard Access)
                  </option>
                  <option value="Senior Mechanic">
                    Senior Mechanic (Full Dashboard Access)
                  </option>
                  <option value="Support Executive">
                    Support Executive (Full Dashboard Access)
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] py-3 px-5 rounded-xl bg-[#DC2626] hover:bg-red-700 border border-red-800 text-black font-extrabold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <UserPlus className="w-4 h-4 text-black" />
                <span>Create Staff Login ID</span>
              </button>
            </form>
          </div>

          {/* Right Column: Active Staff Accounts Directory */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-300 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#DC2626]" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-extrabold text-black">
                      Active Staff Login IDs ({staffAccounts.length})
                    </h2>
                    <p className="text-xs font-medium text-black">
                      Share these credentials with your staff so they can log in
                      to the Admin Dashboard
                    </p>
                  </div>
                </div>
              </div>

              {staffAccounts.length === 0 ? (
                <div className="py-12 text-center bg-neutral-50 rounded-2xl border border-neutral-200 p-6">
                  <Users className="w-8 h-8 text-[#DC2626] mx-auto mb-2" />
                  <p className="text-sm font-extrabold text-black">
                    No Staff IDs Created Yet
                  </p>
                  <p className="text-xs font-medium text-black mt-1 max-w-sm mx-auto">
                    Use the form on the left to generate a Login ID and Password
                    for your workshop manager or staff members.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {staffAccounts.map((staff) => (
                    <div
                      key={staff.id}
                      className="p-4 rounded-2xl bg-neutral-50 border border-neutral-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-black">
                            {staff.name}
                          </span>
                          <span className="text-xs font-bold text-black">
                            · {staff.role}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                          <span className="font-mono font-bold text-black bg-white px-2.5 py-1 rounded-lg border border-neutral-300">
                            Login ID: {staff.loginId}
                          </span>
                          <span className="font-mono font-bold text-black bg-white px-2.5 py-1 rounded-lg border border-neutral-300">
                            Password: {staff.password}
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-black block">
                          Created: {staff.createdAt} · Full Admin Dashboard
                          Access
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteStaff(staff.id)}
                        className="min-h-[38px] px-3 py-1.5 rounded-xl border border-neutral-300 hover:border-[#DC2626] bg-white hover:bg-red-50 text-black text-xs font-extrabold inline-flex items-center gap-1.5 self-start sm:self-center cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-[#DC2626]" />
                        <span>Remove ID</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-200 text-xs font-semibold text-black flex items-center justify-between">
              <span>
                Every generated Staff ID can view and manage the complete
                Bookings Dashboard.
              </span>
              <button
                type="button"
                onClick={() => setActiveAdminSection('bookings')}
                className="font-extrabold underline hover:text-[#DC2626] cursor-pointer"
              >
                View Bookings →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 1: ALL SERVICE BOOKINGS DASHBOARD                                */}
      {/* ==================================================================== */}
      {activeAdminSection === 'bookings' && (
        <>
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-white rounded-2xl border border-neutral-300 p-4">
              <span className="text-xs font-bold text-black block">
                Total Bookings
              </span>
              <span className="text-2xl font-extrabold text-black tabular-nums mt-0.5 block">
                {bookings.length}
              </span>
            </div>
            <div className="bg-red-50/70 rounded-2xl border border-red-200 p-4">
              <span className="text-xs font-bold text-black block">
                New / Confirmed
              </span>
              <span className="text-2xl font-extrabold text-black tabular-nums mt-0.5 block">
                {countByStatus('New') + countByStatus('Confirmed')}
              </span>
            </div>
            <div className="bg-white rounded-2xl border border-neutral-300 p-4">
              <span className="text-xs font-bold text-black block">
                Assigned / In Progress
              </span>
              <span className="text-2xl font-extrabold text-black tabular-nums mt-0.5 block">
                {countByStatus('Assigned') + countByStatus('In Progress')}
              </span>
            </div>
            <div className="bg-white rounded-2xl border border-neutral-300 p-4">
              <span className="text-xs font-bold text-black block">
                Completed
              </span>
              <span className="text-2xl font-extrabold text-black tabular-nums mt-0.5 block">
                {countByStatus('Completed')}
              </span>
            </div>
          </div>

          {/* Search & Status Filter Bar */}
          <div className="bg-white rounded-2xl border border-neutral-300 p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
              {(['All', ...BOOKING_STATUS_OPTIONS] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                    statusFilter === st
                      ? 'bg-[#DC2626] text-black border border-red-800'
                      : 'bg-neutral-100 text-black hover:bg-red-50'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-[#DC2626] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ID, name, phone, reg no..."
                className="w-full min-h-[42px] pl-10 pr-4 py-2 rounded-xl border border-neutral-300 text-xs sm:text-sm text-black font-medium placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
              />
            </div>
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-3xl border border-neutral-300 p-10 text-center">
              <p className="text-base font-extrabold text-black">
                No bookings match your current filter.
              </p>
              <p className="text-xs sm:text-sm text-black font-medium mt-1">
                When customers submit bookings from the Book Now screen, they
                appear here automatically.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.bookingId}
                  className="bg-white rounded-2xl border border-neutral-300 p-5 sm:p-6 transition-all"
                >
                  {/* Top Row: ID, Created Date, Status Selector & Delete */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-black font-semibold">
                      <span className="font-mono font-extrabold text-sm text-black tabular-nums">
                        {booking.bookingId}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Created: {booking.createdDate}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-extrabold text-black">
                        Status: {booking.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <label
                        htmlFor={`status-${booking.bookingId}`}
                        className="text-xs font-extrabold text-black"
                      >
                        Update Status:
                      </label>
                      <select
                        id={`status-${booking.bookingId}`}
                        value={booking.status}
                        onChange={(e) =>
                          onUpdateBookingStatus(
                            booking.bookingId,
                            e.target.value as BookingStatus
                          )
                        }
                        className="min-h-[38px] px-3 py-1.5 rounded-xl border border-neutral-300 bg-red-50/60 text-xs font-extrabold text-black focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                      >
                        {BOOKING_STATUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>

                      {deleteConfirmId === booking.bookingId ? (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              onDeleteBooking(booking.bookingId);
                              setDeleteConfirmId(null);
                            }}
                            className="min-h-[38px] px-3 py-1.5 rounded-xl bg-[#DC2626] text-black text-xs font-extrabold cursor-pointer"
                          >
                            Confirm Delete
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(null)}
                            className="min-h-[38px] px-2.5 py-1.5 rounded-xl border border-neutral-300 text-black text-xs font-bold cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(booking.bookingId)}
                          aria-label={`Delete booking ${booking.bookingId}`}
                          className="min-h-[38px] min-w-[38px] rounded-xl border border-neutral-300 hover:border-[#DC2626] hover:bg-red-50 flex items-center justify-center text-black cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 text-[#DC2626]" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                    {/* Customer & Contact */}
                    <div>
                      <span className="text-xs font-bold text-black block">
                        Customer Details
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                        <span className="text-sm font-extrabold text-black">
                          {booking.customerName}
                        </span>
                        {booking.customerId && (
                          <span className="px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-300 text-black text-[11px] font-mono font-bold">
                            ID: {booking.customerId}
                          </span>
                        )}
                      </div>
                      {booking.customerEmail && (
                        <span className="text-xs font-bold text-black block mt-0.5 break-all">
                          Email: {booking.customerEmail}
                        </span>
                      )}
                      <span className="text-xs font-mono font-bold text-black tabular-nums inline-flex items-center gap-1.5 mt-0.5">
                        <CallIcon className="w-3.5 h-3.5" />
                        <span>+91 {booking.phoneNumber}</span>
                      </span>
                      <div className="flex items-center gap-2 mt-2">
                        <a
                          href={`tel:+91${booking.phoneNumber}`}
                          className="text-xs font-extrabold text-black hover:underline inline-flex items-center gap-1.5"
                        >
                          <CallIcon className="w-3.5 h-3.5" />
                          <span>Call</span>
                        </a>
                        <span className="text-black">·</span>
                        <a
                          href={`https://wa.me/91${booking.phoneNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-extrabold text-black hover:underline inline-flex items-center gap-1.5"
                        >
                          <WhatsAppIcon className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>

                    {/* Vehicle & Service */}
                    <div>
                      <span className="text-xs font-bold text-black block">
                        Vehicle &amp; Service Package
                      </span>
                      <span className="text-sm font-extrabold text-black flex items-center gap-1.5 mt-0.5">
                        <Car className="w-4 h-4 text-[#DC2626] shrink-0" />
                        <span>
                          {booking.brand} {booking.model} ({booking.vehicleType}
                          )
                        </span>
                      </span>
                      <span className="text-xs font-mono font-bold text-black block mt-0.5">
                        Reg: {booking.registrationNumber}
                      </span>
                      <span className="text-xs font-extrabold text-black flex items-center gap-1 mt-1">
                        <Wrench className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
                        <span>
                          {booking.service} · {booking.packageName} (₹
                          {booking.packagePrice})
                        </span>
                      </span>
                    </div>

                    {/* Schedule & Address */}
                    <div>
                      <span className="text-xs font-bold text-black block">
                        Preferred Slot &amp; Address
                      </span>
                      <span className="text-sm font-extrabold text-black flex items-center gap-1.5 mt-0.5 tabular-nums">
                        <Calendar className="w-4 h-4 text-[#DC2626] shrink-0" />
                        <span>
                          {booking.date} · {booking.time}
                        </span>
                      </span>
                      <span className="text-xs font-medium text-black flex items-start gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#DC2626] shrink-0 mt-0.5" />
                        <span>{booking.address}</span>
                      </span>
                    </div>
                  </div>

                  {/* Special Request Footer */}
                  <div className="pt-3 border-t border-neutral-200 text-xs font-medium text-black">
                    <strong className="font-extrabold text-black">
                      Special Request:
                    </strong>{' '}
                    {booking.specialRequest}
                  </div>

                  {/* Mechanic Assignment Row */}
                  <div className="mt-3 pt-3 border-t border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-red-50/60 p-3.5 rounded-xl border border-red-200">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#DC2626] flex items-center justify-center shrink-0">
                        <Wrench className="w-4 h-4 text-[#DC2626]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-600 block">
                          Assigned Mechanic for Doorstep Service
                        </span>
                        {booking.assignedMechanicName ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-extrabold text-black">
                              {booking.assignedMechanicName}
                            </span>
                            {booking.assignedMechanicPhone && (
                              <span className="text-xs font-mono font-bold text-neutral-800">
                                (+91 {booking.assignedMechanicPhone})
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-800 border border-green-300 text-[10px] font-extrabold">
                              Assigned
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs font-bold text-[#DC2626]">
                            No mechanic assigned yet — please select one
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <label
                        htmlFor={`assign-mech-${booking.bookingId}`}
                        className="text-xs font-extrabold text-black shrink-0"
                      >
                        Assign:
                      </label>
                      <select
                        id={`assign-mech-${booking.bookingId}`}
                        value={booking.assignedMechanicId || ''}
                        onChange={(e) =>
                          onAssignMechanic(booking.bookingId, e.target.value)
                        }
                        className="min-h-[38px] px-3 py-1.5 rounded-xl border border-neutral-300 bg-white text-xs font-extrabold text-black focus:outline-none focus:ring-2 focus:ring-[#DC2626] cursor-pointer"
                      >
                        <option value="">-- None / Unassign --</option>
                        {mechanics.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.name} ({m.specialization.split(',')[0]} · {m.phoneNumber})
                          </option>
                        ))}
                      </select>

                      {booking.assignedMechanicPhone && (
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`tel:+91${booking.assignedMechanicPhone}`}
                            className="min-h-[38px] px-2.5 py-1.5 rounded-xl bg-white border border-neutral-300 hover:border-[#DC2626] text-black text-xs font-extrabold inline-flex items-center gap-1 shadow-2xs"
                            title={`Call mechanic ${booking.assignedMechanicName}`}
                          >
                            <CallIcon className="w-3.5 h-3.5" />
                            <span>Call</span>
                          </a>
                          <a
                            href={`https://wa.me/91${booking.assignedMechanicPhone}?text=${encodeURIComponent(
                              `Hello ${booking.assignedMechanicName}, new doorstep booking assigned to you!\n\nBooking ID: ${booking.bookingId}\nCustomer: ${booking.customerName} (+91 ${booking.phoneNumber})\nVehicle: ${booking.brand} ${booking.model} (${booking.registrationNumber})\nService: ${booking.service} - ${booking.packageName}\nSlot: ${booking.date} (${booking.time})\nAddress: ${booking.address}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-[38px] px-2.5 py-1.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-xs font-extrabold inline-flex items-center gap-1 shadow-2xs"
                            title="Send booking details to mechanic on WhatsApp"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Real-time Push Notification Floating Side Button, Toast & Drawer System */}
      <AdminPushNotificationSystem
        notifications={notifications}
        onMarkAsRead={onMarkNotificationAsRead}
        onMarkAllAsRead={onMarkAllNotificationsAsRead}
        onClearAll={onClearAllNotifications}
        mechanics={mechanics}
        onAssignMechanic={onAssignMechanic}
        onNavigateToBookingTab={() => setActiveAdminSection('bookings')}
        isPushingActive={isPushingActive}
        latestActiveAlert={latestActiveAlert}
        onDismissToast={onDismissToast}
        onRefreshData={onRefreshData}
      />
    </div>
  );
};
