import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const CreateCorporateMaster = () => {
  const [corporateData, setCorporateData] = useState({
    corporate_name: '',
    registration_number: '',
    industry: '',
    headquarters_address: '',
    contact_email: '',
    contact_phone: '',
    established_date: '',
    tax_id: '',
    website_url: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCorporateData({ ...corporateData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const toastId = toast.loading('Submitting corporate data...');

    try {
      const response = await fetch('/api/auth/creatingcorpmaster', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(corporateData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Corporate created with ID:', result.corporate_id);

        // Show success toast
        toast.success('Corporate master created successfully!', {
          id: toastId,
        });

        // Reset form fields
        setCorporateData({
          corporate_name: '',
          registration_number: '',
          industry: '',
          headquarters_address: '',
          contact_email: '',
          contact_phone: '',
          established_date: '',
          tax_id: '',
          website_url: ''
        });
      } else {
        const errorResponse = await response.json();
        console.error('Error creating corporate:', errorResponse);

        // Show error toast
        toast.error(`Error: ${errorResponse.message || 'Failed to create corporate.'}`, {
          id: toastId,
        });
      }
    } catch (error) {
      console.error('Error during corporate creation:', error);

      // Show error toast
      toast.error('Submission failed! Please try again.', {
        id: toastId,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-1">
      <Toaster position="top-center" reverseOrder={false} />
      <Box height={10} />
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">Create Corporate Master</h2>
      
      <div className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
        <form noValidate autoComplete="off" className="space-y-6">
          <TextField 
            label="Corporate Name" 
            name="corporate_name" 
            value={corporateData.corporate_name} 
            onChange={handleChange} 
            fullWidth 
            variant="outlined" 
            required 
          />
          <TextField 
            label="Registration Number" 
            name="registration_number" 
            value={corporateData.registration_number} 
            onChange={handleChange} 
            fullWidth 
            variant="outlined" 
            required 
          />
          <TextField 
            label="Industry" 
            name="industry" 
            value={corporateData.industry} 
            onChange={handleChange} 
            fullWidth 
            variant="outlined" 
            required 
          />
          <TextField 
            label="Headquarters Address" 
            name="headquarters_address" 
            value={corporateData.headquarters_address} 
            onChange={handleChange} 
            fullWidth 
            variant="outlined" 
            required 
          />
          <TextField 
            label="Contact Email" 
            name="contact_email" 
            value={corporateData.contact_email} 
            onChange={handleChange} 
            fullWidth 
            variant="outlined" 
            required 
            type="email"
          />
          <TextField 
            label="Contact Phone" 
            name="contact_phone" 
            value={corporateData.contact_phone} 
            onChange={handleChange} 
            fullWidth 
            variant="outlined" 
            required 
            type="tel"
          />
          <TextField 
            label="Established Date" 
            name="established_date" 
            value={corporateData.established_date} 
            onChange={handleChange} 
            fullWidth 
            variant="outlined" 
            required 
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField 
            label="Tax ID" 
            name="tax_id" 
            value={corporateData.tax_id} 
            onChange={handleChange} 
            fullWidth 
            variant="outlined" 
            required 
          />
          <TextField 
            label="Website URL" 
            name="website_url" 
            value={corporateData.website_url} 
            onChange={handleChange} 
            fullWidth 
            variant="outlined" 
            required 
            type="url"
          />
          
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-3 mt-6 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-700 transition-all duration-300 ease-in-out"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCorporateMaster;
