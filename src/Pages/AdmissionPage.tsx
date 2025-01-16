// import FeesAndPayment from "./AdmissionFees";
// import AdmissionForm from "./AdmissionForm";

const AdmissionPage = () => {
  return (
    <>
      <>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-slate-100 to-cyan-200 font-robotoCondensed ">
          <div className="text-center space-y-6 p-8 max-w-lg">
            <h1 className="text-4xl font-bold text-gray-800 tracking-wide">
              Stay Tuned!
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xs mx-auto">
              Admission feature will soon be available on our website.🌟
            </p>
            <div>
              <button
                className="px-6 py-3 text-white font-medium bg-blue-600 rounded-full shadow-lg hover:shadow-2xl hover:bg-blue-700 transition-all duration-300"
                onClick={() => alert("You will be notified!")}
              >
                Notify Me 📩
              </button>
            </div>
          </div>
        </div>
      </>

      {/* <AdmissionForm/>
      <FeesAndPayment/> */}
    </>
  );
};

export default AdmissionPage;
