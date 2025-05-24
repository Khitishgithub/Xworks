"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import {
  Clock,
  Calendar,
  Users,
  CheckCircle,
  DollarSign,
  CircleDashed,
} from "lucide-react";

// Define the expected structure of a workshop

interface About {
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
  about_workshop:string;
}

// Helper function to get workshop name from folder name
const getFolderName = () => {
  const path = window.location.pathname;
  const folderName = path.split("/").pop();
  return folderName?.replace(/_/g, " ") || "";
};

export default function WorkshopPage() {
  const [about, setAbout] = useState<About[] | null>(null);
  const [workshop, setWorkshop] = useState<Workshop | null>(null); // Add the explicit type here
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshopDetails = async () => {
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

        if (workshopDetails) {
          setWorkshop(workshopDetails);
        }
        if (workshopDetails?.about_workshop) {
          // Parse the JSON string into an array of learning points
          const parsedPoints = JSON.parse(workshopDetails.about_workshop);
          setAbout(parsedPoints);
        }
      } catch (error) {
        console.error("Error fetching workshop details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshopDetails();
  }, []);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 z-50">
        <CircleDashed className="animate-spin text-[#27448D]" size={64} />
      </div>
    );
  }

  if (!workshop) {
    return <div className="text-center py-10">Workshop not found</div>;
  }
  if(!about){
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="sm:text-4xl  text-[#FF4D31] text-lg font-bold uppercase">
        About our course
      </h1>

      <div className="grid gap-6">
        {/* Features Section */}
        <div className="space-y-6">
        {about.map((point, index) => (
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

        {/* Key Information Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <Typography className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#ff6347]" />
                Duration & Schedule
              </Typography>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-gray-600">Duration : {workshop.duration}</p>
                <p className="font-semibold">
                  Starting From: {workshop.startingOn}
                </p>
                <p className="text-gray-600">Timing: {workshop.timing}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Typography className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-[#ff6347]" />
                Investment & Certification
              </Typography>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold">Rs. {workshop.cost}/- + 18% GST</p>
                <div className="flex items-start gap-2 mt-4">
                  <CheckCircle className="h-5 w-5 text-[#ff6347] mt-1" />
                  <p className="text-gray-600">
                    Receive a verified certificate upon successful completion of
                    the workshop
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Registration CTA */}
        <div className="text-center">
          <p className="text-lg font-semibold text-[#ff6347]">
            Limited Seats Available! Register Now
          </p>
        </div>
      </div>
    </div>
  );
}
