"use client";

import { useEffect, useState } from "react";
import { CircleDashed } from "lucide-react";

interface LearningPoint {
  subheading: string;
  paragraph: string;
}

interface Workshop {
  name: string;
  topic: string;
  duration: string;
  startingOn: string;
  timing: string;
  cost: number;
  what_you_will_learn: string;
}

const WhatWillLearn = () => {
  const [learningPoints, setLearningPoints] = useState<LearningPoint[] | null>(null);
  const [loading, setLoading] = useState(true);

  const getFolderName = () => {
    const path = window.location.pathname;
    const folderName = path.split("/").pop();
    return folderName?.replace(/_/g, " ") || "";
  };

  useEffect(() => {
    const fetchWhatYouWillLearn = async () => {
      try {
        const currentWorkshopName = getFolderName();
        const response = await fetch("/api/auth/workshops");
        const allWorkshops: Workshop[] = await response.json();

        const workshopDetails = allWorkshops.find(
          (w) => w.name.toLowerCase() === currentWorkshopName.toLowerCase()
        );

        if (workshopDetails?.what_you_will_learn) {
          // Parse the JSON string into an array of learning points
          const parsedPoints = JSON.parse(workshopDetails.what_you_will_learn);
          setLearningPoints(parsedPoints);
        }
      } catch (error) {
        console.error("Error fetching 'What You Will Learn':", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWhatYouWillLearn();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <CircleDashed className="animate-spin text-[#27448D]" size={32} />
      </div>
    );
  }

  if (!learningPoints) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <h2 className="sm:text-4xl text-center text-[#FF4D31] text-lg font-bold uppercase">
        What you will learn?
      </h2>
      <div className="space-y-6">
        {learningPoints.map((point, index) => (
          <div key={index} className="space-y-2">
            <h3 className="sm:text-xl font-semibold text-[#27448D]">
              {point.subheading}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {point.paragraph}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWillLearn;