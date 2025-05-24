import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Typography, CircularProgress } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

// Define types for corporate and department
interface Corporate {
  corporate_id: string;
  corporate_name: string;
}

interface Department {
  department_id: string;
  department_name: string;
}

// User data type
interface UserData {
  corp_id_id: string;
  dept_id: string;
  username: string;
  name: string;
  email: string;
  password: string;
}

const CreateCorpUser: React.FC = () => {
  const [corporates, setCorporates] = useState<Corporate[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedCorporate, setSelectedCorporate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserData>({
    corp_id_id: '',
    dept_id: '',
    username: '',
    name: '',
    email: '',
    password: '',
  });

  // Fetch corporates when the component loads
  useEffect(() => {
    const fetchCorporates = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/auth/creatingcorpuser');
        const data = await response.json();
        setCorporates(data);
      } catch (error) {
        console.error('Error fetching corporates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCorporates();
  }, []);

  // Fetch departments when corporate is selected
  useEffect(() => {
    if (selectedCorporate) {
      const fetchDepartments = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/auth/creatingcorpuser/departments/${selectedCorporate}`);
          const data = await response.json();
          setDepartments(data);
        } catch (error) {
          console.error('Error fetching departments:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchDepartments();
    }
  }, [selectedCorporate]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/auth/creatingcorpuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(`Corporate user created successfully with ID: ${result.id}`);
        // Clear form
        setUserData({
          corp_id_id: '',
          dept_id: '',
          username: '',
          name: '',
          email: '',
          password: '',
        });
        setSelectedCorporate('');
        setDepartments([]);
      } else {
        const error = await response.json();
        toast.error(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error during user creation:', error);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <>
      <Box height={5} />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <Typography variant="h4" component="h2" className="text-center font-bold mb-6">
          Create Corporate User
        </Typography>
        <form noValidate autoComplete="off" className="space-y-4">
          {/* Corporate dropdown */}
          <TextField
            label="Corporate"
            name="corp_id_id"
            value={userData.corp_id_id}
            onChange={(e) => {
              handleChange(e);
              setSelectedCorporate(e.target.value);
            }}
            fullWidth
            select
            sx={{ mb: 2 }}
            className="border rounded-md focus:ring focus:ring-green-300"
          >
            {loading ? (
              <MenuItem disabled>
                <CircularProgress size={24} />
              </MenuItem>
            ) : (
              corporates.map((corporate) => (
                <MenuItem key={corporate.corporate_id} value={corporate.corporate_id}>
                  {`${corporate.corporate_id} - ${corporate.corporate_name}`}
                </MenuItem>
              ))
            )}
          </TextField>

          {/* Department dropdown */}
          <TextField
            label="Department"
            name="dept_id"
            value={userData.dept_id}
            onChange={handleChange}
            fullWidth
            select
            disabled={!selectedCorporate}
            className="border rounded-md focus:ring focus:ring-green-300"
          >
            {departments.map((department) => (
              <MenuItem key={department.department_id} value={department.department_id}>
                {`${department.department_id} - ${department.department_name}`}
              </MenuItem>
            ))}
          </TextField>

          {/* Other user fields */}
          <TextField
            label="Username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            fullWidth
            required
            className="border rounded-md focus:ring focus:ring-green-300"
          />
          <TextField
            label="Name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            fullWidth
            required
            className="border rounded-md focus:ring focus:ring-green-300"
          />
          <TextField
            label="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            fullWidth
            required
            className="border rounded-md focus:ring focus:ring-green-300"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={userData.password}
            onChange={handleChange}
            fullWidth
            required
            className="border rounded-md focus:ring focus:ring-green-300"
          />

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            variant="contained"
            className="w-full py-3 mt-6 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-700 transition-all duration-300 ease-in-out"
          >
            Upload Corporate Data
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateCorpUser;
