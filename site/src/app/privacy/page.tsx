export default function PrivacyPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h1>

      <div className="prose prose-gray">
        <p className="mb-4 text-gray-700">
          Last updated: {new Date().getFullYear()}
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Information We Collect</h2>
        <p className="mb-4 text-gray-700">
          Reentry Resource collects minimal personal information necessary to provide our services.
          We may collect information you provide directly, such as when you contact us or use our search features.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-3">How We Use Information</h2>
        <p className="mb-4 text-gray-700">
          We use the information we collect to operate, maintain, and improve our resource directory,
          and to connect individuals with the services they need.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Data Security</h2>
        <p className="mb-4 text-gray-700">
          We take reasonable measures to protect the information we collect from unauthorized access,
          use, or disclosure.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Contact Us</h2>
        <p className="mb-4 text-gray-700">
          If you have any questions about this Privacy Policy, please contact us.
        </p>
      </div>
    </div>
  );
}
