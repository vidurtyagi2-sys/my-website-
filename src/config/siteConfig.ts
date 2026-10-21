/**
 * Central Configuration & Data Store for SAHAJ CAPITAL AUTOMOBILE
 * Modify prices, contact details, service packages, and vehicle lists from this single file.
 */

import heroBikeImg from '../assets/images/hero_bike_service_1791269060642.jpg';
import promoDoorstepImg from '../assets/images/promo_doorstep_service_1791269071729.jpg';
import commuterBikeImg from '../assets/images/package_commuter_bike_1791269082629.jpg';
import cruiserSportsImg from '../assets/images/package_cruiser_sports_bike_1791269093522.jpg';
import splendorPlusImg from '../assets/images/hero_splendor_plus_1791401900869.jpg';
import apacheRtrWhiteImg from '../assets/images/apache_rtr_white_1791402091869.jpg';
import bulletClassic350Img from '../assets/images/bullet_classic_350_1791402449382.jpg';
import jawaBobberImg from '../assets/images/jawa_bobber_bike_1791402466285.jpg';
import ktmDukeYellowImg from '../assets/images/ktm_duke_yellow_1791402477936.jpg';

export const VISUAL_ASSETS = {
  heroBanner: heroBikeImg,
  promoBanner: promoDoorstepImg,
  splendorPlusPackage: splendorPlusImg,
  apacheRtrWhitePackage: apacheRtrWhiteImg,
  bulletClassic350Package: bulletClassic350Img,
  jawaBobberPackage: jawaBobberImg,
  ktmDukeYellowPackage: ktmDukeYellowImg,
  commuterPackage: commuterBikeImg,
  cruiserPackage: cruiserSportsImg,
};

export const BUSINESS_CONFIG = {
  appName: 'SCA SERVICE',
  name: 'SAHAJ CAPITAL AUTOMOBILE',
  shortName: 'SCA SERVICE',
  tagline: 'Always committed to service',
  trustBadge: 'Trusted Automobile Service',
  phoneDisplay: '095489 84717',
  phoneRaw: '+919548984717',
  whatsappRaw: '919548984717',
  whatsappDefaultMessage:
    'Hello SAHAJ CAPITAL AUTOMOBILE, I would like to book a service for my vehicle.',
  email: 'sahajcapitalautomobile@zohomail.in',
  supportEmail: 'sahajcapitalautomobile@zohomail.in',
  adminAuth: {
    adminId: 'sahajcapitalautomobile@zohomail.in',
    alternateId: 'admin',
    password: 'sca@2026',
  },
  address: {
    line1: 'Corporate Office: 6-Floor, 605, TOWER C, Gardenia Square',
    line2: 'Crossings Republik, Ghaziabad',
    city: 'Uttar Pradesh',
    pincode: '201016',
    full: 'Corporate Office: 6-Floor, 605, TOWER C ,Gardenia Square, Crossings Republik, Ghaziabad, Uttar Pradesh 201016',
  },
  workingHours: {
    days: 'Monday – Sunday (All 7 Days Open)',
    timings: '8:30 AM – 8:00 PM',
    doorstepTimings: '9:00 AM – 7:00 PM',
    emergencyNote: 'Express breakdown & doorstep pickup available across Ghaziabad & NCR.',
  },
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=6-Floor+605+TOWER+C+Gardenia+Square+Crossings+Republik+Ghaziabad+Uttar+Pradesh+201016',
  socialLinks: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    youtube: 'https://www.youtube.com/',
    linkedin: 'https://www.linkedin.com/',
  },
  stats: [
    {
      value: '10,000+',
      label: 'Happy Customers',
      context: 'Across doorstep & workshop bays',
    },
    {
      value: '4.7/5',
      label: 'Customer Rating',
      context: 'Verified post-service feedback',
    },
    {
      value: '10+ Years',
      label: 'Of Experience',
      context: 'Certified two-wheeler & car technicians',
    },
  ],
  highlights: [
    {
      id: 'mechanics',
      title: 'Expert Mechanics',
      description:
        'Factory-trained technicians skilled across commuter bikes, premium cruisers, scooters, and multi-brand cars.',
      iconName: 'Wrench',
    },
    {
      id: 'parts',
      title: '10 Days Service Warranty',
      description:
        'Assured 10 days post-service workmanship warranty with free inspection and support if any issue arises.',
      iconName: 'ShieldCheck',
    },
    {
      id: 'doorstep',
      title: 'Best Customer Support',
      description:
        'Dedicated service helpline and fast customer support before, during, and after your vehicle servicing.',
      iconName: 'PhoneCall',
    },
  ],
  specialOffer: {
    code: 'SAHAJFIRST',
    headline: 'Special Offers',
    title: 'Flat ₹100 OFF on Periodic Doorstep Bike Service + Free 20-Point Safety Check',
    subtitle:
      'Applicable on all periodic service packages booked online this week. Includes complimentary chain lubrication and battery voltage test.',
    ctaText: 'Book Now & Save',
  },
};

