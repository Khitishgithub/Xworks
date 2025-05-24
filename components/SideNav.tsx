//components/SideNav.tsx
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { signOut } from "next-auth/react";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { motion, AnimatePresence } from "framer-motion";
import { PiContactlessPayment } from "react-icons/pi";
import { FaBook, FaFileUpload, FaSignOutAlt } from "react-icons/fa";
import { MdInsights } from "react-icons/md";
import { IoNotificationsSharp } from "react-icons/io5";
import { BiSolidCertification } from "react-icons/bi";
import { useMediaQuery } from "@mui/material";
import Courses from "./Courses";
import Insight from "./Insight";
import ResumeUpload from "./ResumeUpload";
import Certifications from "./Certifications";
import Payment from "./Payment";
import Notifications from "./Notifications";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: 'white',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: '100%',
  ...(open && {
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
  }),
}));

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    backgroundColor: '#f8f9fa',
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));
interface MenuItem {
  id: string;
  icon: React.ElementType;
  text: string;
}

interface BottomNavProps {
  menuItems: MenuItem[];
  activeItem: string;
  onItemClick: (id: string) => void;
}



const BottomNav: React.FC<BottomNavProps> = ({ menuItems, activeItem, onItemClick }) => (
  <motion.div 
    initial={{ y: 100 }}
    animate={{ y: 0 }}
    className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden"
  >
    <div className="grid grid-cols-6 h-16">
      {menuItems.slice(0, 5).map((item) => (
        <motion.button
          key={item.id}
          onClick={() => onItemClick(item.id)}
          whileTap={{ scale: 0.95 }}
          className={`flex flex-col items-center justify-center whitespace-nowrap overflow-hidden ${
            activeItem === item.id ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <item.icon className="text-xl mb-1" />
          <span className="text-xs max-w-[60px] text-center truncate">{item.text}</span>
        </motion.button>
      ))}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onItemClick('more')}
        className="flex flex-col items-center justify-center text-gray-600"
      >
        <MenuIcon className="text-xl mb-1" />
        <span className="text-xs">More</span>
      </motion.button>
    </div>
  </motion.div>
);

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  activeItem: string;
  onItemClick: (id: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, menuItems, activeItem, onItemClick }) => (
  <Drawer
    anchor="right"
    open={open}
    onClose={onClose}
    variant="temporary"
    className="md:hidden"
  >
    <motion.div 
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      exit={{ x: 300 }}
      className="w-full max-w-xs bg-white h-full"
    >
      <div className="p-4 flex justify-between items-center border-b">
        <Typography variant="h6">Menu</Typography>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            className="px-2"
            onClick={() => {
              onItemClick(item.id);
              onClose();
            }}
          >
            <ListItemButton
              className={`rounded-lg ${
                activeItem === item.id ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <ListItemIcon>
                <item.icon className={activeItem === item.id ? 'text-blue-600' : ''} />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider className="my-2" />
        <ListItem disablePadding className="px-2">
          <ListItemButton
            onClick={() => signOut()}
            className="rounded-lg text-red-500"
          >
            <ListItemIcon>
              <FaSignOutAlt className="text-red-500" />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItemButton>
        </ListItem>
      </List>
    </motion.div>
  </Drawer>
);

export default function SideNav() {
  const [open, setOpen] = useState(true);
  const [menuData, setMenuData] = useState("Courses");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');

  const menuItems = [
    { id: "Courses", icon: FaBook, text: "Courses" },
    { id: "Insight", icon: MdInsights, text: "Insight" },
    { id: "Resume Upload", icon: FaFileUpload, text: "Resume Upload" },
    { id: "Certifications", icon: BiSolidCertification, text: "Certifications" },
    { id: "Payment", icon: PiContactlessPayment, text: "Payment" },
    { id: "Notifications", icon: IoNotificationsSharp, text: "Notifications" },
  ];

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  return (
    <Box className="flex min-h-screen w-full overflow-x-hidden">
    <CssBaseline />
    
    <AppBar position="fixed" open={open && !isMobile}>
      <Toolbar className="flex justify-between items-center px-4">
        <div className="flex items-center">
          
          <div className="relative w-32 h-12">
            <Image
              src="/logoxworks.png"
              alt="Company Logo"
              layout="fill"
              objectFit="contain"
              className="ml-4"
            />
          </div>
        </div>
      </Toolbar>
    </AppBar>

      {/* Desktop Sidebar */}
      {!isMobile && (
        <Drawer variant="permanent" open={open}>
          <div className="flex flex-col h-full">
            <List className="flex-1 px-3 py-4">
              <AnimatePresence>
                {menuItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ListItem
                      disablePadding
                      className="mb-2"
                      onClick={() => setMenuData(item.id)}
                    >
                      <ListItemButton
                        className={`rounded-lg transition-all duration-300 ${
                          menuData === item.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <ListItemIcon>
                          <item.icon className={menuData === item.id ? 'text-blue-600' : ''} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.text}
                          sx={{ display: open ? 'block' : 'none' }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </List>

            <Divider />
            
            <motion.div
              className="p-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ListItemButton
                onClick={() => signOut()}
                className="rounded-lg bg-red-50 hover:bg-red-100 transition-all duration-300"
              >
                <ListItemIcon>
                  <FaSignOutAlt className="text-red-500" />
                </ListItemIcon>
                <ListItemText 
                  primary="Sign Out" 
                  className="text-red-500"
                  sx={{ display: open ? 'block' : 'none' }}
                />
              </ListItemButton>
            </motion.div>
          </div>
        </Drawer>
      )}

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <>
          <BottomNav 
            menuItems={menuItems}
            activeItem={menuData}
            onItemClick={(id) => {
              if (id === 'more') {
                setMobileMenuOpen(true);
              } else {
                setMenuData(id);
              }
            }}
          />
          <MobileMenu 
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            menuItems={menuItems}
            activeItem={menuData}
            onItemClick={setMenuData}
          />
        </>
      )}

      {/* Main Content */}
      <Box 
        component="main" 
        className="flex-1 p-4 md:p-6 mt-16 pb-20 md:pb-6 w-full overflow-x-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {menuData === "Courses" && <Courses />}
          {menuData === "Insight" && <Insight />}
          {menuData === "Resume Upload" && <ResumeUpload />}
          {menuData === "Certifications" && <Certifications />}
          {menuData === "Payment" && <Payment />}
          {menuData === "Notifications" && <Notifications />}
        </motion.div>
      </Box>
    </Box>
  );
}