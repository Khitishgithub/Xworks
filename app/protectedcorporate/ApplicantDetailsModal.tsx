//app/protectedcorporate/ApplicationDetailsModal.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Alert,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { People, Visibility, Download } from "@mui/icons-material";

interface Applicant {
  user_name: string;
  email: string;
  application_date: string;
  status: string;
  application_id: number;
  applicant_id: string;
}

const APPLICATION_STATUSES = ["Pending", "Accepted", "Rejected"] as const;
type ApplicationStatus = typeof APPLICATION_STATUSES[number];

const ApplicantDetailsModal = ({
  jobId,
  applicantsCount,
}: {
  jobId: number;
  applicantsCount: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);
  const [downloadingResume, setDownloadingResume] = useState<string | null>(null);

  const fetchApplicants = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/auth/applicants?jobId=${jobId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch applicants');
      }
      
      setApplicants(data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
      setError(error instanceof Error ? error.message : 'Failed to fetch applicants');
    } finally {
      setIsLoading(false);
    }
  }, [jobId]);

  const handleStatusChange = async (applicationId: number, newStatus: ApplicationStatus) => {
    setUpdatingStatus(applicationId);
    try {
      const response = await fetch('/api/auth/updateApplicationStatus', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          applicationId,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update status');
      }

      setApplicants(prevApplicants =>
        prevApplicants.map(applicant =>
          applicant.application_id === applicationId
            ? { ...applicant, status: newStatus }
            : applicant
        )
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleDownloadResume = async (applicantId: string) => {
    setDownloadingResume(applicantId);
    try {
      const response = await fetch(`/api/auth/DownloadResume?userId=${applicantId}`);
      
      if (!response.ok) {
        throw new Error('Failed to download resume');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `resume_${applicantId}.pdf`; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to download resume');
    } finally {
      setDownloadingResume(null);
    }
  };

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  useEffect(() => {
    if (isOpen) {
      fetchApplicants();
    }
  }, [isOpen, fetchApplicants, applicantsCount]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex items-center text-blue-600">
          <People style={{ marginRight: "0.5rem", fontSize: "1rem" }} />
          <span>Total Applicants: {applicantsCount || 0}</span>
        </div>
        <Button
          onClick={handleOpenModal}
          variant="text"
          size="small"
          startIcon={<Visibility />}
          style={{ textTransform: "none" }}
        >
          View Details
        </Button>
      </div>

      <Dialog 
        open={isOpen} 
        onClose={() => setIsOpen(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          Applicant Details
          {applicantsCount > 0 && ` (${applicantsCount} total)`}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" style={{ marginBottom: '1rem' }}>
              {error}
            </Alert>
          )}
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <CircularProgress />
            </div>
          ) : applicants.length === 0 ? (
            <Alert severity="info" style={{ margin: '2rem 0' }}>
              No applicants found for this position
            </Alert>
          ) : (
            <TableContainer component={Paper} style={{ maxHeight: "60vh" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Application Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Resume</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applicants.map((applicant) => (
                    <TableRow key={applicant.application_id}>
                      <TableCell>{applicant.user_name}</TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${applicant.email}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleEmailClick(applicant.email);
                          }}
                          className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                        >
                          {applicant.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        {new Date(applicant.application_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <FormControl size="small" fullWidth>
                          <Select
                            value={applicant.status}
                            onChange={(e) => handleStatusChange(applicant.application_id, e.target.value as ApplicationStatus)}
                            disabled={updatingStatus === applicant.application_id}
                          >
                            {APPLICATION_STATUSES.map((status) => (
                              <MenuItem key={status} value={status}>
                                {status}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<Download />}
                          onClick={() => handleDownloadResume(applicant.applicant_id)}
                          disabled={downloadingResume === applicant.applicant_id}
                          style={{ textTransform: "none" }}
                        >
                          {downloadingResume === applicant.applicant_id ? "Downloading..." : "Download"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApplicantDetailsModal;