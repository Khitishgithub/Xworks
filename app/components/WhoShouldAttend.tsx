"use client";

import { useEffect, useState } from "react";
import { CircleDashed } from "lucide-react";

interface Workshop {
  name: string;
  topic: string;
  duration: string;
  startingOn: string;
  timing: string;
  cost: number;
  who_should_attend: string;
}

interface AttendContent {
  subheading: string;
  paragraph: string;
}

const WhoShouldAttend = () => {
  const [whoShouldAttendContent, setWhoShouldAttendContent] = useState<AttendContent[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper function to get workshop name from folder structure
  const getFolderName = () => {
    const path = window.location.pathname;
    const folderName = path.split("/").pop();
    return folderName?.replace(/_/g, " ") || "";
  };

  useEffect(() => {
    const fetchWhoShouldAttend = async () => {
      try {
        // Get the current workshop name from folder structure (URL)
        const currentWorkshopName = getFolderName();

        // Fetch all workshops
        const response = await fetch("/api/auth/workshops");
        const allWorkshops: Workshop[] = await response.json();

        // Find the matching workshop
        const workshopDetails = allWorkshops.find(
          (w) => w.name.toLowerCase() === currentWorkshopName.toLowerCase()
        );

        // Set the "Who Should Attend" content if it exists
        if (workshopDetails?.who_should_attend) {
          const parsedContent: AttendContent[] = JSON.parse(workshopDetails.who_should_attend);
          setWhoShouldAttendContent(parsedContent);
        }
      } catch (error) {
        console.error("Error fetching 'Who Should Attend':", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWhoShouldAttend();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <CircleDashed className="animate-spin text-[#27448D]" size={32} />
      </div>
    );
  }

  if (!whoShouldAttendContent.length) {
    return null; // Don't render if there's no content
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <h2 className="sm:text-4xl text-center text-[#FF4D31] text-lg font-bold uppercase">Who Should Attend?</h2>
      {whoShouldAttendContent.map((content, index) => (
        <div key={index} className="space-y-2">
          <h3 className="sm:text-xl font-semibold text-[#27448D]">{content.subheading}</h3>
          <p className="text-gray-600 leading-relaxed">{content.paragraph}</p>
        </div>
      ))}
    </div>
  );
};

export default WhoShouldAttend;
