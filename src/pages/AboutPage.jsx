import React from "react";

function AboutPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Empowering Healthcare Professionals & Individuals</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Reliable Medical Surgical Supplies since 2010 – MEDIZINTEK is committed to quality, innovation, and customer satisfaction.
        </p>
      </section>

      {/* About Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">About MEDIZINTEK</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Established in 2010, MEDIZINTEK is a leading authorized distributor of surgical disposables and healthcare products. 
          Serving hospitals and dealers across South India, we ensure high-quality products that meet industry standards.
        </p>

        <h2 className="text-3xl font-semibold text-gray-800 mt-8">Our Legacy</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          With dealership experience in brands like <span className="font-semibold">Nipro, Schulke, BD, Johnson & Johnson</span>, and more, 
          we have built a strong presence in the healthcare industry. Our monthly turnover is ₹80-90 lakhs, and we are now expanding into the retail sector.
        </p>

        {/* Expansion Section */}
        <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Medizintek Plus – Expanding Horizons</h2>
          <p className="text-lg text-gray-600 leading-relaxed mt-2">
            Introducing <span className="font-semibold">Medizintek Plus</span>, a Retail Hyper Mart for Surgical & Medicine, with plans to expand into a 
            <span className="font-semibold"> Retail Pharmacy & Clinic</span> offering specialized doctor consultations.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-2">
            Expected sales: ₹25 lakhs/month with a minimum profit of 20%.
          </p>
        </div>

        {/* Medizintek Promise */}
        <div className="mt-10">
          <h2 className="text-3xl font-semibold text-gray-800">The Medizintek Promise</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="p-4 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800">Quality First</h3>
              <p className="text-lg text-gray-600">We prioritize excellence, ensuring every product meets the highest standards.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800">Accessibility</h3>
              <p className="text-lg text-gray-600">Essential medical supplies, made affordable and available for all.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800">Customer-Centric</h3>
              <p className="text-lg text-gray-600">Dedicated to exceptional service, personalized support, and seamless shopping.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800">Integrity</h3>
              <p className="text-lg text-gray-600">Honest, transparent, and committed to ethical business practices.</p>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="mt-12 bg-gray-800 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold">Beyond Healthcare</h2>
          <p className="text-lg mt-2">
            Expanding our services with a <span className="font-semibold">Hygiene Health Club, Beauty Station, Cafeteria, Game Center, 
            Office Space, Luxury Conference Hall,</span> and rental suites.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
