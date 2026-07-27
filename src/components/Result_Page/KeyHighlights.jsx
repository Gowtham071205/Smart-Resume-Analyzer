export default function KeyHighlights({ keyHighlights = [] }) {
  return (
    <div className="md:col-span-6 bg-white p-6 rounded-xl shadow">
      <h3 className="font-bold mb-4">Key Highlights</h3>

      <ul className="space-y-3 text-sm text-gray-600">
        {keyHighlights.length > 0 ? (
          keyHighlights.map((item, index) => (
            <li key={index}>&#x21e8; {item}</li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>
    </div>
  );
}