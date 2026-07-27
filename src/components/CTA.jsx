import { useState } from "react";

export default function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="bg-indigo-600 text-white p-10 rounded-3xl flex justify-between items-center flex-col md:flex-row gap-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">
            Ready to land your dream job?
          </h2>
          <p>
            Join 1000+ users who have optimized their resumes for the future of hiring.
          </p>
        </div>

        <button
          className="bg-white text-indigo-600 px-6 py-3 rounded-xl"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          Get Started
        </button>
      </div>
    </section>
  );
}