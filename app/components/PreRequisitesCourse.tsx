"use client";

import { useEffect, useState } from "react";
import { CircleDashed } from "lucide-react";

interface Workshop {
  name: string;
  prerequisites: string;
}

interface PrerequisiteContent {
  subheading: string;
  paragraph: string;
}

const PreRequisitesCourse = () => {
  const [prerequisitesContent, setPrerequisitesContent] = useState<PrerequisiteContent[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper function to get the workshop name from the folder structure (URL)
  const getFolderName = () => {
    const path = window.location.pathname;
    const folderName = path.split("/").pop();
    return folderName?.replace(/_/g, " ") || "";
  };

  useEffect(() => {
    const fetchPrerequisites = async () => {
      try {
        // Get the current workshop name from the folder structure (URL)
        const currentWorkshopName = getFolderName();

        // Fetch all workshops
        const response = await fetch("/api/auth/workshops");
        const allWorkshops: Workshop[] = await response.json();

        // Find the matching workshop
        const workshopDetails = allWorkshops.find(
          (w) => w.name.toLowerCase() === currentWorkshopName.toLowerCase()
        );

        // Parse and set the "Prerequisites" data
        if (workshopDetails?.prerequisites) {
          const parsedContent: PrerequisiteContent[] = JSON.parse(workshopDetails.prerequisites);
          setPrerequisitesContent(parsedContent);
        }
      } catch (error) {
        console.error("Error fetching 'Prerequisites':", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrerequisites();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <CircleDashed className="animate-spin text-[#27448D]" size={32} />
      </div>
    );
  }

  if (!prerequisitesContent.length) {
    return null; // Don't render if there's no content
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <h2 className="sm:text-4xl text-center text-[#FF4D31] text-lg font-bold uppercase">
        Pre-requisites for the course
      </h2>
      {prerequisitesContent.map((content, index) => (
        <div key={index} className="space-y-2">
          <h3 className="sm:text-xl font-semibold text-[#27448D]">{content.subheading}</h3>
          <p className="text-gray-600 leading-relaxed">{content.paragraph}</p>
        </div>
      ))}
    </div>
  );
};

export default PreRequisitesCourse;
