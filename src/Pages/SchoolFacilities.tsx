const SchoolFacilities = () => {
  const facilities = [
    {
      title: "Modern Classrooms",
      description:
        "Equipped with smart boards, projectors, and ergonomic seating to enhance learning.",
      image:
        "https://img.freepik.com/premium-photo/modern-classroom-interior-light-tones_241146-108.jpg", // Replace with actual image URLs
    },
    {
      title: "Science Labs",
      description:
        "State-of-the-art labs for Physics, Chemistry, and Biology experiments.",
      image:
        "https://media.istockphoto.com/id/457448925/photo/students-caring-out-experiments-in-laboratory.jpg?s=612x612&w=0&k=20&c=FTJQtQsOldAVSGtbxkEXlcNqXkSS9KwpqO2iSh17i3A=",
    },
    {
      title: "Sports Complex",
      description:
        "Includes football fields, basketball courts, and indoor gym facilities.",
      image:
        "https://img.freepik.com/premium-photo/high-school-sports-facilities-florida-american-football-stadium-tennis-court-baseball-diamond-sport-infrastructure_127089-36338.jpg",
    },
    {
      title: "Library",
      description:
        "A vast collection of books, journals, and digital resources for all ages.",
      image:
        "https://t3.ftcdn.net/jpg/06/07/65/00/360_F_607650003_nwVN45GtgJy8tOB0ECEFPCKxBgoRwK1W.jpg",
    },
    {
      title: "Music & Arts Room",
      description:
        "Dedicated spaces for nurturing creativity through music and art programs.",
      image:
        "https://media.istockphoto.com/id/1073191854/photo/temporary-music-classroom-in-gym-3.jpg?s=612x612&w=0&k=20&c=OhvGS5UKwKPsliU8y6tGVrxc72Lq2dz_ExBgQVsNNKg=",
    },
    {
      title: "Cafeteria",
      description:
        "Serving nutritious and delicious meals in a hygienic environment.",
      image:
        "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMTRfc2NlbmVfb2ZfM2RfaWxsdXN0cmF0aW9uX2FuX2VtcHR5X2hpZ2hfc2Nob29sX183ODBjMDNjMS04NjRlLTRiOWMtYjVhYy1mNjQzYzQ2ODIxMjlfMS5qcGc.jpg",
    },
  ];

  return (
    <>
      <div className="bg-gradient-to-r from-slate-200 to- bg-cyan-100  ">
        <section className="w-[80%] mx-auto px-4 py-8  ">
          {/* Header */}
          <div className="relative  p-10 rounded-lg shadow-lg text-center mb-12 bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-l ">
            <h1 className="text-4xl font-bold">Our School Facilities</h1>
            <p className="mt-4 text-lg">
              Explore the facilities that make our school a place of learning,
              creativity, and growth.
            </p>
          </div>

          {/* Facilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-600">
                    {facility.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default SchoolFacilities;