/**
 * Central Pricing Configuration
 * Edit any package price here and it automatically updates across Home, Packages, Checklist Modal, and Booking Form.
 */
export const PACKAGE_PRICES: Record<string, number> = {
  'basic-bike-service': 299,
  'classic-bike-service': 399,
  'premium-bike-service': 499,
  'royal-bike-service': 599,
  'sports-bike-service': 999,
};

export interface ServiceItem {
  id: string;
  title: string;
  serviceTypeValue: string;
  shortDesc: string;
  duration: string;
  startingPrice: number;
  iconName: string;
  recommendedPackageId: string;
}

export const HOME_SERVICES: ServiceItem[] = [
  {
    id: 'instant-booking-confirmation',
    title: 'Instant Booking Confirmation',
    serviceTypeValue: 'General Service',
    shortDesc: 'Book online or via call – slot secured instantly',
    duration: 'Instant Slot',
    startingPrice: PACKAGE_PRICES['basic-bike-service'],
    iconName: 'CalendarCheck',
    recommendedPackageId: 'basic-bike-service',
  },
  {
    id: 'comprehensive-bike-inspection',
    title: 'Comprehensive Bike Inspection',
    serviceTypeValue: 'General Service',
    shortDesc: '360° expert check for accurate issue identification',
    duration: '360° Check',
    startingPrice: PACKAGE_PRICES['basic-bike-service'],
    iconName: 'SearchCheck',
    recommendedPackageId: 'basic-bike-service',
  },
  {
    id: 'material-availability-verification',
    title: 'Material Availability Verification',
    serviceTypeValue: 'Spare Parts',
    shortDesc: 'We verify stock to minimize any delays',
    duration: 'Zero Delay',
    startingPrice: PACKAGE_PRICES['basic-bike-service'],
    iconName: 'ClipboardCheck',
    recommendedPackageId: 'basic-bike-service',
  },
  {
    id: 'oem-material-sourcing',
    title: 'OEM Material Sourcing',
    serviceTypeValue: 'Spare Parts',
    shortDesc: 'Genuine OEM parts – 100% perfect quality & fit',
    duration: '100% Genuine',
    startingPrice: PACKAGE_PRICES['basic-bike-service'],
    iconName: 'Cog',
    recommendedPackageId: 'classic-bike-service',
  },
  {
    id: 'transparent-total-costing',
    title: 'Transparent Total Costing',
    serviceTypeValue: 'General Service',
    shortDesc: 'Full breakdown upfront – no hidden fees',
    duration: 'Upfront Quote',
    startingPrice: PACKAGE_PRICES['basic-bike-service'],
    iconName: 'Receipt',
    recommendedPackageId: 'basic-bike-service',
  },
  {
    id: 'customer-approval',
    title: 'Customer Approval',
    serviceTypeValue: 'General Service',
    shortDesc: 'Work starts only after your OK',
    duration: '100% Control',
    startingPrice: PACKAGE_PRICES['basic-bike-service'],
    iconName: 'ThumbsUp',
    recommendedPackageId: 'basic-bike-service',
  },
  {
    id: 'work-execution-video-proof',
    title: 'Work Execution with Video Proof',
    serviceTypeValue: 'General Service',
    shortDesc: 'Every step recorded and shared',
    duration: 'Video Proof',
    startingPrice: PACKAGE_PRICES['basic-bike-service'],
    iconName: 'Video',
    recommendedPackageId: 'classic-bike-service',
  },
  {
    id: 'seamless-bike-handover',
    title: 'Seamless Bike Handover',
    serviceTypeValue: 'General Service',
    shortDesc: 'Bike returned clean and ready to ride',
    duration: 'Ready to Ride',
    startingPrice: PACKAGE_PRICES['basic-bike-service'],
    iconName: 'Bike',
    recommendedPackageId: 'basic-bike-service',
  },
];

