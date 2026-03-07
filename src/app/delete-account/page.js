export default function DeleteAccount() {
  return (
    <div className="min-h-screen bg-white p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Account Deletion Request</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">How to Delete Your Account</h2>
        <p className="text-gray-700 mb-4">
          To request deletion of your SD - Service Door account, please follow these steps:
        </p>
        <ol className="list-decimal ml-6 text-gray-700 space-y-2">
          <li>Send an email to: <strong>ashpak.shaikh.dev@gmail.com</strong></li>
          <li>Subject line: <strong>"Delete My Account - SD App"</strong></li>
          <li>Include your registered phone number in the email</li>
          <li>We will process your request within 7 business days</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">What Data Will Be Deleted</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Personal information (name, phone number, email address)</li>
          <li>Service addresses</li>
          <li>Service request history</li>
          <li>All associated account data</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Data Retention</h2>
        <p className="text-gray-700">
          After deletion, some data may be retained for legal or regulatory purposes for up to 30 days, 
          after which it will be permanently deleted from our systems.
        </p>
      </section>

      <section className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Important Note</h3>
        <p className="text-gray-700 text-sm">
          Account deletion is permanent and cannot be undone. You will need to create a new account 
          if you wish to use our services again in the future.
        </p>
      </section>
    </div>
  );
}
