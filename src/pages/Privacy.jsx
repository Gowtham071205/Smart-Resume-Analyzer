export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#fcf8ff] text-gray-900 px-6 py-24">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow relative">

        {/* Optional glow */}
        <div className="absolute inset-0 bg-indigo-500/5 blur-3xl -z-10 rounded-2xl"></div>

        <h1 className="text-3xl font-bold mb-2">
          Privacy Policy
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Last Updated: 3/05/2026
        </p>

        <p className="mb-6 text-gray-700">
          At <span className="font-semibold">ResuMate AI</span>, we respect your privacy and are committed to protecting your data.
        </p>

        {/* Section 1 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>

          <div className="mb-4">
            <h3 className="font-semibold mb-1">a) Uploaded Files</h3>
            <ul className="list-disc ml-6 space-y-2 text-gray-600">
              <li>Resume files (PDF/DOCX) are processed to extract text and generate analysis</li>
              <li>Files are not permanently stored unless required for debugging or error handling</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">b) Usage Data (Logging System)</h3>
            <p className="text-gray-700 mb-2">
              We collect limited metadata for system monitoring:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-600">
              <li>File type (PDF/DOCX)</li>
              <li>File size</li>
              <li>Timestamp of upload</li>
              <li>Processing status (success/failure)</li>
              <li>IP address (for abuse prevention)</li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. How We Use Data</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>Provide resume analysis</li>
            <li>Improve system performance</li>
            <li>Detect and prevent abuse</li>
            <li>Debug errors and failed uploads</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Data Storage</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>Logs are stored securely in server-side log files</li>
            <li>Failed files may be temporarily stored for debugging purposes</li>
            <li>Sensitive content is not intentionally retained</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
          <p className="text-gray-700 mb-2">
            We implement safeguards to protect your data, including:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>Secure server storage</li>
            <li>Restricted access to logs</li>
            <li>Controlled processing environments</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Third-Party Services</h2>
          <p className="text-gray-700">
            We may use third-party AI providers to process resume content.
          </p>
          {/* <ul className="list-disc ml-6 space-y-2 text-gray-600 mt-2">
            <li>Receive only necessary data</li>
            <li>Do not receive personal account data unless required</li>
          </ul> */}
        </section>

        {/* Section 6 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Illegal or Prohibited Content</h2>
          <p className="text-gray-700">
            If uploaded content violates laws or policies:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-600 mt-2">
            <li>It may be logged and retained for investigation</li>
            <li>Access may be restricted</li>
            <li>Authorities may be notified if legally required</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. User Rights</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>Request deletion of stored data (if applicable)</li>
            <li>Contact us for concerns about your data</li>
          </ul>
        </section>

        {/* Section 8 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">8. Changes to Policy</h2>
          <p className="text-gray-700">
            We may update this policy periodically. Continued use of the service implies acceptance.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">9. Contact</h2>
          <p className="text-gray-700">
            Use the "Report an Issue" feature in the app to contact us.
          </p>
        </section>

      </div>
    </div>
  );
}