export interface ServicePackage {
  id: string;
  name: string;
  ccCategory: string;
  suitableModelsExample: string;
  price: number;
  image: string;
  estimatedTime: string;
  warranty: string;
  summaryPoints: string[];
  detailedChecklist: {
    category: string;
    items: string[];
  }[];
  whatsIncluded: string[];
  whatsNotIncluded: string[];
}

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'basic-bike-service',
    name: 'Basic Bike Service (At-Home Regular Service)',
    ccCategory: 'Below 125 CC',
    suitableModelsExample: 'Hero Splendor+, HF Deluxe, Honda Activa 110, Shine 100, TVS Jupiter, Bajaj Platina',
    price: PACKAGE_PRICES['basic-bike-service'],
    image: VISUAL_ASSETS.splendorPlusPackage,
    estimatedTime: '45 – 60 Minutes at Doorstep',
    warranty: '10 Days Service Warranty',
    summaryPoints: [
      'Engine Oil Change',
      'Oil Filter Check/Clean',
      'Air Filter Clean',
      'Spark Plug Check',
      'General Inspection',
    ],
    detailedChecklist: [
      {
        category: 'At-Home Regular Service (Below 125 CC)',
        items: [
          'Basic Fork Inspection',
          'Basic Hand Cleaning',
          'Basic Engine Inspection',
          'Minor Electrical Check-up',
          'Battery General Check-up',
          'Driven Chain Basic Cleaning',
          'Carburettor Basic Check-up',
          'Brakes – Front & Rear Adjust',
          'Tightening of Screws, Bolts & Nuts',
          'Average and Performance Check-up',
          'Tyre Air Fill (only tubeless)',
          'Engine Oil Change (Price Extra)',
          'Oil Filter Clean (if Replace Charges)',
          'Air Filter Clean (if Replace Charges)',
          'Spark Plug Clean (if Replace Charges)',
          'Free Pick and Drop(if needed)',
        ],
      },
    ],
    whatsIncluded: [
      'Complete At-Home Regular Service (16-Point Checklist)',
      'Brakes – Front & Rear Adjust & Tightening of Screws, Bolts & Nuts',
      'Average and Performance Check-up & Driven Chain Basic Cleaning',
      'Free Pick and Drop(if needed)',
    ],
    whatsNotIncluded: [
      'Engine Oil Change (Price Extra)',
      'Oil Filter / Air Filter / Spark Plug Replacement Charges (if replaced)',
      'Major engine dismantling or accidental body work',
    ],
  },
  {
    id: 'classic-bike-service',
    name: 'Classic Bike Service (At-Home Classic Service)',
    ccCategory: '125 CC to 199 CC',
    suitableModelsExample: 'Honda SP 125, Unicorn, Bajaj Pulsar 150/180, TVS Apache RTR 160, Yamaha FZ-S, Hero Xtreme',
    price: PACKAGE_PRICES['classic-bike-service'],
    image: VISUAL_ASSETS.apacheRtrWhitePackage,
    estimatedTime: '60 – 75 Minutes at Doorstep',
    warranty: '10 Days Service Warranty',
    summaryPoints: [
      'Engine Oil Change',
      'Oil Filter Check/Clean',
      'Air Filter Clean',
      'Spark Plug Check',
      'Brake Inspection',
      'Chain Inspection',
    ],
    detailedChecklist: [
      {
        category: 'At-Home Classic Service (125 CC to 199 CC)',
        items: [
          'Coolant Check-up',
          'Basic Hand Cleaning',
          'Oiling and Greasing',
          'Battery General Check-up',
          'Basic Engine Inspection',
          'Basic Fork Inspection',
          'Carburettor Basic Check-up',
          'Minor Electrical Check-up',
          'Brakes – Front & Rear Adjust',
          'Driven Chain Basic Cleaning',
          'Tightening of Screws, Bolts & Nuts',
          'Average and Performance Check-up',
          'Engine Oil Change (Price Extra)',
          'Oil Filter Clean (if Replace Charges)',
          'Air Filter Clean (if Replace Charges)',
          'Spark Plug Clean (if Replace Charges)',
          'Tyre Air Fill (only tubeless)',
          'Free Pick and Drop(if needed)',
        ],
      },
    ],
    whatsIncluded: [
      'Complete At-Home Classic Service (18-Point Checklist)',
      'Coolant Check-up, Oiling and Greasing & Driven Chain Basic Cleaning',
      'Brakes – Front & Rear Adjust & Tightening of Screws, Bolts & Nuts',
      'Free Pick and Drop(if needed)',
    ],
    whatsNotIncluded: [
      'Engine Oil Change (Price Extra)',
      'Oil Filter / Air Filter / Spark Plug Replacement Charges (if replaced)',
      'Major engine dismantling or accidental body work',
    ],
  },
  {
    id: 'premium-bike-service',
    name: 'Premium Bike Service (At-Home Premium Service)',
    ccCategory: '200 CC to 299 CC',
    suitableModelsExample: 'Bajaj Pulsar NS200 / N250, KTM Duke 200/250, TVS Apache RTR 200 4V, Yamaha R15 / MT-15, Suzuki Gixxer 250',
    price: PACKAGE_PRICES['premium-bike-service'],
    image: VISUAL_ASSETS.bulletClassic350Package,
    estimatedTime: '75 – 90 Minutes',
    warranty: '10 Days Service Warranty',
    summaryPoints: [
      'Engine Oil Change',
      'Oil Filter Check/Clean',
      'Air Filter Clean',
      'Spark Plug Check',
      'Brake Inspection',
      'Chain Lubrication',
      'Full Vehicle Inspection',
    ],
    detailedChecklist: [
      {
        category: 'At-Home Premium Service (200 CC to 299 CC)',
        items: [
          'Coolant Check-up',
          'Injector Check-up',
          'Basic Hand Cleaning',
          'Oiling and Greasing',
          'Battery General Check-up',
          'Basic Engine Inspection',
          'Fuel Pump Motor Check-up',
          'Basic Fork Inspection',
          'Brakes – Front & Rear Adjust',
          'Driven Chain Basic Cleaning',
          'Carburettor Basic Check-up',
          'Minor Electrical Check-up',
          'Tightening of Screws, Bolts & Nuts',
          'Average and Performance Check-up',
          'Tyre Air Fill (only tubeless)',
          'Engine Oil Change (Price Extra)',
          'Oil Filter Clean (if Replace Charges)',
          'Air Filter Clean (if Replace Charges)',
          'Spark Plug Clean (if Replace Charges)',
          'Free Pick and Drop(if needed)',
        ],
      },
    ],
    whatsIncluded: [
      'Complete At-Home Premium Service (20-Point Checklist)',
      'Injector Check-up, Fuel Pump Motor Check-up & Coolant Check-up',
      'Brakes – Front & Rear Adjust & Tightening of Screws, Bolts & Nuts',
      'Free Pick and Drop(if needed)',
    ],
    whatsNotIncluded: [
      'Engine Oil Change (Price Extra)',
      'Oil Filter / Air Filter / Spark Plug Replacement Charges (if replaced)',
      'Major engine dismantling or accidental body work',
    ],
  },
  {
    id: 'royal-bike-service',
    name: 'Royal Bike Service',
    ccCategory: 'For 300 CC – 349 CC',
    suitableModelsExample: 'Royal Enfield Classic 350, Bullet 350, Meteor 350, Hunter 350, Honda H’ness CB350, Jawa 42',
    price: PACKAGE_PRICES['royal-bike-service'],
    image: VISUAL_ASSETS.jawaBobberPackage,
    estimatedTime: '90 – 110 Minutes',
    warranty: '30 Days / 1,500 KM Service Workmanship Guarantee',
    summaryPoints: [
      'Engine Oil Change',
      'Oil Filter Check/Clean',
      'Air Filter Clean',
      'Spark Plug Check',
      'Brake Inspection',
      'Chain Service',
      'Complete Inspection',
    ],
    detailedChecklist: [
      {
        category: 'Cruiser Engine & Filtration',
        items: [
          'Complete engine oil drain, strainer screen clean & refill labour',
          'Oil filter element & housing gasket replacement labour',
          'Air filter element cleaning & breather pipe check',
          'Twin/single spark plug inspection & compression feel check',
        ],
      },
      {
        category: 'Heavy-Duty Chain, Brakes & Wheels',
        items: [
          'Complete drive chain degreasing, sprocket teeth check & lube',
          'Front & rear ABS disc brake pad cleaning & fluid check',
          'Spoke wheel tension / alloy rim check & axle greasing',
          'Clutch cable, accelerator cable & lever pivot lubrication',
        ],
      },
      {
        category: 'Cruiser Vibration & Torque Care',
        items: [
          'Engine mounting bolts & chassis fastener anti-vibration retorquing',
          'Steering cone-set play inspection',
          'Complete electrical, battery charging & EFI sensor check',
        ],
      },
    ],
    whatsIncluded: [
      'Royal Enfield & Cruiser specialist mechanic service',
      'Complete anti-vibration fastener retorquing across chassis',
      'Full chain degreasing, tension calibration & lubrication',
      'Complete 35-point cruiser inspection & polish wipe',
    ],
    whatsNotIncluded: [
      'Engine oil (2.0L–2.5L), oil filter & spare parts cost',
      'Tappet noise adjustment requiring head cover gasket replacement',
      'Chrome buffing or dent/paint restoration',
    ],
  },
  {
    id: 'sports-bike-service',
    name: 'Sports Bike Service (At-Home Sports Service)',
    ccCategory: 'Above 350 CC',
    suitableModelsExample: 'KTM Duke 390 / RC 390, Bajaj Dominar 400, Royal Enfield Interceptor 650 / Himalayan 450, Aprilia RS 457, Kawasaki Ninja',
    price: PACKAGE_PRICES['sports-bike-service'],
    image: VISUAL_ASSETS.ktmDukeYellowPackage,
    estimatedTime: '120 – 150 Minutes',
    warranty: '10 Days Service Warranty',
    summaryPoints: [
      'Engine Oil Change',
      'Oil Filter Check/Clean',
      'Air Filter Clean',
      'Spark Plug Check',
      'Brake Inspection',
      'Chain Service',
      'Complete Performance Inspection',
    ],
    detailedChecklist: [
      {
        category: 'At-Home Sports Service (Above 350 CC)',
        items: [
          'Injector Check-up',
          'Coolant Check-up',
          'Basic Hand Cleaning',
          'Oiling and Greasing',
          'Basic Engine Inspection',
          'Fuel Pump Motor Check-up',
          'Basic Fork Inspection',
          'Minor Electrical Check-up',
          'Battery General Check-up',
          'Driven Chain Basic Cleaning',
          'Carburettor Basic Check-up',
          'Brakes – Front & Rear Adjust',
          'Tightening of Screws, Bolts & Nuts',
          'Average and Performance Check-up',
          'Tyre Air Fill (only tubeless)',
          'Engine Oil Change (Price Extra)',
          'Oil Filter Clean (if Replace Charges)',
          'Air Filter Clean (if Replace Charges)',
          'Spark Plug Clean (if Replace Charges)',
          'Free Pick and Drop(if needed)',
        ],
      },
    ],
    whatsIncluded: [
      'Complete At-Home Sports Service (20-Point Checklist)',
      'Injector Check-up, Fuel Pump Motor Check-up & Coolant Check-up',
      'Brakes – Front & Rear Adjust & Tightening of Screws, Bolts & Nuts',
      'Free Pick and Drop(if needed)',
    ],
    whatsNotIncluded: [
      'Engine Oil Change (Price Extra)',
      'Oil Filter / Air Filter / Spark Plug Replacement Charges (if replaced)',
      'Major engine dismantling or accidental body work',
    ],
  },
];

