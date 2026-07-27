import { useState } from "react";
import { Sparkles, FileUp } from "lucide-react";
import UploadModal from "../components/UploadModal";
import heroScreenShot from "../assets/hero_screenshot.png";

export default function Hero() {
  const [showDemo, setShowDemo] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  return (
    <section className="pt-24 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">

      {/* LEFT SIDE */}
      <div>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs mb-4">
          <Sparkles size={32} />
          POWERED BY AI
        </div>

        <h1 className="text-5xl font-bold mb-4">
          Analyze Your Resume with AI
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          Get ATS score, skill insights, and improvements instantly.
        </p>

        <div className="flex gap-4">

          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2" onClick={() => setShowUpload(true)}>
            <FileUp size={24} />
            Upload Resume
          </button>
          {showUpload && (
            <UploadModal onClose={() => setShowUpload(false)} />
          )}

          {/* <button
            onClick={() => setShowDemo(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl"
          >
            See Demo
          </button> */}
        </div>

        {/* MODAL */}
        {/* {showDemo && (
          <div
            onClick={() => setShowDemo(false)}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-4 rounded-xl"
            >
              <button onClick={() => setShowDemo(false)}>✕</button>

              <iframe
                className="w-[600px] h-[350px]"
                src="https://www.youtube.com/embed/KBCyHIU-nik"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )} */}
      </div>

      {/* RIGHT SIDE → IMAGE */}
      <div className="flex justify-center lg:justify-end">
        <div className="relative">
          <img
            src={heroScreenShot}
            alt="Resume analysis preview"
            className="rounded-2xl shadow-2xl border hover:scale-[1.02] transition duration-300"
          />

          {/* Glow */}
          <div className="absolute inset-0 rounded-2xl bg-indigo-500/10 blur-2xl -z-10"></div>
        </div>
      </div>

    </section>
  );
}