import React from 'react';
import Banner from '../Banner/Banner';
import Features from '../Features/Features';
import HowItWorks from '../HowItWorks/HowItWorks';
import LatestResolvedIssues from '../LatestResolvedIssues/LatestResolvedIssues';
const Home = () => {
    return (
      <div className="container-responsive">
        <Banner></Banner>
        <LatestResolvedIssues></LatestResolvedIssues>
        <Features></Features>
        <HowItWorks></HowItWorks>
      </div>
    );
};

export default Home;