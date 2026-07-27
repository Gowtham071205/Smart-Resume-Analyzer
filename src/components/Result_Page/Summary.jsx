export default function Summary({ summary = "" }) {
  return (
    <div className="md:col-span-6 bg-white p-6 rounded-xl shadow">
      <h3 className="font-bold mb-4">Summary</h3>

      {summary ? (
        <p className="text-sm text-gray-600 leading-relaxed">
          {summary}
        </p>
      ) : (
        <p className="text-sm text-gray-400">
          No summary available
        </p>
      )}
    </div>
  );
}