import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from 'axios';
import { CircularProgress, Container, Divider } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function MarketGPT() {
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);

  const [competitor, setCompetitor] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setCompetitor(null);

    axios.post('http://localhost:8000/market/', { company })
      .then((response) => {
        console.log('1st then: ', response.data);
        setCompetitor(response.data);

        setLoading(false);
      })
      .catch((error) => {
        setCompany('An error occurred while creating the item.');
        console.error(error);
      });
  };
  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "center" }}>

        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <h1>Market Competitor Analysis</h1>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1>Market Competitor Analysis</h1>
            <TextField
              id="outlined-basic"
              value={company}
              placeholder="Enter Company Name"
              label="Company Name"
              variant="outlined"
              onChange={(e) => setCompany(e.target.value)}
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
          
          <ResponseComponent response={competitor} />
          {/* <div >
            {Object.keys(competitor).map((key, index) => (
              <div key={key}>
                <h3>{key}</h3> : <div> {competitor[key]} </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </Container>
  );
}

function ResponseComponent({ response }) {

  return (
    <div>
      
      {
        response !== null ?
          <div>
            <Divider />
            <h1> Market: {response.market}</h1>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Competitor</b></TableCell>
                    <TableCell align="center"><b>Market Cap</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {response.competitors.map((row) => (
                    <TableRow
                      key={row.company}

                    >
                      <TableCell component="th" scope="row">
                        {row.company}
                      </TableCell>
                      <TableCell align="center">{row.market_cap}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          :
          <></>
      }
    </div>
  );
}