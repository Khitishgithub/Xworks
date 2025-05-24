"use client";

import { useEffect, useState } from 'react';
import { CircleDashed } from "lucide-react";

interface Workshop {
  name: string;
  topic: string;
  duration: string;
  startingOn: string;
  timing: string;
  cost: number;
  main_heading: string;
}

interface HeadingContent {
  subheading: string;
  paragraph: string;
}

const MainHeading = () => {
  const [headingContent, setHeadingContent] = useState<HeadingContent[]>([]);
  const [workshopname, setWorkshopName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Helper function to get workshop name from folder name
  const getFolderName = () => {
    const path = window.location.pathname;
    const folderName = path.split("/").pop();
    return folderName?.replace(/_/g, " ") || "";
  };

  useEffect(() => {
    const fetchHeading = async () => {
      try {
        // Get the workshop name from the folder structure
        const currentWorkshopName = getFolderName();

        // Fetch all workshops
        const response = await fetch("/api/auth/workshops");
        const allWorkshops: Workshop[] = await response.json();

        // Find the matching workshop
        const workshopDetails = allWorkshops.find(
          (w) => w.name.toLowerCase() === currentWorkshopName.toLowerCase()
        );

        if (workshopDetails?.main_heading) {
          // Parse the main_heading content as JSON
          const parsedHeading: HeadingContent[] = JSON.parse(workshopDetails.main_heading);
          setHeadingContent(parsedHeading);
        }
        
        if (workshopDetails?.name) {
          setWorkshopName(workshopDetails.name);
        }
      } catch (error) {
        console.error("Error fetching workshop heading:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeading();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <CircleDashed className="animate-spin text-[#27448D]" size={32} />
      </div>
    );
  }

  if (!headingContent.length) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-12">
   

      {/* Display each subheading and paragraph */}
      {headingContent.map((content, index) => (
        <div key={index} className="space-y-4">
          <h2 className="sm:text-4xl text-center text-[#FF4D31] text-lg font-bold uppercase">{content.subheading}</h2>
          <p className="text-gray-600 leading-relaxed">{content.paragraph}</p>
        </div>
      ))}
    </div>
  );
};

export default MainHeading;