export const VEHICLE_TYPES = ['Motorcycle', 'Scooter', 'Car', 'Other'] as const;

export const VEHICLE_BRANDS = [
  'Hero',
  'Honda',
  'Bajaj',
  'TVS',
  'Yamaha',
  'Royal Enfield',
  'Suzuki',
  'KTM',
  'Aprilia',
  'Vespa',
  'Mahindra',
  'Other',
] as const;

export const VEHICLE_MODELS_BY_BRAND: Record<string, string[]> = {
  Hero: ['Splendor Plus', 'HF Deluxe', 'Passion Pro', 'Glamour 125', 'Super Splendor', 'Xtreme 160R', 'XPulse 200 4V', 'Destini 125', 'Pleasure+'],
  Honda: ['Activa 6G / 110', 'Activa 125', 'Dio', 'Shine 125', 'SP 125', 'Unicorn 160', 'Hornet 2.0', 'H’ness CB350', 'CB350RS', 'City / Amaze (Car)'],
  Bajaj: ['Pulsar 125', 'Pulsar 150', 'Pulsar NS160', 'Pulsar NS200', 'Pulsar N160 / N250', 'Dominar 250 / 400', 'Avenger 160 / 220', 'Platina 100 / 110', 'CT 110X', 'Chetak Electric'],
  TVS: ['Apache RTR 160 2V / 4V', 'Apache RTR 200 4V', 'Apache RR 310', 'Raider 125', 'Jupiter 110 / 125', 'NTORQ 125', 'Ronin 225', 'Sport / Radeon', 'iQube'],
  Yamaha: ['FZ-S FI V3 / V4', 'FZ-X', 'R15 V3 / V4 / M', 'MT-15 V2', 'Aerox 155', 'Fascino 125', 'RayZR 125'],
  'Royal Enfield': ['Classic 350', 'Bullet 350', 'Hunter 350', 'Meteor 350', 'Himalayan 411 / 450', 'Thunderbird 350', 'Interceptor 650', 'Continental GT 650', 'Super Meteor 650'],
  Suzuki: ['Access 125', 'Burgman Street 125', 'Avenis 125', 'Gixxer 155 / SF', 'Gixxer 250 / SF 250', 'V-Strom SX 250', 'Swift / Baleno / Brezza (Car)'],
  KTM: ['Duke 125', 'Duke 200', 'Duke 250', 'Duke 390', 'RC 200', 'RC 390', '390 Adventure'],
  Aprilia: ['SR 125', 'SR 160', 'SXR 160', 'RS 457'],
  Vespa: ['VXL 125', 'SXL 125', 'VXL 150', 'SXL 150', 'Elegante'],
  Mahindra: ['Centuro', 'Mojo 300', 'Gusto', 'Scorpio / XUV700 / Thar (Car)'],
  Other: ['Custom / Imported Motorcycle', 'Electric Scooter', 'Hatchback / Sedan / SUV Car', 'Other Two-Wheeler'],
};

