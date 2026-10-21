import React, { useState, useEffect } from 'react';
import {
  Bell,
  BellRing,
  X,
  Volume2,
  VolumeX,
  UserCheck,
  PhoneCall,
  MessageCircle,
  Wrench,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import {
  BookingPushAlert,
  BookingRecord,
  MechanicRecord,
  BUSINESS_CONFIG,
} from '../config/siteConfig';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CallIcon } from './CallIcon';

// Synthesize pleasant bell notification sound using Web Audio API
export const playNotificationChime = () => {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Tone 1: High crisp ding (880 Hz to 1174 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now);
    osc1.frequency.exponentialRampToValueAtTime(1174, now + 0.12);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.45);

    // Tone 2: Harmonic warm chime (1174 Hz to 1760 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1174, now + 0.12);
    osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.22);
    gain2.gain.setValueAtTime(0.25, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.65);
  } catch {
    // Ignore audio context errors in restricted environments
  }
};

interface AdminPushNotificationSystemProps {
  notifications: BookingPushAlert[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  mechanics: MechanicRecord[];
  onAssignMechanic: (bookingId: string, mechanicId: string) => void;
  onNavigateToBookingTab: () => void;
  isPushingActive: boolean;
  latestActiveAlert: BookingPushAlert | null;
  onDismissToast: () => void;
  onRefreshData?: () => void;
}

export const AdminPushNotificationSystem: React.FC<
  AdminPushNotificationSystemProps
> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  mechanics,
  onAssignMechanic,
  onNavigateToBookingTab,
  isPushingActive,
  latestActiveAlert,
  onDismissToast,
  onRefreshData,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedMechanicMap, setSelectedMechanicMap] = useState<
    Record<string, string>
  >({});
  const [assignedSuccessMap, setAssignedSuccessMap] = useState<
    Record<string, string>
  >({});

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Auto request browser push permission once if supported
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      Notification.permission === 'default'
    ) {
      // Don't force popup immediately, but check support
    }
  }, []);

  const handleRequestBrowserPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          new Notification('SCA SERVICE Admin Notifications Enabled', {
            body: 'You will receive real-time push alerts when customers book bike servicing.',
            icon: '/favicon.ico',
          });
        }
      } catch {
        // ignore
      }
    }
  };

  const handleAssignClick = (bookingId: string) => {
    const mechId = selectedMechanicMap[bookingId];
    if (!mechId) return;
    onAssignMechanic(bookingId, mechId);
    const mech = mechanics.find((m) => m.id === mechId);
    setAssignedSuccessMap((prev) => ({
      ...prev,
      [bookingId]: mech ? mech.name : 'Assigned',
    }));
    setTimeout(() => {
      setAssignedSuccessMap((prev) => {
        const copy = { ...prev };
        delete copy[bookingId];
        return copy;
      });
    }, 4000);
  };

  return (
    <>
      {/* =========================================================================
          1. FLOATING SIDE PUSH NOTIFICATION BUTTON ("Side Me Push Karne Lage")
          Positioned on the right side edge of the screen, persistently accessible.
          When customer books (isPushingActive or unread > 0), it actively pulses,
          shakes, and rings with high-visibility badges!
      ========================================================================= */}
      <div className="fixed right-3 sm:right-5 top-28 sm:top-36 z-40 flex flex-col items-end gap-2 pointer-events-auto">
        <button
          type="button"
          onClick={() => {
            setIsDrawerOpen(true);
            onDismissToast();
          }}
          aria-label="Open Realtime Push Notifications"
          className={`group flex items-center gap-2.5 px-3 sm:px-4 py-2.5 rounded-2xl border-2 shadow-2xl transition-all cursor-pointer ${
            isPushingActive || unreadCount > 0
              ? 'bg-[#DC2626] hover:bg-red-700 text-white border-white ring-4 ring-red-400/50 animate-pulse'
              : 'bg-white hover:bg-neutral-50 text-black border-red-300'
          }`}
          title="Customer Booking Push Notifications"
        >
          {/* Pulsing indicator ring */}
          <div className="relative flex items-center justify-center">
            {unreadCount > 0 && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            )}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                isPushingActive || unreadCount > 0
                  ? 'bg-white text-[#DC2626]'
                  : 'bg-red-100 text-[#DC2626]'
              }`}
            >
              {isPushingActive || unreadCount > 0 ? (
                <BellRing className="w-5 h-5 animate-bounce" />
              ) : (
                <Bell className="w-4 h-4" />
              )}
            </div>
          </div>

          <div className="text-left hidden sm:block">
            <span
              className={`text-[10px] font-extrabold uppercase tracking-wider block ${
                isPushingActive || unreadCount > 0 ? 'text-white' : 'text-neutral-500'
              }`}
            >
              Push Notification
            </span>
            <span
              className={`text-xs font-extrabold flex items-center gap-1 ${
                isPushingActive || unreadCount > 0 ? 'text-white' : 'text-black'
              }`}
            >
              {unreadCount > 0
                ? `${unreadCount} New Booking${unreadCount > 1 ? 's' : ''}`
                : 'Booking Alerts'}
            </span>
          </div>

          {/* Badge count */}
          {unreadCount > 0 && (
            <span className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-white text-[#DC2626] text-xs font-extrabold flex items-center justify-center border border-red-200 shadow-xs">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Small hint label when active */}
        {isPushingActive && (
          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#DC2626] text-white shadow-xs animate-bounce hidden sm:inline-block">
            🚨 New Booking Pushed!
          </span>
        )}
      </div>

      {/* =========================================================================
          2. SLIDE-IN TOAST ALERT (Appears immediately when customer books)
      ========================================================================= */}
      {latestActiveAlert && (
        <div className="fixed top-20 right-3 sm:right-6 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-3xl border-2 border-[#DC2626] shadow-2xl p-4 sm:p-5 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#DC2626] text-white flex items-center justify-center shadow-xs shrink-0 animate-bounce">
                <BellRing className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="inline-block px-2 py-0.5 rounded-md bg-red-100 text-[#DC2626] text-[10px] font-extrabold uppercase tracking-wider mb-0.5">
                  🔔 New Doorstep Booking Alert
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-black leading-tight">
                  {latestActiveAlert.customerName}
                </h3>
                <p className="text-xs font-bold text-neutral-600">
                  +91 {latestActiveAlert.phoneNumber}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onDismissToast}
              aria-label="Dismiss toast"
              className="w-7 h-7 rounded-lg border border-neutral-300 hover:border-red-500 hover:bg-red-50 text-black flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-black space-y-1">
            <div className="font-extrabold text-black">
              🏍️ {latestActiveAlert.vehicle} · {latestActiveAlert.service}
            </div>
            <div className="text-neutral-600 font-semibold">
              Slot: {latestActiveAlert.date} ({latestActiveAlert.time})
            </div>
            <div className="text-neutral-500 truncate text-[11px]">
              📍 {latestActiveAlert.address}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsDrawerOpen(true);
                onDismissToast();
              }}
              className="flex-1 min-h-[38px] px-3 py-1.5 rounded-xl bg-[#DC2626] hover:bg-red-700 text-white font-extrabold text-xs inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Assign Mechanic Now</span>
            </button>

            <a
              href={`tel:+91${latestActiveAlert.phoneNumber}`}
              className="min-h-[38px] px-3 py-1.5 rounded-xl bg-white hover:bg-red-50 border border-neutral-300 text-black font-extrabold text-xs inline-flex items-center justify-center gap-1"
            >
              <CallIcon className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>
          </div>
        </div>
      )}

      {/* =========================================================================
          3. FULL PUSH NOTIFICATION DRAWER / SLIDE-OVER PANEL
      ========================================================================= */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Booking Push Notifications"
        >
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l-2 border-[#DC2626] animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-5 border-b border-neutral-200 bg-gradient-to-r from-red-50 via-white to-red-50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#DC2626] text-white flex items-center justify-center shadow-xs">
                  <BellRing className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-black leading-tight flex items-center gap-1.5">
                    <span>Live Booking Push Alerts</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#DC2626] text-white text-[11px] font-extrabold">
                        {unreadCount} New
                      </span>
                    )}
                  </h2>
                  <p className="text-xs font-semibold text-neutral-600">
                    Real-time customer service notifications
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close drawer"
                className="w-9 h-9 rounded-xl border border-neutral-300 hover:border-[#DC2626] hover:bg-red-50 text-black flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="px-5 py-3 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-bold inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Real Customer Bookings Only</span>
                </span>

                {onRefreshData && (
                  <button
                    type="button"
                    onClick={onRefreshData}
                    className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-red-50 border border-neutral-300 text-black text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    title="Refresh live bookings from server"
                  >
                    <span>Refresh</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-300 text-black font-semibold inline-flex items-center gap-1 cursor-pointer"
                  title="Toggle notification chime sound"
                >
                  {soundEnabled ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#DC2626]" />
                      <span>Sound On</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Muted</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={onMarkAllAsRead}
                    className="font-bold text-[#DC2626] hover:underline cursor-pointer"
                  >
                    Mark All Read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearAll}
                    className="text-neutral-500 hover:text-black cursor-pointer font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* System Push Permission helper if not granted */}
            {typeof window !== 'undefined' &&
              'Notification' in window &&
              Notification.permission !== 'granted' && (
                <div className="p-3.5 bg-red-50 border-b border-red-200 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#DC2626] shrink-0" />
                    <span className="font-semibold text-black">
                      Allow browser push notifications for booking sound &amp; popups
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRequestBrowserPermission}
                    className="px-2.5 py-1 rounded-lg bg-[#DC2626] text-white font-extrabold shrink-0 hover:bg-red-700 cursor-pointer"
                  >
                    Enable
                  </button>
                </div>
              )}

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {notifications.length === 0 ? (
                <div className="text-center py-12 px-4 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto text-[#DC2626]">
                    <Bell className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-extrabold text-black">
                    No Customer Booking Alerts Yet
                  </h3>
                  <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                    When a customer submits a service booking using their customer account, real-time push alerts will ring and appear here automatically.
                  </p>
                </div>
              ) : (
                notifications.map((alert) => (
                  <div
                    key={alert.id}
                    className={`rounded-2xl border p-4 space-y-3 transition-all ${
                      !alert.isRead
                        ? 'bg-red-50/70 border-[#DC2626] shadow-xs'
                        : 'bg-white border-neutral-300'
                    }`}
                  >
                    {/* Header line */}
                    <div className="flex items-start justify-between gap-2 border-b border-neutral-200 pb-2">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <span className="font-mono font-extrabold text-xs text-[#DC2626]">
                            {alert.bookingId}
                          </span>
                          {alert.customerId && (
                            <span className="px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-300 text-black text-[10px] font-mono font-bold">
                              ID: {alert.customerId}
                            </span>
                          )}
                          {!alert.isRead && (
                            <span className="px-1.5 py-0.2 rounded bg-[#DC2626] text-white text-[9px] font-black uppercase">
                              NEW
                            </span>
                          )}
                          <span className="text-[10px] text-neutral-500 font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{alert.timeDisplay}</span>
                          </span>
                        </div>
                        <h4 className="text-sm font-extrabold text-black mt-1 truncate">
                          {alert.customerName} · +91 {alert.phoneNumber}
                        </h4>
                        {alert.customerEmail && (
                          <p className="text-[11px] font-semibold text-neutral-600 truncate">
                            Email: {alert.customerEmail}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <a
                          href={`tel:+91${alert.phoneNumber}`}
                          aria-label="Call customer"
                          className="w-8 h-8 rounded-lg bg-white border border-neutral-300 hover:border-[#DC2626] hover:bg-red-50 text-black flex items-center justify-center transition-colors"
                        >
                          <CallIcon className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`https://wa.me/91${alert.phoneNumber}?text=${encodeURIComponent(
                            `Hello ${alert.customerName}, regarding your booking ${alert.bookingId} at Sahaj Capital Automobile.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="WhatsApp customer"
                          className="w-8 h-8 rounded-lg bg-white border border-neutral-300 hover:border-green-500 hover:bg-green-50 text-black flex items-center justify-center transition-colors"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="text-xs text-neutral-800 space-y-1">
                      <p className="font-bold text-black">
                        🏍️ {alert.vehicle} · {alert.packageName}
                      </p>
                      <p className="text-neutral-600 font-medium">
                        📅 Preferred: {alert.date} ({alert.time}) · Starting ₹{alert.packagePrice}
                      </p>
                      <p className="text-neutral-500 text-[11px] truncate">
                        📍 {alert.address}
                      </p>
                    </div>

                    {/* Mechanic Assignment Block */}
                    <div className="pt-2 border-t border-neutral-200">
                      {alert.assignedMechanicName ? (
                        <div className="p-2.5 rounded-xl bg-green-50 border border-green-300 flex items-center justify-between text-xs">
                          <span className="font-extrabold text-green-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span>Assigned: {alert.assignedMechanicName}</span>
                          </span>
                          <span className="text-[10px] text-green-700 font-bold">
                            On Duty
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-extrabold text-[#DC2626] flex items-center gap-1">
                              <Wrench className="w-3 h-3" />
                              <span>Assign Mechanic Now:</span>
                            </span>
                            {assignedSuccessMap[alert.bookingId] && (
                              <span className="text-green-700 font-extrabold">
                                ✓ Assigned to {assignedSuccessMap[alert.bookingId]}!
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={selectedMechanicMap[alert.bookingId] || ''}
                              onChange={(e) =>
                                setSelectedMechanicMap((prev) => ({
                                  ...prev,
                                  [alert.bookingId]: e.target.value,
                                }))
                              }
                              className="flex-1 min-h-[36px] px-2.5 py-1 rounded-xl border border-neutral-300 bg-white text-xs font-semibold text-black focus:outline-none focus:ring-1 focus:ring-[#DC2626]"
                            >
                              <option value="">Select Mechanic...</option>
                              {mechanics.map((m) => (
                                <option key={m.id} value={m.id}>
                                  {m.name} ({m.specialization.split(',')[0]})
                                </option>
                              ))}
                            </select>

                            <button
                              type="button"
                              onClick={() => handleAssignClick(alert.bookingId)}
                              disabled={!selectedMechanicMap[alert.bookingId]}
                              className={`min-h-[36px] px-3 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                                selectedMechanicMap[alert.bookingId]
                                  ? 'bg-[#DC2626] text-white hover:bg-red-700 shadow-2xs'
                                  : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                              }`}
                            >
                              Assign
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {!alert.isRead && (
                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={() => onMarkAsRead(alert.id)}
                          className="text-[10px] text-neutral-500 hover:text-black font-semibold cursor-pointer"
                        >
                          Mark as Read
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between shrink-0 text-xs">
              <button
                type="button"
                onClick={() => {
                  setIsDrawerOpen(false);
                  onNavigateToBookingTab();
                }}
                className="font-extrabold text-[#DC2626] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>View In Master Bookings Table</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="px-4 py-2 rounded-xl bg-white border border-neutral-300 font-extrabold text-black hover:bg-neutral-100 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
