import ContactForm from "@/components/ContactForm/ContactForm";
// import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="pb-20 ">
      {/* Top Section */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-robotoCondensed ">
        {/* Header Section */}
        <section className="relative overflow-hidden py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 up">Contact</h1>
          </div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-700 opacity-30 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-600 opacity-40 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </section>
      </div>

      {/* Contact Information Section with  Cards */}
      <section className=" font-robotoCondensed py-10 bg-gradient-to-r from-cyan-50 to-blue-50 ">
        <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 ">
          {/* Address Card */}
          <div className="group bg-white shadow-xl rounded-xl p-4 text-center border border-gray-100 hover:shadow-2xl hover:border-blue-500 transition-all duration-300">
            <div className="flex items-center justify-center size-14 rounded-full bg-blue-100 text-blue-500 mx-auto mb-5">
              <MapPin size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Our Address
            </h3>
            <p className="text-gray-600">Mirer Moydan, Sylhet</p>
          </div>

          {/* Phone Card */}
          <div className="group bg-white shadow-xl rounded-xl p-2 text-center border border-gray-100 hover:shadow-2xl hover:border-blue-500 transition-all duration-300">
            <div className="flex items-center justify-center size-14 rounded-full bg-blue-100 text-blue-500 mx-auto mb-5">
              <Phone size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Phone</h3>
            <p className="text-gray-600 hover:text-blue-500 transition-all">
              +8801733-377614
            </p>
          </div>

          {/* Email Card */}
          <div className="group bg-white shadow-xl rounded-xl p-2 text-center border border-gray-100 hover:shadow-2xl hover:border-blue-500 transition-all duration-300">
            <div className="flex items-center justify-center size-14 rounded-full bg-blue-100 text-blue-500 mx-auto mb-5">
              <Mail size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Email</h3>
            <p className="text-gray-600 hover:text-blue-500 transition-all">
              abc@gmail.com
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50">
        <ContactForm />
      </div>

      {/* Google Map Section */}
      <section className="flex justify-center bg-gradient-to-r from-cyan-50 to-blue-50 py-20 ">
        <div className="relative w-[80%] mx-auto h-[450px] rounded-lg overflow-hidden shadow-lg border border-gray-300 ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3618.8123214311677!2d91.8565436!3d24.9043826!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37505530790bc693%3A0xc0da82851ee83208!2sBlue%20Bird%20School%20%26%20College!5e0!3m2!1sen!2sbd!4v1733069799484!5m2!1sen!2sbd"
            title="Google Map Location"
            className="absolute top-0 left-0 w-full h-full border-0"
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Call to Action Section */}
      {/* <section className="bg-blue-600 text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">Have Questions?</h2>
        <p className="text-lg mb-6">
          Reach out today and let's discuss how we can help you.
        </p>
        <Button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all">
          Contact Us Now
        </Button>
      </section> */}
    </div>
  );
};

export default ContactInfo;
