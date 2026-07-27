export default function ATSCard({ type }) {
  const isImpact = type === "impact";

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">
        {isImpact ? "Impact Metrics" : "ATS Readability"}
      </h3>

      <p className="text-sm text-gray-500 mb-3">
        {isImpact
          ? "Improve quantifiable metrics"
          : "Resume is ATS friendly"}
      </p>

      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className={`h-2 rounded ${
            isImpact ? "bg-orange-500 w-[60%]" : "bg-indigo-600 w-[90%]"
          }`}
        />
      </div>
    </div>
  );
}