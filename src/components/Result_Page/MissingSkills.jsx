export default function MissingSkills({ missingSkills = [] }) {

  return (
    <div className="md:col-span-6 bg-white p-6 rounded-xl shadow">
      <h3 className="font-bold mb-4 text-red-600">Missing Skills</h3>
      
      {missingSkills.length > 0 ? (
        missingSkills.map((item, index) => (
          <div key={index} className="mb-2 p-2 bg-red-50 rounded">
            {item}
          </div>
        ))
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}