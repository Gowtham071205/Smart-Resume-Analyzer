export default function Skills( { skills = [] } ) {

  return (
    <div className="sm:col-span-2 bg-white p-4 rounded-xl shadow">
      <h3 className="font-bold mb-3">Skills Detected</h3>

      <div className="flex flex-wrap gap-2">
        {skills.map((item, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}