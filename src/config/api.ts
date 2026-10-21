import {
  BookingRecord,
  BookingPushAlert,
  BookingStatus,
  CustomerAccount,
  MechanicRecord,
  StaffAccount,
  SocialLinks,
  BUSINESS_CONFIG,
  INITIAL_MECHANICS,
} from './siteConfig';

const STORAGE_KEY = 'sahaj_capital_automobile_bookings_v1';
const PUSH_NOTIFICATIONS_KEY = 'sca_admin_push_notifications_v1';
const MECHANICS_KEY = 'sahaj_capital_automobile_mechanics_v1';
const STAFF_KEY = 'sca_service_staff_accounts_v1';
const SOCIAL_KEY = 'sahaj_capital_social_links_v1';
const CUSTOMERS_KEY = 'sca_registered_customers_v1';

export interface BootstrapResponse {
  success: boolean;
  bookings: BookingRecord[];
  notifications: BookingPushAlert[];
  mechanics: MechanicRecord[];
  staffAccounts: StaffAccount[];
  socialLinks: SocialLinks;
}

// Helpers for localStorage fallback on static hosts (e.g. GitHub Pages)
function getLocalItem<T>(key: string, fallback: T): T {
  try {
    const val = localStorage.getItem(key);
    if (val) return JSON.parse(val);
  } catch {
    // Ignore
  }
  return fallback;
}

function setLocalItem(key: string, val: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    // Ignore quota errors
  }
}

