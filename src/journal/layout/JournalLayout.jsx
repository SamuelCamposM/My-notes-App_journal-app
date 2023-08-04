import { Box, Toolbar } from "@mui/material";
import { Navbar, Sidebar } from "../components";

const drawerWidth = 240;
export const JournalLayout = ({ children }) => {
  return (
    <Box
      display={"flex"}
      className="animate__animated animate__fadeIn animate__faster"
    >
      {/* NAVBAR */}
      <Navbar drawerWidth={drawerWidth} />
      {/* SIDEBAR */}
      <Sidebar drawerWidth={drawerWidth} />
      <Box component={"main"} sx={{ flexGrow: 1, p: 2 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
