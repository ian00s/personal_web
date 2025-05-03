import { FiUser, FiMail, FiMapPin, FiBriefcase, FiBook } from "react-icons/fi";

export const metadata = {
  title: "About Me | My Personal Website",
  description:
    "Learn more about my professional background, skills, and experiences",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6">About Me</h1>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-lg bg-gray-200 overflow-hidden">
                  {/* You can replace this with your image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <FiUser size={64} />
                  </div>
                </div>
              </div>

              {/* Bio Info */}
              <div className="flex-grow space-y-4">
                <h2 className="text-2xl font-bold">Your Name</h2>
                <p className="text-gray-600">
                  I'm a passionate professional with expertise in web
                  development, creating beautiful and functional websites with
                  modern technologies. I specialize in creating minimalist,
                  user-friendly interfaces that prioritize both aesthetics and
                  performance.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                  <div className="flex items-center">
                    <FiMail className="mr-2" />
                    <span>your.email@example.com</span>
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="mr-2" />
                    <span>Your Location</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FiBriefcase className="mr-2" />
          Professional Experience
        </h2>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h3 className="text-xl font-semibold">Senior Developer</h3>
              <span className="text-gray-500">2020 - Present</span>
            </div>
            <div className="text-gray-600 mb-2">Company Name</div>
            <p className="text-gray-600">
              Led development of modern web applications with React, Next.js,
              and TypeScript. Implemented responsive designs and optimized
              performance.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h3 className="text-xl font-semibold">Web Developer</h3>
              <span className="text-gray-500">2018 - 2020</span>
            </div>
            <div className="text-gray-600 mb-2">Previous Company</div>
            <p className="text-gray-600">
              Developed and maintained client websites, focusing on responsive
              design and cross-browser compatibility.
            </p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FiBook className="mr-2" />
          Education
        </h2>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h3 className="text-xl font-semibold">
                Bachelor of Computer Science
              </h3>
              <span className="text-gray-500">2014 - 2018</span>
            </div>
            <div className="text-gray-600">University Name</div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Skills</h2>

        <div className="flex flex-wrap gap-2">
          {[
            "React",
            "Next.js",
            "TypeScript",
            "JavaScript",
            "HTML",
            "CSS",
            "Tailwind CSS",
            "Node.js",
            "SQL",
            "Git",
            "Responsive Design",
            "UI/UX",
            "Web Performance",
          ].map((skill) => (
            <span
              key={skill}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
