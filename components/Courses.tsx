import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader, BookOpen, CheckCircle, List } from "lucide-react";
import { Box } from "@mui/material";

interface Course {
  course_id: number;
  course_name: string;
  description: string | null;
  duration_hours: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  status: "Active" | "Inactive" | "In Progress" | "Enrolled";
  url: string;
}

const Loading = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen"
    >
      <Loader 
        className="animate-spin" 
        size={100} 
        color="rgba(59, 130, 246, 0.75)" 
      />
    </motion.div>
  );
};

export default function Courses() {
  const [value, setValue] = useState(0);
  const [completedCourses, setCompletedCourses] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [userCourses, setUserCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const tabIcons = [
    <CheckCircle key="check-circle" className="mr-2" />,
    <BookOpen key="book-open" className="mr-2" />,
    <List key="list" className="mr-2" />
  ];

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoints = [
          "/api/auth/completecourses",
          "/api/auth/allcourses",
          "/api/auth/interestedcourse"
        ];
        const response = await fetch(endpoints[value]);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch courses for tab ${value}`);
        }
        
        const data: Course[] = await response.json();
        
        switch(value) {
          case 0:
            setCompletedCourses(data);
            break;
          case 1:
            setAllCourses(data);
            break;
          case 2:
            setUserCourses(data);
            break;
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [value]);

  const CourseCard = ({ course, animated = true }: { course: Course, animated?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: animated ? 20 : 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-lg rounded-lg p-4 mb-4 hover:shadow-xl transition-shadow duration-300"
    >
      <h3 className="text-xl font-semibold text-blue-600 mb-2">
        {course.course_name}
      </h3>
      {course.description && (
        <p className="text-gray-600 mb-2">{course.description}</p>
      )}
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
        <div>
          <strong>Duration:</strong> {course.duration_hours} hours
        </div>
        <div>
          <strong>Level:</strong> {course.level}
        </div>
        <div>
          <strong>Status:</strong> {course.status}
        </div>
      </div>
      {course.url && (
        <a 
          href={course.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-2 block text-blue-500 hover:underline"
        >
          View Course
        </a>
      )}
    </motion.div>
  );

  return (
    <>
  
  <div className="max-w-4xl mx-auto p-4">
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white shadow-md rounded-lg overflow-hidden"
  >
    <div className="flex flex-wrap justify-center bg-gray-100 py-4 gap-2">
      {["Completed Courses", "All Courses", "Recommended Courses"].map((label, index) => (
        <button
          key={label}
          onClick={() => handleChange(index)}
          className={`
            flex items-center px-4 py-2 rounded-full text-sm md:text-base 
            w-full md:w-auto transition-all duration-300
            ${value === index 
              ? 'bg-blue-500 text-white shadow-lg' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          {tabIcons[index]}
          {label}
        </button>
      ))}
    </div>

    <AnimatePresence mode="wait">
      {loading ? (
        <Loading />
      ) : error ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-red-500 p-4"
        >
          Error: {error}
        </motion.div>
      ) : (
        <motion.div
          key={value}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4"
        >
          {value === 0 && completedCourses.length === 0 && (
            <p className="text-center text-gray-500">No completed courses found.</p>
          )}
          {value === 1 && allCourses.length === 0 && (
            <p className="text-center text-gray-500">No courses found.</p>
          )}
          {value === 2 && userCourses.length === 0 && (
            <p className="text-center text-gray-500">No recommended courses found.</p>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {value === 0 && completedCourses.map(course => (
              <CourseCard key={course.course_id} course={course} />
            ))}
            {value === 1 && allCourses.map(course => (
              <CourseCard key={course.course_id} course={course} />
            ))}
            {value === 2 && userCourses.map(course => (
              <CourseCard key={course.course_id} course={course} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
</div>

    </>
  );
}