export const api = {
  // Bootstrap initial state (API first, graceful fallback to local storage for GitHub Pages)
  async getBootstrap(): Promise<BootstrapResponse> {
    try {
      const res = await fetch('/api/bootstrap');
      if (res.ok) {
        const data = await res.json();
        if (data && data.success) return data;
      }
    } catch {
      // Static site hosting (GitHub Pages) fallback
    }

    return {
      success: true,
      bookings: getLocalItem<BookingRecord[]>(STORAGE_KEY, []),
      notifications: getLocalItem<BookingPushAlert[]>(PUSH_NOTIFICATIONS_KEY, []),
      mechanics: getLocalItem<MechanicRecord[]>(MECHANICS_KEY, INITIAL_MECHANICS),
      staffAccounts: getLocalItem<StaffAccount[]>(STAFF_KEY, []),
      socialLinks: getLocalItem<SocialLinks>(SOCIAL_KEY, BUSINESS_CONFIG.socialLinks),
    };
  },

  // Customer authentication (login or register with Customer ID generation)
  async customerAuth(
    name: string,
    email: string,
    phone?: string
  ): Promise<{ success: boolean; customer: CustomerAccount }> {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = (name || '').trim();
    const cleanPhone = (phone || '').trim();

    try {
      const res = await fetch('/api/customer/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: cleanName, email: cleanEmail, phone: cleanPhone }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.customer) return data;
      }
    } catch {
      // Fallback for static host / GitHub Pages
    }

    // Static / Local storage customer management
    const customers = getLocalItem<CustomerAccount[]>(CUSTOMERS_KEY, []);
    let customer = customers.find((c) => c.email.toLowerCase() === cleanEmail);

    const nowStr = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    if (customer) {
      if (cleanName && (!customer.name || customer.name !== cleanName)) {
        customer.name = cleanName;
      }
      if (cleanPhone) {
        customer.phoneNumber = cleanPhone;
      }
      customer.loggedInAt = nowStr;
    } else {
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      const derivedName =
        cleanName ||
        cleanEmail
          .split('@')[0]
          .replace(/[._-]+/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());

      customer = {
        id: `SCA-CUST-${randomDigits}`,
        name: derivedName,
        email: cleanEmail,
        phoneNumber: cleanPhone || undefined,
        loggedInAt: nowStr,
      };
      customers.push(customer);
    }

    setLocalItem(CUSTOMERS_KEY, customers);
    return { success: true, customer };
  },

  // Get customer specific bookings
  async getCustomerBookings(
    email?: string,
    customerId?: string
  ): Promise<BookingRecord[]> {
    try {
      const params = new URLSearchParams();
      if (email) params.set('email', email);
      if (customerId) params.set('customerId', customerId);
      const res = await fetch(`/api/customer/bookings?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.bookings)) return data.bookings;
      }
    } catch {
      // Static fallback
    }

    const all = getLocalItem<BookingRecord[]>(STORAGE_KEY, []);
    return all.filter((b) => {
      if (customerId && b.customerId === customerId) return true;
      if (email && b.customerEmail?.toLowerCase() === email.toLowerCase()) return true;
      return false;
    });
  },

  // Get all bookings (admin view)
  async getBookings(): Promise<BookingRecord[]> {
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.bookings)) return data.bookings;
      }
    } catch {
      // Static fallback
    }

    return getLocalItem<BookingRecord[]>(STORAGE_KEY, []);
  },

  // Create real service booking
  async createBooking(
    booking: Partial<BookingRecord>
  ): Promise<{ success: boolean; booking: BookingRecord; notification: BookingPushAlert }> {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.booking) return data;
      }
    } catch {
      // Fallback for GitHub Pages static site
    }

    const randomRef = Math.floor(10000 + Math.random() * 90000);
    const bookingId = booking.bookingId || `SCA-${randomRef}`;
    const createdDate = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newBooking: BookingRecord = {
      bookingId,
      customerId: booking.customerId,
      customerName: booking.customerName || 'Customer',
      customerEmail: booking.customerEmail,
      phoneNumber: booking.phoneNumber || '',
      vehicleType: booking.vehicleType || 'Motorcycle',
      brand: booking.brand || 'Vehicle',
      model: booking.model || 'Model',
      registrationNumber: (booking.registrationNumber || '').toUpperCase(),
      service: booking.service || 'General Service',
      packageId: booking.packageId || 'basic-bike-service',
      packageName: booking.packageName || 'Service Package',
      packagePrice: Number(booking.packagePrice) || 299,
      date: booking.date || new Date().toISOString().split('T')[0],
      time: booking.time || '9 AM - 11 AM',
      address: booking.address || '',
      specialRequest: booking.specialRequest || 'None',
      status: 'New',
      createdDate,
    };

    const alert: BookingPushAlert = {
      id: `alert-${Date.now()}-${randomRef}`,
      bookingId: newBooking.bookingId,
      customerId: newBooking.customerId,
      customerName: newBooking.customerName,
      customerEmail: newBooking.customerEmail,
      phoneNumber: newBooking.phoneNumber,
      vehicle: `${newBooking.brand} ${newBooking.model} (${newBooking.vehicleType})`,
      service: newBooking.service,
      packageName: newBooking.packageName,
      packagePrice: newBooking.packagePrice,
      date: newBooking.date,
      time: newBooking.time,
      address: newBooking.address,
      timestamp: Date.now(),
      timeDisplay: 'Just now',
      isRead: false,
    };

    // Save to localStorage
    const currentBookings = getLocalItem<BookingRecord[]>(STORAGE_KEY, []);
    setLocalItem(STORAGE_KEY, [newBooking, ...currentBookings]);

    const currentAlerts = getLocalItem<BookingPushAlert[]>(PUSH_NOTIFICATIONS_KEY, []);
    setLocalItem(PUSH_NOTIFICATIONS_KEY, [alert, ...currentAlerts]);

    return { success: true, booking: newBooking, notification: alert };
  },

  // Update booking status
  async updateBookingStatus(bookingId: string, status: BookingStatus): Promise<boolean> {
    try {
      fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      }).catch(() => {});
    } catch {
      // Ignore
    }

    const current = getLocalItem<BookingRecord[]>(STORAGE_KEY, []);
    const updated = current.map((b) => (b.bookingId === bookingId ? { ...b, status } : b));
    setLocalItem(STORAGE_KEY, updated);
    return true;
  },

  // Assign mechanic to booking
  async assignMechanic(bookingId: string, mechanicId: string): Promise<boolean> {
    try {
      fetch(`/api/bookings/${bookingId}/assign`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mechanicId }),
      }).catch(() => {});
    } catch {
      // Ignore
    }

    const mechanics = getLocalItem<MechanicRecord[]>(MECHANICS_KEY, INITIAL_MECHANICS);
    const mech = mechanics.find((m) => m.id === mechanicId);

    const current = getLocalItem<BookingRecord[]>(STORAGE_KEY, []);
    const updated = current.map((b) => {
      if (b.bookingId === bookingId) {
        return {
          ...b,
          assignedMechanicId: mech ? mech.id : undefined,
          assignedMechanicName: mech ? mech.name : undefined,
          assignedMechanicPhone: mech ? mech.phoneNumber : undefined,
          status: mech && (b.status === 'New' || b.status === 'Confirmed') ? 'Assigned' : b.status,
        };
      }
      return b;
    });
    setLocalItem(STORAGE_KEY, updated);

    const notifs = getLocalItem<BookingPushAlert[]>(PUSH_NOTIFICATIONS_KEY, []);
    const updatedNotifs = notifs.map((n) =>
      n.bookingId === bookingId ? { ...n, assignedMechanicName: mech ? mech.name : undefined } : n
    );
    setLocalItem(PUSH_NOTIFICATIONS_KEY, updatedNotifs);

    return true;
  },

  // Delete booking
  async deleteBooking(bookingId: string): Promise<boolean> {
    try {
      fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' }).catch(() => {});
    } catch {
      // Ignore
    }

    const current = getLocalItem<BookingRecord[]>(STORAGE_KEY, []);
    setLocalItem(STORAGE_KEY, current.filter((b) => b.bookingId !== bookingId));

    const notifs = getLocalItem<BookingPushAlert[]>(PUSH_NOTIFICATIONS_KEY, []);
    setLocalItem(PUSH_NOTIFICATIONS_KEY, notifs.filter((n) => n.bookingId !== bookingId));
    return true;
  },

  // Notifications API
  async getNotifications(): Promise<BookingPushAlert[]> {
    try {
      const res = await fetch('/api/notifications');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.notifications)) return data.notifications;
      }
    } catch {
      // Static fallback
    }

    return getLocalItem<BookingPushAlert[]>(PUSH_NOTIFICATIONS_KEY, []);
  },

  async markNotificationAsRead(id: string): Promise<boolean> {
    try {
      fetch(`/api/notifications/${id}/read`, { method: 'PATCH' }).catch(() => {});
    } catch {
      // Ignore
    }

    const notifs = getLocalItem<BookingPushAlert[]>(PUSH_NOTIFICATIONS_KEY, []);
    setLocalItem(
      PUSH_NOTIFICATIONS_KEY,
      notifs.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    return true;
  },

  async markAllNotificationsAsRead(): Promise<boolean> {
    try {
      fetch('/api/notifications/mark-all-read', { method: 'POST' }).catch(() => {});
    } catch {
      // Ignore
    }

    const notifs = getLocalItem<BookingPushAlert[]>(PUSH_NOTIFICATIONS_KEY, []);
    setLocalItem(
      PUSH_NOTIFICATIONS_KEY,
      notifs.map((n) => ({ ...n, isRead: true }))
    );
    return true;
  },

  async clearAllNotifications(): Promise<boolean> {
    try {
      fetch('/api/notifications', { method: 'DELETE' }).catch(() => {});
    } catch {
      // Ignore
    }

    setLocalItem(PUSH_NOTIFICATIONS_KEY, []);
    return true;
  },

  // Mechanics API
  async addMechanic(mechanic: MechanicRecord): Promise<boolean> {
    try {
      fetch('/api/mechanics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mechanic),
      }).catch(() => {});
    } catch {
      // Ignore
    }

    const list = getLocalItem<MechanicRecord[]>(MECHANICS_KEY, INITIAL_MECHANICS);
    setLocalItem(MECHANICS_KEY, [mechanic, ...list]);
    return true;
  },

  async deleteMechanic(id: string): Promise<boolean> {
    try {
      fetch(`/api/mechanics/${id}`, { method: 'DELETE' }).catch(() => {});
    } catch {
      // Ignore
    }

    const list = getLocalItem<MechanicRecord[]>(MECHANICS_KEY, INITIAL_MECHANICS);
    setLocalItem(MECHANICS_KEY, list.filter((m) => m.id !== id));
    return true;
  },

  // Staff API
  async addStaff(staff: StaffAccount): Promise<boolean> {
    try {
      fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(staff),
      }).catch(() => {});
    } catch {
      // Ignore
    }

    const list = getLocalItem<StaffAccount[]>(STAFF_KEY, []);
    setLocalItem(STAFF_KEY, [staff, ...list]);
    return true;
  },

  async deleteStaff(id: string): Promise<boolean> {
    try {
      fetch(`/api/staff/${id}`, { method: 'DELETE' }).catch(() => {});
    } catch {
      // Ignore
    }

    const list = getLocalItem<StaffAccount[]>(STAFF_KEY, []);
    setLocalItem(STAFF_KEY, list.filter((s) => s.id !== id));
    return true;
  },

  // Social Links API
  async updateSocialLinks(links: SocialLinks): Promise<boolean> {
    try {
      fetch('/api/settings/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(links),
      }).catch(() => {});
    } catch {
      // Ignore
    }

    setLocalItem(SOCIAL_KEY, links);
    return true;
  },
};
