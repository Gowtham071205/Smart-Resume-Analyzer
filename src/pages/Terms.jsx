export default function Terms() {
  return (
    <div className="min-h-screen bg-[#fcf8ff] text-gray-900 px-6 py-24">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow">

        <h1 className="text-3xl font-bold mb-2">
          Terms and Conditions
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Last Updated: 3/05/2026
        </p>

        <p className="mb-6 text-gray-700">
          Welcome to <span className="font-semibold">ResuMate AI</span>. By accessing or using our service, you agree to the following terms.
        </p>

        {/* Section 1 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Use of Service</h2>
          <p className="text-gray-700">
            ResuMate AI provides AI-powered resume analysis tools. You agree to use this service only for lawful purposes and in compliance with all applicable laws and regulations.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. User Responsibilities</h2>
          <p className="text-gray-700 mb-2">
            You agree NOT to upload, submit, or transmit any content that:
          </p>

          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>Is illegal, harmful, or abusive</li>
            <li>Contains malware or malicious code</li>
            <li>Violates intellectual property rights</li>
            <li>Includes sensitive personal data without proper authorization</li>
            <li>Contains offensive, explicit, or prohibited material</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Content Monitoring & Enforcement</h2>

          <p className="text-gray-700 mb-2">
            We reserve the right to:
          </p>

          <ul className="list-disc ml-6 space-y-2 text-gray-600 mb-3">
            <li>Analyze uploaded content for system functionality and safety</li>
            <li>Reject, block, or delete content that violates these terms</li>
            <li>Log and store metadata (such as IP address, file type, and timestamps) for security and abuse prevention</li>
          </ul>

          <p className="text-gray-700 mb-2">
            If illegal content is detected, we may:
          </p>

          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>Suspend access to the service</li>
            <li>Report activity to appropriate authorities if required by law</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. AI Limitations</h2>

          <p className="text-gray-700 mb-2">
            ResuMate AI uses artificial intelligence to analyze resumes. Results:
          </p>

          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>May not always be accurate or complete</li>
            <li>Should not be considered professional or legal advice</li>
            <li>Are provided "as-is" without guarantees</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Data Handling</h2>
          <p className="text-gray-700">
            Uploaded files may be temporarily processed for analysis. We do not guarantee permanent storage unless explicitly stated.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Limitation of Liability</h2>

          <p className="text-gray-700 mb-2">
            We are not responsible for:
          </p>

          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>Any decisions made based on AI analysis</li>
            <li>Loss of data or incorrect outputs</li>
            <li>Misuse of the platform by users</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
          <p className="text-gray-700">
            We reserve the right to suspend or terminate access if these terms are violated or misuse is detected.
          </p>
        </section>

        {/* Section 8 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
          <p className="text-gray-700">
            We may update these terms at any time. Continued use of the service implies acceptance of updated terms.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">9. Contact</h2>
          <p className="text-gray-700">
            For questions or issues, use the "Report an Issue" feature in the application.
          </p>
        </section>

      </div>
    </div>
  );
}