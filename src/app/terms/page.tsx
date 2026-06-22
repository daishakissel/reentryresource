export default function TermsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Terms &amp; Conditions</h1>

      <div className="prose prose-gray">
        <p className="mb-4 text-gray-700">
          Last updated: {new Date().getFullYear()}
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Acceptance of Terms</h2>
        <p className="mb-4 text-gray-700">
          By accessing and using the Reentry Resource website, you accept and agree to be bound by
          these Terms and Conditions.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Use of Services</h2>
        <p className="mb-4 text-gray-700">
          Reentry Resource provides a directory of services and resources for individuals experiencing
          homelessness. While we strive to keep information accurate and up to date, we cannot guarantee
          the availability or accuracy of listed resources.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Disclaimer</h2>
        <p className="mb-4 text-gray-700">
          The information provided on this website is for general informational purposes only.
          Reentry Resource makes no warranties about the completeness, reliability, or accuracy of
          this information.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Limitation of Liability</h2>
        <p className="mb-4 text-gray-700">
          Reentry Resource shall not be liable for any damages arising from the use of or inability
          to use this website or the resources listed herein.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Contact Us</h2>
        <p className="mb-4 text-gray-700">
          If you have any questions about these Terms and Conditions, please contact us.
        </p>
      </div>
    </div>
  );
}
