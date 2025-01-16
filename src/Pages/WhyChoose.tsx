import { CheckCircle } from "lucide-react";

const WhyStudy = () => {
  const features = [
    {
      title: "World-Class Faculty",
      description:
        "Learn from experienced educators and industry leaders dedicated to student success.",
      icon: <CheckCircle className="text-green-500 w-8 h-8" />,
    },
    {
      title: "State-of-the-Art Facilities",
      description:
        "Enjoy modern classrooms, advanced labs, and a well-stocked library.",
      icon: <CheckCircle className="text-green-500 w-8 h-8" />,
    },
    {
      title: "Diverse Curriculum",
      description:
        "Choose from a wide range of programs tailored to your career goals.",
      icon: <CheckCircle className="text-green-500 w-8 h-8" />,
    },
    {
      title: "Comprehensive Support",
      description:
        "Get access to mentorship, counseling, and career development services.",
      icon: <CheckCircle className="text-green-500 w-8 h-8" />,
    },
    {
      title: "Global Recognition",
      description:
        "Our institution is recognized worldwide for academic excellence.",
      icon: <CheckCircle className="text-green-500 w-8 h-8" />,
    },
    {
      title: "Vibrant Campus Life",
      description:
        "Engage in cultural, sports, and social activities to enrich your experience.",
      icon: <CheckCircle className="text-green-500 w-8 h-8" />,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-200 to- bg-cyan-100 ">
      <section className="w-[80%] mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative  p-10 rounded-lg shadow-lg text-center mb-12 bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-l ">
          <h1 className="text-4xl font-bold">Why Study at Our Institution?</h1>
          <p className="mt-4 text-lg">
            Empowering students to achieve their dreams with world-class
            education and support.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-l p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="mr-4">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600 mt-2">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WhyStudy;
