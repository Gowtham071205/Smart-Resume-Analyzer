import { useState, useRef } from "react";
import { FileUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_URL;

export default function UploadModal({ onClose }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef();
  const navigate = useNavigate();

  // Handle file selection
  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    //verify that the file is pdf/docx
    const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Only PDF or DOCX files are allowed");
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB

    if (selectedFile.size > maxSize) {
      alert("File size must be less than 10MB");
      return;
    }

    setFile(selectedFile);
    setProgress(0);
  };

  // Simulate upload (replace with real API later)
  const startAnalysis = async () => {
    if (!file) return;

    setLoading(true);
    setProgress(5); // immediate feedback

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch(`${API_BASE}/resumes`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const { jobId } = await res.json();

      pollStatus(jobId);

    } catch (err) {
      console.error(err);
      alert("Upload failed, Please try again");
      setLoading(false);
    }
  };

  const pollStatus = (jobId) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `${API_BASE}/resumes/${jobId}/status`
        );

        const data = await res.json();

        setProgress((prev) => Math.max(prev, data.progress));

        if (data.status === "completed") {
          clearInterval(interval);

          localStorage.setItem(
            "analysis",
            JSON.stringify(data.result)
          );
          
          if(data.result.status !== undefined){
            if(data.result.status == 0){
              setProgress(0);
              setLoading(false);
              alert("AI Analysis failed, Please try again...");
              return;
            }
          }

          onClose();
          navigate("/result");
        }

        if (data.status === "failed") {
          clearInterval(interval);
          if(data.error == "Unsupported File Type"){
            alert("Processing failed - Unsupported File Type!");
          }else{
            alert("Processing Failed, Please try again.");
          }
          setProgress(0);
          setLoading(false);
        }

      } catch (err) {
        clearInterval(interval);
        console.error(err);
        alert("Connection error");
        setProgress(0);
        setLoading(false);
      }
    }, 800);
  };

  // Drag handlers
  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div
      onClick= { ()=> {
        if (!loading) onClose();
      }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-8 rounded-2xl w-[400px] text-center shadow-xl"
      >
        {/* Upload Area */}
        <div
          onDrop={(e) => {
            if (loading) return;
            handleDrop(e);
          }}
          onDragOver={(e) => {
            if (loading) return;
            handleDragOver(e);
          }}
          className="border-2 border-dashed border-indigo-300 rounded-xl p-10 cursor-pointer hover:bg-gray-50 transition"
        >
          <div className="mb-4 flex justify-center">
            <FileUp size={44} color="#3949ab" strokeWidth={1.25} />
          </div>

          <h2 className="text-xl font-bold mb-2">
            Drop your resume here
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Support for PDF and DOCX files up to 10MB
          </p>

          <button
            onClick={() => fileInputRef.current.click()}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow-md"
          >
            Browse Files
          </button>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />

          <p className="text-gray-500 text-xs mt-6">
            By using our services you agree to our{" "}
            <Link to="/terms" className="text-indigo-600 hover:underline">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-indigo-600 hover:underline">
              Privacy Policy
            </Link>.
          </p>
        </div>

        {/* Progress Bar */}
        {file && (
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-2">{file.name}</p>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-xs mt-2">{progress}%</p>
          </div>
        )}

        {/* Analyze Button */}
        {file && (
          <button
            onClick={startAnalysis}
            disabled={!file || loading}
            className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-xl disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        )}
      </div>
    </div>
  );
}