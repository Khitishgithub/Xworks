import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Paper,
  Container,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const CreateWorkshops = () => {
  const [workshopData, setWorkshopData] = useState({
    workshop_name: "",
    topic: "",
    duration: "",
    cost: "",
    start_date: "",
    schedule: "",
    is_weekend_only: true,
    main_heading: [],
    what_you_will_learn: [],
    why_attend: [],
    about_workshop: [],
    who_should_attend: [],
    prerequisites: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Check if the field is a simple string field or an array of objects
    if (name.includes(".")) {
      const [section, index, field] = name.split(".");
      const updatedSection = [...workshopData[section]];
      updatedSection[index] = {
        ...updatedSection[index],
        [field]: value,
      };

      setWorkshopData((prevData) => ({
        ...prevData,
        [section]: updatedSection,
      }));
    } else {
      // Handle simple string fields directly
      setWorkshopData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const addSubheading = (section: string) => {
    setWorkshopData((prevData) => ({
      ...prevData,
      [section]: [...prevData[section], { subheading: "", paragraph: "" }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/workshops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workshopData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Workshop created with ID: ${data.workshop_id}`);
        // Reset form fields
        setWorkshopData({
          workshop_name: "",
          topic: "",
          duration: "",
          cost: "",
          start_date: "",
          schedule: "",
          is_weekend_only: true,
          main_heading: [],
          what_you_will_learn: [],
          why_attend: [],
          about_workshop: [],
          who_should_attend: [],
          prerequisites: [],
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error creating workshop");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
    <Box sx={{ height: 10 }} />
    <Paper
      elevation={3}
      sx={{ p: 4, borderRadius: "10px", backgroundColor: "#f9f9f9" }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#1976d2", fontWeight: "bold" }}
      >
        Create Workshop
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Workshop Name"
              name="workshop_name"
              value={workshopData.workshop_name}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Topic"
              name="topic"
              value={workshopData.topic}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Duration"
              name="duration"
              value={workshopData.duration}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Cost (in INR)"
              name="cost"
              value={workshopData.cost}
              onChange={handleChange}
              required
              fullWidth
              type="number"
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Start Date (as text)"
              name="start_date"
              value={workshopData.start_date}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              placeholder="e.g. Every Weekend"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Schedule"
              name="schedule"
              value={workshopData.schedule}
              onChange={handleChange}
              required
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>

            {/* Main Heading Section */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Main Heading
                <IconButton onClick={() => addSubheading("main_heading")}>
                  <AddIcon />
                </IconButton>
              </Typography>
              {workshopData.main_heading.map((item, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <TextField
                    name={`main_heading.${index}.subheading`}
                    value={item.subheading}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 1 }}
                    placeholder="Subheading"
                  />
                  <TextField
                    name={`main_heading.${index}.paragraph`}
                    value={item.paragraph}
                    onChange={handleChange}
                    required
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Paragraph"
                  />
                </Box>
              ))}
            </Grid>

            {/* What You Will Learn Section */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                What You Will Learn
                <IconButton onClick={() => addSubheading("what_you_will_learn")}>
                  <AddIcon />
                </IconButton>
              </Typography>
              {workshopData.what_you_will_learn.map((item, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <TextField
                    name={`what_you_will_learn.${index}.subheading`}
                    value={item.subheading}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 1 }}
                    placeholder="Subheading"
                  />
                  <TextField
                    name={`what_you_will_learn.${index}.paragraph`}
                    value={item.paragraph}
                    onChange={handleChange}
                    required
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Paragraph"
                  />
                </Box>
              ))}
            </Grid>

            {/* Why Attend Section */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Why Attend?
                <IconButton onClick={() => addSubheading("why_attend")}>
                  <AddIcon />
                </IconButton>
              </Typography>
              {workshopData.why_attend.map((item, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <TextField
                    name={`why_attend.${index}.subheading`}
                    value={item.subheading}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 1 }}
                    placeholder="Subheading"
                  />
                  <TextField
                    name={`why_attend.${index}.paragraph`}
                    value={item.paragraph}
                    onChange={handleChange}
                    required
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Paragraph"
                  />
                </Box>
              ))}
            </Grid>

            {/* About Our Workshop Section */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                About Our Workshop
                <IconButton onClick={() => addSubheading("about_workshop")}>
                  <AddIcon />
                </IconButton>
              </Typography>
              {workshopData.about_workshop.map((item, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <TextField
                    name={`about_workshop.${index}.subheading`}
                    value={item.subheading}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 1 }}
                    placeholder="Subheading"
                  />
                  <TextField
                    name={`about_workshop.${index}.paragraph`}
                    value={item.paragraph}
                    onChange={handleChange}
                    required
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Paragraph"
                  />
                </Box>
              ))}
            </Grid>

            {/* Who Should Attend Section */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Who Should Attend?
                <IconButton onClick={() => addSubheading("who_should_attend")}>
                  <AddIcon />
                </IconButton>
              </Typography>
              {workshopData.who_should_attend.map((item, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <TextField
                    name={`who_should_attend.${index}.subheading`}
                    value={item.subheading}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 1 }}
                    placeholder="Subheading"
                  />
                  <TextField
                    name={`who_should_attend.${index}.paragraph`}
                    value={item.paragraph}
                    onChange={handleChange}
                    required
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Paragraph"
                  />
                </Box>
              ))}
            </Grid>

            {/* Prerequisites Section */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Prerequisites
                <IconButton onClick={() => addSubheading("prerequisites")}>
                  <AddIcon />
                </IconButton>
              </Typography>
              {workshopData.prerequisites.map((item, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <TextField
                    name={`prerequisites.${index}.subheading`}
                    value={item.subheading}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 1 }}
                    placeholder="Subheading"
                  />
                  <TextField
                    name={`prerequisites.${index}.paragraph`}
                    value={item.paragraph}
                    onChange={handleChange}
                    required
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Paragraph"
                  />
                </Box>
              ))}
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  "Create Workshop"
                )}
              </Button>
            </Grid>

            {errorMessage && (
              <Grid item xs={12}>
                <Typography color="error" variant="body2">
                  {errorMessage}
                </Typography>
              </Grid>
            )}
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateWorkshops;
