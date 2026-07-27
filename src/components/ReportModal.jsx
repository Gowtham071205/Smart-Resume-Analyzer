import { useState } from "react";
const API_BASE = import.meta.env.VITE_API_URL;

export default function ReportModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!subject || !message) {
      alert("Subject and message are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, subject, message }),
      });

      if (!res.ok) throw new Error();

      alert("Issue reported successfully!");
      onClose();

    } catch (err){
      alert("Failed to send report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[90%] max-w-md rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-xl font-bold mb-4">Report an Issue</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Your email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded-lg"
        />

        {/* Subject */}
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full mb-3 p-2 border rounded-lg"
        />

        {/* Message */}
        <textarea
          placeholder="Describe your issue..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full mb-4 p-2 border rounded-lg h-28 resize-none"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}