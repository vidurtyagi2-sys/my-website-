import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Phone, Mail, QrCode, Copy, Check } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export type LegalModalType = 'privacy' | 'terms' | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
  onOpenPaymentQR?: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  type,
  onClose,
  onOpenPaymentQR,
}) => {
  const [copiedUpi, setCopiedUpi] = useState(false);
  const upiId = '9548984717@okbizaxis';
  const qrImagePath = `${import.meta.env.BASE_URL}assets/aistudio/WhatsApp_Image_2026-10-18_at_6.05.28_PM_387e2141.jpeg`;

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    } catch {
      // ignore
    }
  };
  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 text-black"
      role="dialog"
      aria-modal="true"
      aria-label={type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
    >
      <div className="bg-white w-full max-w-3xl rounded-3xl border-2 border-[#DC2626] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-50 via-white to-red-50 px-5 sm:px-6 py-4 border-b border-red-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#DC2626] text-white flex items-center justify-center shadow-xs shrink-0">
              {type === 'privacy' ? (
                <ShieldCheck className="w-5 h-5 text-white" />
              ) : (
                <FileText className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-black leading-tight">
                {type === 'privacy'
                  ? 'Privacy Policy'
                  : 'Terms & Conditions'}
              </h2>
              <p className="text-xs font-bold text-neutral-600">
                SAHAJ CAPITAL AUTOMOBILE Official Policy
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-xl border border-neutral-300 hover:border-[#DC2626] hover:bg-red-50 text-black flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-sm text-neutral-800 leading-relaxed">
          {type === 'privacy' ? (
            <div className="space-y-6">
              <div className="border-b border-neutral-200 pb-4">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#DC2626] mb-1">
                  PRIVACY POLICY – SAHAJ CAPITAL AUTOMOBILE
                </h1>
                <p className="text-xs text-neutral-500 font-medium">
                  Last Updated: {new Date().getFullYear()} · Applicable for Website, Mobile Web App &amp; Doorstep Services
                </p>
              </div>

              {/* 1. General */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  1. General
                </h3>
                <p>
                  At <strong>Sahaj Capital Automobile</strong>, we value the privacy and security of our customers. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website, mobile application, two-wheeler (bike and scooter) doorstep servicing and repair services, or spare parts purchasing facilities.
                </p>
                <p>
                  By accessing our website or application or using our services, you acknowledge this Privacy Policy, subject to applicable law.
                </p>
              </section>

              {/* 2. Information We Collect */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  2. Information We Collect
                </h3>
                <div className="space-y-2 pl-1">
                  <p>
                    <strong>Personal Information:</strong> When you register, book a service, place an order, or contact us, we may collect your name, mobile number, email address, and service or delivery address.
                  </p>
                  <p>
                    <strong>Vehicle Information:</strong> We may collect information about your two-wheeler, including its make, model, registration number, service requirements, and relevant service history.
                  </p>
                  <p>
                    <strong>Order and Service Information:</strong> We may collect booking details, spare parts ordered, invoices, service records, customer feedback, and communication related to your orders or bookings.
                  </p>
                  <p>
                    <strong>Payment Information:</strong> Payments may be processed through third-party payment service providers. We may receive transaction references, payment status, and related details required to manage orders and payments. Full card or banking credentials are handled according to the payment provider&apos;s processes and applicable security requirements.
                  </p>
                  <p>
                    <strong>Location Information:</strong> If required for doorstep service or delivery, we may collect your service or delivery location. Device location may be accessed only where enabled and permitted through the relevant app or device settings.
                  </p>
                  <p>
                    <strong>Technical Information:</strong> Our website or application may collect limited technical information, such as device details, browser information, IP address, and usage data, where applicable.
                  </p>
                </div>
              </section>

              {/* 3. How We Use Your Information */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  3. How We Use Your Information
                </h3>
                <p>We may use your information for the following purposes:</p>
                <ul className="list-disc list-inside space-y-1.5 pl-2">
                  <li>
                    <strong>Service Delivery:</strong> To schedule, manage, and provide bike and scooter servicing, maintenance, and repair services.
                  </li>
                  <li>
                    <strong>Spare Parts Orders:</strong> To process orders, arrange delivery, confirm availability, and provide order updates.
                  </li>
                  <li>
                    <strong>Customer Communication:</strong> To contact you regarding bookings, payments, service updates, deliveries, complaints, and support requests.
                  </li>
                  <li>
                    <strong>Payments and Invoicing:</strong> To process transactions, maintain payment records, and issue invoices.
                  </li>
                  <li>
                    <strong>Service Improvement:</strong> To understand customer feedback and improve our services, application, website, and customer experience.
                  </li>
                  <li>
                    <strong>Security and Fraud Prevention:</strong> To detect suspicious transactions, prevent misuse, and protect our customers and business.
                  </li>
                  <li>
                    <strong>Marketing Communications:</strong> To share promotional offers or business updates where permitted. You may opt out of promotional communications at any time.
                  </li>
                </ul>
              </section>

              {/* 4. Information Sharing */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  4. Information Sharing
                </h3>
                <p>
                  Sahaj Capital Automobile does not sell customers&apos; personal information to third parties. We may share relevant information in the following circumstances:
                </p>
                <div className="space-y-2 pl-1">
                  <p>
                    <strong>Service Technicians and Delivery Partners:</strong> Necessary booking, vehicle, and location details may be shared with technicians or delivery partners to complete your requested service or order.
                  </p>
                  <p>
                    <strong>Payment Service Providers:</strong> Relevant transaction information may be shared with payment gateways or financial service providers to process payments and refunds.
                  </p>
                  <p>
                    <strong>Technology and Hosting Providers:</strong> Information may be processed by providers supporting our website, application, hosting, customer support, and business operations.
                  </p>
                  <p>
                    <strong>Legal Requirements:</strong> We may disclose information when required by applicable law, a valid legal process, or a lawful request from an authorised government authority.
                  </p>
                  <p>
                    <strong>Business Protection:</strong> Information may be used or disclosed when reasonably necessary to investigate fraud, address security concerns, or protect legal rights, subject to applicable law.
                  </p>
                  <p className="text-xs text-neutral-600">
                    Third-party service providers are expected to handle information appropriately and in accordance with applicable contractual and legal obligations.
                  </p>
                </div>
              </section>

              {/* 5. Data Security */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  5. Data Security
                </h3>
                <p>
                  We take reasonable measures to protect personal information against unauthorised access, disclosure, alteration, loss, or misuse.
                </p>
                <p>
                  Depending on the services and systems used, security measures may include access controls, secure connections, and appropriate data protection practices. However, no method of electronic storage or internet transmission can be guaranteed to be completely secure.
                </p>
              </section>

              {/* 6. Data Retention */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  6. Data Retention
                </h3>
                <p>
                  We retain personal information only for as long as reasonably necessary for the purposes described in this Privacy Policy, including providing services, maintaining business and tax records, resolving disputes, preventing fraud, and meeting legal obligations.
                </p>
                <p>
                  When information is no longer required, it will be deleted or anonymised where appropriate and as permitted by applicable law.
                </p>
              </section>

              {/* 7. Cookies and Tracking Technologies */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  7. Cookies and Tracking Technologies
                </h3>
                <p>
                  Our website may use cookies or similar technologies to support website functionality, understand usage, improve performance, and remember preferences.
                </p>
                <p>
                  You may manage cookies through your browser settings. Disabling certain cookies may affect some website features. Any analytics or advertising technologies used will be subject to applicable consent and legal requirements.
                </p>
              </section>

              {/* 8. Third-Party Services and Links */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  8. Third-Party Services and Links
                </h3>
                <p>
                  Our website or application may contain links to third-party websites, payment gateways, maps, or other services. These services may have their own privacy policies and data-handling practices.
                </p>
                <p>
                  Sahaj Capital Automobile is not responsible for the independent privacy practices of third-party websites or services. Please review their privacy policies before providing personal information to them.
                </p>
              </section>

              {/* 9. Your Privacy Rights */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  9. Your Privacy Rights
                </h3>
                <p>Subject to applicable law, you may have the right to:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Request access to personal information held about you.</li>
                  <li>Request correction of inaccurate or incomplete information.</li>
                  <li>Request deletion of personal information where legally permissible.</li>
                  <li>Withdraw consent where processing is based on consent.</li>
                  <li>Opt out of promotional communications.</li>
                  <li>Raise a complaint or privacy-related concern.</li>
                </ul>
                <p className="text-xs text-neutral-600">
                  To exercise an applicable right, please contact us using the details provided below. We may need to verify your identity before processing certain requests.
                </p>
              </section>

              {/* 10. Children's Privacy */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  10. Children&apos;s Privacy
                </h3>
                <p>
                  Our services are intended for individuals legally eligible to use the relevant services. We do not knowingly collect children&apos;s personal information in violation of applicable law. If you believe that a child has provided personal information unlawfully, please contact us so that we can review the matter and take appropriate action.
                </p>
              </section>

              {/* 11. Changes to This Privacy Policy */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  11. Changes to This Privacy Policy
                </h3>
                <p>
                  Sahaj Capital Automobile may update this Privacy Policy from time to time to reflect changes in our services, technology, or legal requirements.
                </p>
                <p>
                  The updated version will be published on our website or application, along with a revised effective date where appropriate. Significant changes will be communicated through suitable channels when required by law.
                </p>
              </section>

              {/* 12. Contact Us */}
              <section className="space-y-3 p-4 bg-red-50/70 rounded-2xl border border-red-200">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  12. Contact Us
                </h3>
                <p className="text-xs font-medium">
                  For questions, requests, or complaints concerning this Privacy Policy or your personal information, please contact:
                </p>
                <div className="space-y-1.5 text-xs">
                  <p>
                    <strong>Business Name:</strong> Sahaj Capital Automobile
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#DC2626]" />
                    <strong>Email:</strong>{' '}
                    <a
                      href="mailto:sahajcapitalautomobile@zohomail.in"
                      className="text-[#DC2626] font-extrabold hover:underline"
                    >
                      sahajcapitalautomobile@zohomail.in
                    </a>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#DC2626]" />
                    <strong>Phone:</strong>{' '}
                    <a
                      href="tel:+919548984717"
                      className="text-[#DC2626] font-extrabold hover:underline"
                    >
                      +91 9548984717
                    </a>
                  </p>
                </div>
              </section>

              {/* 13. Applicable Law */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  13. Applicable Law
                </h3>
                <p>
                  This Privacy Policy will be interpreted in accordance with the applicable laws of India, including applicable data protection and privacy requirements.
                </p>
                <div className="pt-2">
                  <p className="font-extrabold text-black">Sahaj Capital Automobile</p>
                  <p className="text-xs italic text-neutral-600">Your Trusted Partner for Two-Wheeler Service and Spare Parts</p>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border-b border-neutral-200 pb-4">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#DC2626] mb-1">
                  TERMS &amp; CONDITIONS – SAHAJ CAPITAL AUTOMOBILE
                </h1>
                <p className="text-xs text-neutral-500 font-medium">
                  Last Updated: {new Date().getFullYear()} · Applicable for Doorstep Servicing, Maintenance, Repairs &amp; Spare Parts
                </p>
              </div>

              {/* 1. General */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  1. General
                </h3>
                <p>
                  Welcome to <strong>Sahaj Capital Automobile</strong>. Before availing our two-wheeler (bike and scooter) doorstep servicing, maintenance, and repair services, please read these Terms &amp; Conditions carefully. By booking or using our services, you agree to comply with and be bound by these terms.
                </p>
              </section>

              {/* 2. Service Booking */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  2. Service Booking
                </h3>
                <div className="space-y-2 pl-1">
                  <p>
                    <strong>Eligibility:</strong> Customers must be at least 18 years old to book a service.
                  </p>
                  <p>
                    <strong>Accurate Information:</strong> Customers must provide accurate and complete information about their two-wheeler, including its make, model, registration details, and service requirements.
                  </p>
                  <p>
                    <strong>Booking Confirmation:</strong> A booking will be considered confirmed only after confirmation from Sahaj Capital Automobile through the available communication channels.
                  </p>
                </div>
              </section>

              {/* 3. Service Delivery */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  3. Service Delivery
                </h3>
                <div className="space-y-2 pl-1">
                  <p>
                    <strong>Service Areas:</strong> Doorstep service availability depends on the service location, technician availability, and the services offered in that area. Customers should confirm availability before booking.
                  </p>
                  <p>
                    <strong>Access to Vehicle:</strong> Customers must provide safe and reasonable access to their two-wheeler at the agreed service location. If the service cannot be performed due to lack of access or an unsuitable location, rescheduling may be required. Any applicable fee will be communicated in advance.
                  </p>
                  <p>
                    <strong>Service Inspection:</strong> The technician may inspect the vehicle to identify the required work. Additional repairs or replacement parts will be undertaken only after the customer has been informed of the estimated charges and has approved the work.
                  </p>
                  <p>
                    <strong>Parts Availability:</strong> Spare parts are subject to availability. Genuine or OEM parts will be supplied where specified and available. Any alternative parts must be communicated to the customer before installation.
                  </p>
                  <p>
                    <strong>Service Time:</strong> Estimated service times may vary depending on the vehicle&apos;s condition, the nature of the repair, and parts availability.
                  </p>
                </div>
              </section>

              {/* 4. Payments and Charges */}
              <section className="space-y-3">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  4. Payments and Charges
                </h3>
                <div className="space-y-2 pl-1">
                  <p>
                    <strong>Service Charges:</strong> Service charges, spare-part costs, applicable taxes, and any additional fees will be communicated to the customer before the relevant work is approved.
                  </p>
                  <p>
                    <strong>Payment Methods:</strong> Customers may pay through cash or digital payment methods made available by Sahaj Capital Automobile (Google Pay, PhonePe, Paytm, BHIM UPI).
                  </p>
                  <p>
                    <strong>Additional Work:</strong> No additional repair or replacement work should be carried out without the customer&apos;s approval of the applicable charges.
                  </p>
                  <p>
                    <strong>Invoices:</strong> Customers should retain the invoice or payment confirmation provided for the services and parts purchased.
                  </p>
                </div>

                {/* Attached UPI Payment Card & Official QR Code */}
                <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-red-50/90 via-white to-red-50/70 border-2 border-[#DC2626] shadow-sm">
                  <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <div className="bg-white p-2 sm:p-2.5 rounded-2xl border-2 border-red-300 shadow-xs shrink-0 max-w-[170px]">
                      <img
                        src={qrImagePath}
                        alt="Sahaj Capital Automobile Official UPI QR Code"
                        className="w-full h-auto rounded-xl object-contain"
                      />
                    </div>
                    <div className="space-y-2.5 flex-1 min-w-0">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100 border border-[#DC2626] text-[10px] font-extrabold text-black">
                        <QrCode className="w-3.5 h-3.5 text-[#DC2626]" />
                        <span>Official Payment QR Code</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-extrabold text-black">
                        Scan &amp; Pay via Any UPI App
                      </h4>
                      <p className="text-xs text-neutral-700 font-medium">
                        GPay · PhonePe · Paytm · BHIM UPI · Instant Confirmation
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-2 pt-1 justify-center sm:justify-start">
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="min-h-[36px] px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-300 font-bold text-xs text-black inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          {copiedUpi ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-black" />
                              <span className="text-black font-extrabold">Copied: {upiId}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-[#DC2626]" />
                              <span>Copy UPI ID: <strong>{upiId}</strong></span>
                            </>
                          )}
                        </button>

                        {onOpenPaymentQR && (
                          <button
                            type="button"
                            onClick={onOpenPaymentQR}
                            className="min-h-[36px] px-3.5 py-1.5 rounded-xl bg-[#DC2626] hover:bg-red-700 text-white font-extrabold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <QrCode className="w-3.5 h-3.5" />
                            <span>Enlarge QR Code</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. Cancellations and Rescheduling */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  5. Cancellations and Rescheduling
                </h3>
                <div className="space-y-2 pl-1">
                  <p>
                    <strong>Cancellation:</strong> Customers may cancel a booking by contacting Sahaj Capital Automobile. Any applicable cancellation charges and refund eligibility will depend on the cancellation policy communicated at the time of booking.
                  </p>
                  <p>
                    <strong>Rescheduling:</strong> Customers may request a change to their appointment, subject to technician availability. Any applicable rescheduling fee will be communicated in advance.
                  </p>
                  <p>
                    <strong>Technician Delays:</strong> If a booking must be changed due to technician unavailability or circumstances beyond our reasonable control, we will inform the customer and offer an appropriate alternative appointment or other available resolution.
                  </p>
                </div>
              </section>

              {/* 6. Customer Responsibilities */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  6. Customer Responsibilities
                </h3>
                <div className="space-y-2 pl-1">
                  <p>
                    <strong>Safe Working Environment:</strong> Customers must provide a reasonably safe and suitable area for the technician to perform the service.
                  </p>
                  <p>
                    <strong>Accurate Vehicle Information:</strong> Customers should disclose known vehicle issues and relevant information that may affect the service.
                  </p>
                  <p>
                    <strong>Approval of Repairs:</strong> Customers are responsible for reviewing and approving the proposed work and its charges before the work begins.
                  </p>
                  <p>
                    <strong>Feedback and Complaints:</strong> Customers are encouraged to share feedback or report service-related concerns through our official contact channels.
                  </p>
                </div>
              </section>

              {/* 7. Spare Parts and Warranty */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  7. Spare Parts and Warranty
                </h3>
                <div className="space-y-2 pl-1">
                  <p>
                    <strong>Parts Warranty:</strong> Any warranty applicable to spare parts will be subject to the relevant manufacturer&apos;s or supplier&apos;s warranty terms.
                  </p>
                  <p>
                    <strong>Service Warranty:</strong> Any warranty on labour or repair work will be provided only as communicated on the invoice or in the applicable service warranty policy.
                  </p>
                  <p>
                    <strong>Warranty Exclusions:</strong> Warranty coverage may exclude unrelated faults, normal wear and tear, misuse, unauthorised modifications, or damage caused by circumstances outside the covered repair, subject to the applicable warranty terms and law.
                  </p>
                </div>
              </section>

              {/* 8. Limitation of Liability */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  8. Limitation of Liability
                </h3>
                <p>
                  Sahaj Capital Automobile will exercise reasonable care while providing services. However, we do not guarantee that every existing vehicle fault can be identified or resolved in a single visit.
                </p>
                <p>
                  To the extent permitted by applicable law, Sahaj Capital Automobile shall not be responsible for indirect or consequential losses arising from service delays or circumstances beyond our reasonable control.
                </p>
                <p>
                  Nothing in these Terms &amp; Conditions excludes or limits any liability, customer right, warranty, or remedy that cannot legally be excluded or limited under applicable law.
                </p>
              </section>

              {/* 9. Privacy Policy */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  9. Privacy Policy
                </h3>
                <p>
                  Sahaj Capital Automobile respects customer privacy. Personal information collected during bookings, payments, service delivery, and customer support will be handled in accordance with our Privacy Policy and applicable data protection laws.
                </p>
                <p>
                  Customers should refer to our Privacy Policy for further details regarding the collection, use, storage, and protection of personal information.
                </p>
              </section>

              {/* 10. Changes to Terms & Conditions */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  10. Changes to Terms &amp; Conditions
                </h3>
                <p>
                  Sahaj Capital Automobile reserves the right to update these Terms &amp; Conditions when necessary. Updated terms will be published through our website, application, or other appropriate communication channels. Changes will apply in accordance with applicable law.
                </p>
              </section>

              {/* 11. Customer Support and Contact */}
              <section className="space-y-3 p-4 bg-red-50/70 rounded-2xl border border-red-200">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  11. Customer Support and Contact
                </h3>
                <p className="text-xs font-medium">
                  For questions, booking assistance, complaints, or service-related concerns, please contact:
                </p>
                <div className="space-y-1.5 text-xs">
                  <p>
                    <strong>Business Name:</strong> Sahaj Capital Automobile
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#DC2626]" />
                    <strong>Email:</strong>{' '}
                    <a
                      href="mailto:sahajcapitalautomobile@zohomail.in"
                      className="text-[#DC2626] font-extrabold hover:underline"
                    >
                      sahajcapitalautomobile@zohomail.in
                    </a>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#DC2626]" />
                    <strong>Phone:</strong>{' '}
                    <a
                      href="tel:+919548984717"
                      className="text-[#DC2626] font-extrabold hover:underline"
                    >
                      +91 9548984717
                    </a>
                  </p>
                </div>
              </section>

              {/* 12. Acceptance of Terms */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-[#DC2626]">
                  12. Acceptance of Terms
                </h3>
                <p>
                  By booking or using the services of Sahaj Capital Automobile, customers acknowledge that they have read and understood these Terms &amp; Conditions and agree to the terms applicable to their booking.
                </p>
                <p>
                  These Terms &amp; Conditions are subject to applicable laws of India.
                </p>
                <div className="pt-2">
                  <p className="font-extrabold text-black">Sahaj Capital Automobile</p>
                  <p className="text-xs italic text-neutral-600">Your Trusted Partner for Two-Wheeler Service and Spare Parts</p>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-neutral-50 px-5 sm:px-6 py-3 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
          <p className="text-xs text-neutral-500 font-medium">
            Sahaj Capital Automobile · Ghaziabad &amp; Noida
          </p>
          <div className="flex items-center gap-2">
            {type === 'terms' && onOpenPaymentQR && (
              <button
                type="button"
                onClick={onOpenPaymentQR}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-red-50 border border-[#DC2626] text-black font-extrabold text-xs inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
              >
                <QrCode className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>Scan &amp; Pay via UPI QR</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-red-700 text-white font-extrabold text-xs cursor-pointer transition-colors shadow-xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
