export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-sm text-gray-600 mb-8">Last updated: March 8, 2026</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
        <p className="text-gray-700">
          By using SD - Service Door app, you agree to these Terms of Service. 
          If you do not agree, please do not use our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">2. Service Description</h2>
        <p className="text-gray-700">
          SD - Service Door connects you with professional technicians for home repair and maintenance services. 
          We facilitate bookings but do not directly provide repair services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">3. User Responsibilities</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Provide accurate information when creating service requests</li>
          <li>Be present at the service location during scheduled appointments</li>
          <li>Treat technicians with respect</li>
          <li>Pay for services as agreed</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">4. Service Availability</h2>
        <p className="text-gray-700">
          We strive to provide services 24/7, but availability may vary based on location and technician availability. 
          We do not guarantee immediate service for all requests.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">5. Cancellation Policy</h2>
        <p className="text-gray-700">
          You may cancel service requests before a technician is assigned. 
          Cancellations after assignment may be subject to fees.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
        <p className="text-gray-700">
          We are not responsible for the quality of work performed by technicians. 
          Any disputes should be resolved directly with the service provider.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">7. Account Termination</h2>
        <p className="text-gray-700">
          We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">8. Changes to Terms</h2>
        <p className="text-gray-700">
          We may update these terms from time to time. Continued use of the app after changes constitutes acceptance of the new terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
        <p className="text-gray-700">
          For questions about these Terms of Service, contact us at:
        </p>
        <p className="text-gray-700 mt-2">
          Email: ashpak.shaikh.dev@gmail.com<br/>
          Phone: +91 9172605997
        </p>
      </section>
    </div>
  );
}
