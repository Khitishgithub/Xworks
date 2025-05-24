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
  why_attend: string;
}

interface AttendContent {
  subheading: string;
  paragraph: string;
}

const WhyAttend = () => {
  const [whyAttendContent, setWhyAttendContent] = useState<AttendContent[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper function to get workshop name from folder name
  const getFolderName = () => {
    const path = window.location.pathname;
    const folderName = path.split("/").pop();
    return folderName?.replace(/_/g, " ") || "";
  };

  useEffect(() => {
    const fetchWhyAttend = async () => {
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

        if (workshopDetails?.why_attend) {
          // Parse the why_attend content as JSON
          const parsedContent: AttendContent[] = JSON.parse(workshopDetails.why_attend);
          setWhyAttendContent(parsedContent);
        }
      } catch (error) {
        console.error("Error fetching 'Why Attend':", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWhyAttend();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <CircleDashed className="animate-spin text-[#27448D]" size={32} />
      </div>
    );
  }

  if (!whyAttendContent.length) {
    return null; // Don't render if there's no content
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <h2 className="sm:text-4xl text-center text-[#FF4D31] text-lg font-bold uppercase">Why Attend?</h2>

      {/* Display each subheading and paragraph */}
      {whyAttendContent.map((content, index) => (
        <div key={index} className="space-y-2">
          <h3 className="sm:text-xl font-semibold text-[#27448D]">{content.subheading}</h3>
          <p className="text-gray-600 leading-relaxed">{content.paragraph}</p>
        </div>
      ))}
    </div>
  );
};

export default WhyAttend;
