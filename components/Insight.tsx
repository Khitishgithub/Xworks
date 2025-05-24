import * as React from "react";
import Box from "@mui/material/Box";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, BookOpen, List, IndianRupee, UserPlus, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface InsightData {
  id: number;
  title: string;
  description: string;
  type: "Skill Acquisition" | "Skills Gap Analysis" | "Competency Badges";
  skillMatchPercentage?: number;
  jobDetails?: {
    salary_range: string;
    job_description: string;
    department_name: string;
    applicants_count?: number;
  };
  hasApplied?: boolean;
  applicationStatus?: 'Pending' | 'Accepted' | 'Rejected';
}

const Insight = () => {
  const [value, setValue] = React.useState(0);
  const [matchedJobs, setMatchedJobs] = React.useState<InsightData[]>([]);
  const [userSkills, setUserSkills] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const tabIcons = [
    <CheckCircle key="check-circle" className="mr-2" />,
    <BookOpen key="book-open" className="mr-2" />,
    <List key="list" className="mr-2" />,
  ];

  // Static data for other tabs
  const staticData: InsightData[][] = [
    [
      {
        id: 1,
        title: "Intro to Skill Acquisition",
        description: "Learn the basics of acquiring new skills effectively.",
        type: "Skill Acquisition",
      },
      {
        id: 2,
        title: "Advanced Techniques",
        description: "Explore advanced techniques in skill acquisition.",
        type: "Skill Acquisition",
      },
    ],
    [
      {
        id: 3,
        title: "Identify Skills Gap",
        description: "Understand how to identify skill gaps in your team.",
        type: "Skills Gap Analysis",
      },
      {
        id: 4,
        title: "Bridge the Gap",
        description: "Strategies to bridge skill gaps effectively.",
        type: "Skills Gap Analysis",
      },
    ],
    [
      {
        id: 5,
        title: "Earn Your Badge",
        description: "Complete tasks to earn competency badges.",
        type: "Competency Badges",
      },
      {
        id: 6,
        title: "Showcase Competency",
        description: "Display badges on your profile for completed skills.",
        type: "Competency Badges",
      },
    ],
  ];

  // Fetch matched jobs on component mount
  React.useEffect(() => {
    const fetchMatchedJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/auth/skiilsmatching', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        const transformedJobs: InsightData[] = data.matchedJobs.map((job: any) => ({
          id: job.job_id,
          title: job.job_title,
          description: `${job.department_name}`,
          type: "Skill Acquisition",
          skillMatchPercentage: job.skillMatchPercentage,
          jobDetails: {
            salary_range: job.salary_range,
            job_description: job.job_description,
            department_name: job.department_name,
            applicants_count: job.applicants_count
          },
          hasApplied: job.hasApplied,
          applicationStatus: job.applicationStatus
        }));

        setMatchedJobs(transformedJobs);
        setUserSkills(data.userSkills);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching matched jobs:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    fetchMatchedJobs();
  }, []);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const handleApply = async (jobId: number) => {
    try {
      const response = await fetch('/api/auth/jobApplications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 400 && data.message === 'Already applied for this job') {
          toast.error('You have already applied for this job');
          return;
        }
        throw new Error('Failed to apply for job');
      }

      const data = await response.json();
      toast.success('Successfully applied for the job!');
      
      // Update the local state to reflect the new applicant count and application status
      setMatchedJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === jobId 
            ? {
                ...job,
                hasApplied: true,
                applicationStatus: 'Pending',
                jobDetails: {
                  ...job.jobDetails!,
                  applicants_count: (job.jobDetails?.applicants_count || 0) + 1
                }
              }
            : job
        )
      );
    } catch (error) {
      console.error('Error applying for job:', error);
      toast.error('Failed to apply for the job');
    }
  };

  const InsightCard = ({ insight }: { insight: InsightData }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-lg rounded-lg p-4 mb-4 hover:shadow-xl transition-shadow duration-300"
    >
      <h3 className="text-xl font-semibold text-blue-600 mb-2">{insight.title}</h3>
      {insight.skillMatchPercentage && (
        <div className="mb-2 text-green-600 font-medium">
          Skill Match: {insight.skillMatchPercentage}%
        </div>
      )}
      <div className="text-sm text-gray-500">
        {insight.jobDetails && (
          <>
            <div className="flex items-center mt-2 text-green-600">
              <IndianRupee className="w-4 h-4 mr-1" />
              <span>Salary Range: {insight.jobDetails.salary_range}</span>
            </div>
            <div className="mt-2 text-gray-700">
              <strong>Department:</strong> {insight.jobDetails.department_name}
            </div>
            <div className="mt-2 text-gray-700">
              <strong>Job Description:</strong> {insight.jobDetails.job_description}
            </div>
            {insight.jobDetails.applicants_count !== undefined && (
              <div className="mt-2 flex items-center text-blue-600">
                <UserPlus className="w-4 h-4 mr-1" />
                <span>Applicants: {insight.jobDetails.applicants_count}</span>
              </div>
            )}
          </>
        )}
        <div className="mt-4">
          {insight.hasApplied ? (
            <div className="space-y-2">
              <div className="w-full bg-green-100 text-green-600 py-2 px-4 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Already Applied
              </div>
              {insight.applicationStatus && (
                <div className={`w-full py-2 px-4 rounded-lg flex items-center justify-center ${
                  insight.applicationStatus === 'Accepted' ? 'bg-green-100 text-green-600' :
                  insight.applicationStatus === 'Rejected' ? 'bg-red-100 text-red-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  Status: {insight.applicationStatus}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => handleApply(insight.id)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );

  // Determine which data to show based on the selected tab
  const getTabData = () => {
    if (value === 0) {
      return matchedJobs.length > 0 
        ? [matchedJobs] 
        : [staticData[0]];
    }
    return [staticData[value]];
  };

  return (
    <Box className="max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white shadow-md rounded-lg overflow-hidden"
      >
        <div className="flex flex-wrap justify-center bg-gray-100 py-4 gap-2">
          {["Skill Acquisition", "Skills Gap Analysis", "Competency Badges"].map((label, index) => (
            <button
              key={label}
              onClick={() => handleChange(index)}
              className={`flex items-center px-4 py-2 rounded-full text-sm md:text-base 
                w-full md:w-auto transition-all duration-300
                ${value === index
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {tabIcons[index]}
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={value}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4"
          >
            {isLoading ? (
              <div className="text-center text-gray-500">Loading matched jobs...</div>
            ) : error ? (
              <div className="text-center text-red-500">
                Error: {error}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {getTabData()[0].map((insight) => (
                  <InsightCard key={insight.id} insight={insight} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </Box>
  );
};

export default Insight;