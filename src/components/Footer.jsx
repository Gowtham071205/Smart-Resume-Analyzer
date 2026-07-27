import { useState } from "react";
import ReportModal from "./ReportModal";
import { Link } from "react-router-dom";

export default function Footer() {
  const [showModal, setShowModal] = useState(false);
  return (
    <footer className="bg-white border-t py-8 text-center text-sm text-gray-500">
      
      <div className="flex justify-center gap-6 mb-2">
        <Link to="/privacy" className="hover:text-indigo-600">
          Privacy Policy
        </Link>

        <Link to="/terms" className="hover:text-indigo-600">
          Terms & Conditions
        </Link>

        <button
          onClick={() => setShowModal(true)}
        >
          Report an issue
        </button>
        {showModal && (
          <ReportModal onClose={() => setShowModal(false)} />
        )}
      </div>

      © 2026 ResuMate AI
    </footer>
    
  );
}