export const SERVICE_TYPES = [
  'General Service',
  'Engine Work',
  'Oil Change',
  'Brake Service',
  'Electrical Work',
  'Tyre Service',
  'Battery Service',
  'Spare Parts',
  'Other',
] as const;

export const PREFERRED_TIME_SLOTS = [
  '9 AM - 11 AM',
  '11 AM - 1 PM',
  '1 PM - 3 PM',
  '3 PM - 5 PM',
  '5 PM - 7 PM',
] as const;

export const CUSTOMER_TESTIMONIALS = [
  {
    id: 'rev-1',
    name: 'Rajesh Sharma',
    vehicle: 'Royal Enfield Classic 350 · Dwarka, New Delhi',
    rating: 5,
    outcome: 'Doorstep Royal Service completed in 95 mins',
    comment:
      'Booked the Royal Bike Service at 9 AM. The mechanic arrived on time with complete tools and genuine Royal Enfield oil filter. Chain noise and brake squeak are completely gone.',
  },
  {
    id: 'rev-2',
    name: 'Ankit Verma',
    vehicle: 'Bajaj Pulsar NS200 · Sector 62, Noida',
    rating: 5,
    outcome: 'Saved 3 hours of weekend workshop waiting',
    comment:
      'Very transparent pricing from SAHAJ CAPITAL AUTOMOBILE. Starting ₹499 package covered full inspection, coolant check, and chain lubrication right in my apartment parking.',
  },
  {
    id: 'rev-3',
    name: 'Priya Nair',
    vehicle: 'Honda Activa 125 · Indirapuram',
    rating: 5,
    outcome: 'Self-start & periodic service resolved same day',
    comment:
      'My scooter had cold-start issues every morning. Their technician cleaned the air filter, checked the battery charging voltage, and completed full periodic service politely.',
  },
];

