import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Container, Divider, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export function SocialPage() {
  const [plugin, setPlugin] = useState('');
  const [loading, setLoading] = useState(false);

  const [excecutive, setExcecutive] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setExcecutive(null);

    axios.post('http://localhost:8000/tweets/', { plugin })
      .then((response) => {
        console.log('1st then: ', response.data);
        setExcecutive(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setPlugin('An error occurred while creating the item.');
        console.error(error);
      });
  };
  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "center" }}>

        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <h1>Automated Tweet Generator</h1>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1>Automated Tweet Generator</h1>
            <TextField
              id="outlined-basic"
              value={plugin}
              placeholder="Enter Company Name"
              label="Company Name"
              variant="outlined"
              onChange={(e) => setPlugin(e.target.value)}
              style={{ width: "100%" }}
            />

            <div style={{ height: "100%" }}>
              {
                loading ?
                  <CircularProgress
                    color="secondary"
                    style={{ margin: "20px" }}
                  /> :
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    style={{ margin: "20px" }}
                  >
                    Submit
                  </Button>
              }
            </div>
          </div>
          
          <Box sx={{ minWidth: 275 }}>
            <ResponseComponent response={excecutive} />
          </Box>
        </div>
      </div>
    </Container>
  );
}

function ResponseComponent({ response }) {
  console.log('2nd then: ', response);
  return (
    <div>
      {
        response !== null ?
          <div>
            <Divider />
            <Card variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                    Tweet
                  </Typography>
                  <Typography variant="h6" component="div">
                    {response.twitter_content}
                  </Typography>
                </CardContent>
              </React.Fragment>
            </Card>
          </div>
          :
          <></>
      }
    </div>
  );
}
