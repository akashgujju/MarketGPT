import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { MarketGPT } from "./Components/MarketGPT";
import { SocialPage } from "./Components/SocialPage";
import { EmailPage } from "./Components/EmailPage";
import { Box } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const navItems = [{
  name: 'MarketGPT',
  url: "/"
}, {
  name: 'Social Media Post',
  url: '/social'
}, {
  name: 'Email Page',
  url: '/email'
}];

function App() {
  return (
    <Router>
      <div>
        <AppBar component="nav">
          <Toolbar>

            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Market Research 
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button key={item.name} sx={{ color: '#fff' }}>
                  <Link to={item.url}>
                    <Button variant="outlined" style={{color: "antiquewhite"}}>
                    {item.name}
                    </Button>
                  </Link>
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={
            <Box  >
              <MarketGPT />
            </Box>
          } />
          <Route path="/social" element={<SocialPage />} />
          <Route path="/email" element={<EmailPage />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;

