import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScoreCard from "../components/Result_Page/ScoreCard";
import Skills from "../components/Result_Page/Skills";
import MissingSkills from "../components/Result_Page/MissingSkills";
import Suggestions from "../components/Result_Page/Suggestions";
import Strenghts from "../components/Result_Page/Strengths";
import KeyHighlights from "../components/Result_Page/KeyHighlights";
import Summary from "../components/Result_Page/Summary";

export default function Result() {
  const analysis = JSON.parse(localStorage.getItem("analysis") || "{}");
  return (
    <div className="bg-[#fcf8ff] text-gray-900 font-sans min-h-screen flex flex-col">
      
      <Navbar />

      <div className="flex pt-16 flex-grow">
        
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-bold">Analysis Results</h1>
              <p className="text-gray-500">
                Resume Analysis • Just Now
              </p>
            </div>

            {/* <div className="flex gap-3">
              <button className="px-4 py-2 border rounded-xl">
                Export PDF
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl">
                AI Auto Fix
              </button>
            </div> */}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            <ScoreCard score={analysis.atsScore} />

            <div className="md:col-span-7 grid sm:grid-cols-2 gap-6">
              <Skills skills={analysis.skills} />
            </div>

            <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Strenghts strenghts={analysis.strengths} />
              <KeyHighlights keyHighlights={analysis.keyHighlights} />
            </div>

            <MissingSkills missingSkills={analysis.missingSkills} />
            <Suggestions suggestions={analysis.improvements} />

            <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Summary summary={analysis.summary} />
            </div>

          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}