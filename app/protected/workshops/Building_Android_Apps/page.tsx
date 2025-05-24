import FaqContact from "@/app/components/FaqContact";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import MainHeading from "@/app/components/MainHeading";
import PreRequisitesCourse from "@/app/components/PreRequisitesCourse";
import WhatWillLearn from "@/app/components/WhatWillLearn";
import WhoShouldAttend from "@/app/components/WhoShouldAttend";
import WhyAttend from "@/app/components/WhyAttend";
import WorkshopInfo from "@/app/components/WorkshopInfo";

import React from "react";

const Page = () => {
  return (
    <div>
      <Header />
      <MainHeading />
      <WhatWillLearn />
      <WhyAttend />
      <WhoShouldAttend />
      <PreRequisitesCourse />

      <WorkshopInfo />
      <FaqContact />

      <Footer />
    </div>
  );
};

export default Page;
