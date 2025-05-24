"use client"
import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { Award, Download } from "lucide-react";
import Image from "next/image";

const CertificateGenerator = () => {
  const certificateRef = useRef(null);
  const [formData, setFormData] = useState({
    studentName: "",
    courseName: "",
    instructorName: "",
    completionDate: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  });

  const [showCertificate, setShowCertificate] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCertificate(true);
  };

  const handleDownload = async () => {
    if (certificateRef.current) {
      try {
        // Create canvas from the certificate div
        const canvas = await html2canvas(certificateRef.current, {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });

        // Get canvas dimensions
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Create PDF
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });

        // Add image to PDF
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 297, 210); // A4 landscape dimensions

        // Download PDF
        pdf.save(`${formData.studentName}-certificate.pdf`);

      } catch (error) {
        console.error('Error generating PDF certificate:', error);
      }
    }
  };

  return (
    <Box className="min-h-screen p-6 bg-gray-50">
      <Box className="max-w-4xl mx-auto space-y-6">
        {/* Input Form */}
        <Card>
          <CardHeader
            title={
              <Box className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-blue-600" />
                <Typography variant="h5" component="h2">
                  Generate Certificate
                </Typography>
              </Box>
            }
          />
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Box className="space-y-4">
                <TextField
                  fullWidth
                  label="Student Name"
                  placeholder="Enter student name"
                  value={formData.studentName}
                  onChange={(e) =>
                    setFormData({ ...formData, studentName: e.target.value })
                  }
                  required
                />
                <TextField
                  fullWidth
                  label="Course Name"
                  placeholder="Enter course name"
                  value={formData.courseName}
                  onChange={(e) =>
                    setFormData({ ...formData, courseName: e.target.value })
                  }
                  required
                />
                <TextField
                  fullWidth
                  label="Instructor Name"
                  placeholder="Enter instructor name"
                  value={formData.instructorName}
                  onChange={(e) =>
                    setFormData({ ...formData, instructorName: e.target.value })
                  }
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Generate Certificate
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>

        {/* Certificate Preview */}
        {showCertificate && (
          <Card>
            <CardHeader
              title={
                <Box className="flex justify-between items-center">
                  <Typography variant="h6">Certificate Preview</Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Download className="w-4 h-4" />}
                    onClick={handleDownload}
                  >
                    Download PDF
                  </Button>
                </Box>
              }
            />
            <CardContent>
              <Box className="relative w-full aspect-[1.4/1] bg-white" ref={certificateRef}>
                {/* Certificate Content */}
                <Box className="absolute inset-0 border-[16px] border-double border-gray-200">
                  <Box className="relative w-full h-full bg-opacity-5">
                    {/* Centered Logo */}
                    <Box className="absolute top-0 left-0 flex items-center justify-center w-full h-32">
                      <Box className="relative w-24 h-24">
                        <Image
                          src="/XWORKS.png"
                          alt="Company Logo"
                          fill
                          className="object-contain"
                          priority
                        />
                      </Box>
                    </Box>

                    {/* Certificate Content */}
                    <Box className="relative flex flex-col items-center justify-center w-full h-full px-12 pt-20 text-center">
                      <Typography
                        variant="h4"
                        className="mb-1 font-bold text-gray-800"
                      >
                        Certificate of Completion
                      </Typography>
                      <Typography className="mb-8 text-gray-600">
                        This certificate is awarded to
                      </Typography>

                      <Typography
                        variant="h3"
                        className="mb-8 font-bold text-blue-600"
                      >
                        {formData.studentName || "Student Name"}
                      </Typography>

                      <Typography className="mb-2 text-gray-600">
                        for successfully completing the course
                      </Typography>
                      <Typography
                        variant="h5"
                        className="mb-8 font-bold text-gray-800"
                      >
                        {formData.courseName || "Course Name"}
                      </Typography>

                      {/* Bottom Section */}
                      <Box className="flex items-end justify-between w-full mt-8">
                        <Box className="text-left">
                          <Divider sx={{ width: "12rem" }} />
                          <Typography
                            variant="body2"
                            className="mt-2 text-gray-600"
                          >
                            {formData.instructorName || "Instructor Name"}
                          </Typography>
                          <Typography variant="body2" className="text-gray-500">
                            Course Instructor
                          </Typography>
                        </Box>

                        <Box className="text-center">
                          <Typography
                            variant="body2"
                            className="mb-2 text-gray-600"
                          >
                            Issued on
                          </Typography>
                          <Typography
                            variant="body2"
                            className="font-medium text-gray-800"
                          >
                            {formData.completionDate}
                          </Typography>
                        </Box>

                        <Box className="text-right">
                          <Divider sx={{ width: "12rem" }} />
                          <Typography
                            variant="body2"
                            className="mt-2 text-gray-600"
                          >
                            Certificate ID
                          </Typography>
                          <Typography variant="body2" className="text-gray-500">
                            UC-{Math.random().toString(36).substr(2, 9)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default CertificateGenerator;