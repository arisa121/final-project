import React from 'react';

const Features = () => {
    return (
        
<section className="py-20">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <h2 className="text-4xl font-bold mb-2 text-gray-800">
      Powerful Features
    </h2>
    <p className="text-gray-600 mb-12">
      Our smart city service system helps citizens, staff, and admins stay connected.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* card 1 */}
      <div className="p-6 rounded-2xl shadow-xl bg-white hover:-translate-y-2 transition-all duration-300 border">
        <h3 className="text-xl font-semibold mb-3">Easy Issue Reporting</h3>
        <p className="text-gray-600">
          Instantly report issues like garbage, road problems, water/electricity issues.
        </p>
      </div>

      {/* card 2 */}
      <div className="p-6 rounded-2xl shadow-xl bg-white hover:-translate-y-2 transition-all duration-300 border">
        <h3 className="text-xl font-semibold mb-3">Real-Time Tracking</h3>
        <p className="text-gray-600">
          Track the progress of your issue with live updates & notifications.
        </p>
      </div>

      {/* card 3 */}
      <div className="p-6 rounded-2xl shadow-xl bg-white hover:-translate-y-2 transition-all duration-300 border">
        <h3 className="text-xl font-semibold mb-3">Smart Dashboard</h3>
        <p className="text-gray-600">
          Clean and modern dashboard for citizens, staff, and administrators.
        </p>
      </div>
    </div>
  </div>
</section>

    );
};

export default Features;