import React from 'react';

const HowItWorks = () => {
    return (
      
<section className="py-20">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <h2 className="text-4xl font-bold mb-2">How It Works</h2>
    <p className="text-gray-600 mb-12">
      Simple 3-step workflow to keep your city organized and clean.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

      <div className="p-6 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center text-3xl">
          📝
        </div>
        <h3 className="text-xl font-bold mt-4">1. Report a Problem</h3>
        <p className="text-gray-600 mt-2">
          Fill out a simple form and submit your issue with details.
        </p>
      </div>

      <div className="p-6 text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center text-3xl">
          🔄
        </div>
        <h3 className="text-xl font-bold mt-4">2. Staff Reviews</h3>
        <p className="text-gray-600 mt-2">
          Staff checks your issue and assigns workers or team members.
        </p>
      </div>

      <div className="p-6 text-center">
        <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto flex items-center justify-center text-3xl">
          ✅
        </div>
        <h3 className="text-xl font-bold mt-4">3. Issue Resolved</h3>
        <p className="text-gray-600 mt-2">
          You get live updates until the issue is marked resolved.
        </p>
      </div>

    </div>
  </div>
</section>

    );
};

export default HowItWorks;