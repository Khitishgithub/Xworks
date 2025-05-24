import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

export default function Notifications() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderContent = () => {
    switch (value) {
      case 0:
        return (
          <Box p={3}>
           
            <Typography variant="body1">
              Content related to Reminders goes here.
            </Typography>
          </Box>
        );
      case 1:
        return (
          <Box p={3}>
            
            <Typography variant="body1">
              Content related to Application Alerts goes here.
            </Typography>
          </Box>
        );
      case 2:
        return (
          <Box p={3}>
            
            <Typography variant="body1">
              Content related to Achievement Alerts goes here.
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <>
     

      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Reminders" />
          <Tab label="Application Alerts" />
          <Tab label="Achievement Alerts" />
        </Tabs>
      </Box>

      <Box>{renderContent()}</Box>
    </>
  );
}
