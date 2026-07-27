export default function Suggestions({ suggestions = [] }) {
  return (
    <div className="md:col-span-6 bg-white p-6 rounded-xl shadow">
      <h3 className="font-bold mb-4">AI suggestions</h3>

      {suggestions.length > 0 ? (
        suggestions.map((item, index) => (
          <li key={index}> {item}</li>
        ))
      ) : (
        <li>No data available</li>
      )}
    </div>
  );
}