export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-600 mb-8">Last updated: March 8, 2026</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
        <p className="text-gray-700 mb-2">We collect the following information:</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Name, email address, and phone number</li>
          <li>Service address and location data</li>
          <li>Service request details and history</li>
          <li>Payment information (processed securely)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>To provide and manage home repair services</li>
          <li>To communicate about service requests</li>
          <li>To process payments</li>
          <li>To send notifications about service status</li>
          <li>To improve our services</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">3. Data Security</h2>
        <p className="text-gray-700">
          We use industry-standard encryption to protect your data during transmission and storage. 
          All payment information is processed through secure payment gateways.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">4. Data Sharing</h2>
        <p className="text-gray-700">
          We share your information only with service technicians assigned to your requests. 
          We do not sell your personal information to third parties.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">5. Your Rights</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Access your personal data</li>
          <li>Request data correction or deletion</li>
          <li>Opt-out of marketing communications</li>
          <li>Withdraw consent at any time</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">6. Data Retention</h2>
        <p className="text-gray-700">
          We retain your data as long as your account is active or as needed to provide services. 
          You can request data deletion by contacting us.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">7. Contact Us</h2>
        <p className="text-gray-700">
          For privacy-related questions or data deletion requests, contact us at:
        </p>
        <p className="text-gray-700 mt-2">
          Email: support@servicedoor.com<br/>
          Phone: +91 9172605997
        </p>
      </section>
    </div>
  );
}