export type BookingStatus =
  | 'New'
  | 'Confirmed'
  | 'Assigned'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export const BOOKING_STATUS_OPTIONS: BookingStatus[] = [
  'New',
  'Confirmed',
  'Assigned',
  'In Progress',
  'Completed',
  'Cancelled',
];

export interface StaffAccount {
  id: string;
  name: string;
  loginId: string;
  password: string;
  role: string;
  createdAt: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
}

export interface CustomerAccount {
  id?: string;
  name: string;
  email: string;
  phoneNumber?: string;
  loggedInAt: string;
}

export interface MechanicRecord {
  id: string;
  name: string;
  phoneNumber: string;
  specialization: string;
  experienceYears?: string;
  status: 'Available' | 'On Duty' | 'Inactive';
  joinedDate: string;
}

export const INITIAL_MECHANICS: MechanicRecord[] = [
  {
    id: 'mech-1',
    name: 'Rajesh Sharma',
    phoneNumber: '9871234567',
    experienceYears: '8 Years',
    specialization: 'Royal Enfield, Classic 350 & Cruiser Specialist',
    status: 'Available',
    joinedDate: '15 Jan 2024',
  },
  {
    id: 'mech-2',
    name: 'Sunil Verma',
    phoneNumber: '9819876543',
    experienceYears: '6 Years',
    specialization: 'KTM Duke, Apache RTR, Sports & Performance Bikes',
    status: 'Available',
    joinedDate: '10 Feb 2024',
  },
  {
    id: 'mech-3',
    name: 'Mohammad Imran',
    phoneNumber: '9891234890',
    experienceYears: '10 Years',
    specialization: 'Hero Splendor, Honda Activa & Commuter 2-Wheelers',
    status: 'Available',
    joinedDate: '01 Nov 2023',
  },
];

export interface BookingRecord {
  bookingId: string;
  customerId?: string;
  customerName: string;
  customerEmail?: string;
  phoneNumber: string;
  vehicleType: string;
  brand: string;
  model: string;
  registrationNumber: string;
  service: string;
  packageId: string;
  packageName: string;
  packagePrice: number;
  date: string;
  time: string;
  address: string;
  specialRequest: string;
  status: BookingStatus;
  createdDate: string;
  assignedMechanicId?: string;
  assignedMechanicName?: string;
  assignedMechanicPhone?: string;
}

export interface BookingPushAlert {
  id: string;
  bookingId: string;
  customerId?: string;
  customerName: string;
  customerEmail?: string;
  phoneNumber: string;
  vehicle: string;
  service: string;
  packageName: string;
  packagePrice: number;
  date: string;
  time: string;
  address: string;
  timestamp: number;
  timeDisplay: string;
  isRead: boolean;
  assignedMechanicName?: string;
}

// Initial mock bookings set to empty so only real customer bookings made with Customer ID show in the admin panel!
export const INITIAL_MOCK_BOOKINGS: BookingRecord[] = [];

