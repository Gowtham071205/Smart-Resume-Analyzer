import { Cpu } from "lucide-react";
import { Brain } from "lucide-react";
import { NotebookPen } from "lucide-react";

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">
          Master Your Job Search
        </h2>
        <p className="text-gray-600">
          Our AI engine works across three core pillars to transform your professional profile.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Feature title="ATS Compatibility" icon={<Cpu size={52} color="#3949ab" strokeWidth={1.25} />} description={"See exactly how recruiter's software views your resume and fix hidden formatting issues."} />
        <Feature title="Skill Gap Analysis" icon={<Brain size={52} color="#3949ab" strokeWidth={1.25} />} description={"Automatically identify missing keywords based on the jobs you're actually targetting."}/>
        <Feature title="Bullet Point Rewrite" icon={<NotebookPen size={52} color="#3949ab" strokeWidth={1.25} />} description={"Transform weak sentences into impact-driven achievements with one click."}/>
      </div>
    </section>
  );
}

function Feature({ title, icon, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg text-center">

      <div className="mb-4 flex justify-center text-indigo-600">
        {icon}
      </div>

      <h3 className="text-xl font-extrabold mb-2">
        {title}
      </h3>

      <p className="text-gray-700 text-sm">
        {description}
      </p>

    </div>
  );
}