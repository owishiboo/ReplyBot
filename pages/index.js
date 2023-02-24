import { Route, Routes, Navigate, Router } from "react-router-dom";
import Main from "../components/Main";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LandingPage from "../components/Landing-Page"
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Button } from "@mui/material";
import Image from 'next/image'

export default function App() {
  let user="";
  const router = useRouter();
  if (typeof window !== 'undefined') {
    user = localStorage.getItem("token");
    if(!user){
      router.push("/account");
    }
  }

 const handleClick = () =>{
  router.push('/login');
 }
 
	return (
		<div>
      <div>
     <LandingPage/>
     </div>
     <Box id="hero" sx={{ backgroundColor: 'background.paper', position: 'relative', pt: 4, pb: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={0} sx={{ flexDirection: { xs: 'column', md: 'unset' } }}>
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography
                  component="h2"
                  sx={{
                    position: 'relative',
                    fontSize: { xs: 40, md: 50 },
                    letterSpacing: 1.5,
                    fontWeight: 'bold',
                    lineHeight: 1.6,
                  }}
                >
                  <Typography
                    component="mark"
                    sx={{
                      position: 'relative',
                      color: '#607D8B',
                      fontSize: 'inherit',
                      fontWeight: 'inherit',
                      backgroundColor: 'unset',
                    }}
                  >
                    ReplyBot{' '}
                  </Typography>
                  is{' '}
                  <Typography
                    component="span"
                    sx={{
                      fontSize: 'inherit',
                      fontWeight: 'inherit',
                      position: 'relative',
                      '& svg': {
                        position: 'absolute',
                        top: -16,
                        right: -21,
                        width: { xs: 22, md: 30 },
                        height: 'auto',
                      },
                    }}
                  >
                    always there
                    <svg version="1.1" viewBox="0 0 3183 3072">
                      <g id="Layer_x0020_1">
                        <path
                          fill="#607D8B"
                          d="M2600 224c0,0 0,0 0,0 236,198 259,562 52,809 -254,303 -1849,2089 -2221,1776 -301,-190 917,-1964 1363,-2496 207,-247 570,-287 806,-89z"
                        />
                        <path
                          fill="#607D8B"
                          d="M3166 2190c0,0 0,0 0,0 64,210 -58,443 -270,516 -260,90 -1848,585 -1948,252 -104,-230 1262,-860 1718,-1018 212,-73 437,39 500,250z"
                        />
                        <path
                          fill="#607D8B"
                          d="M566 3c0,0 0,0 0,0 -219,-26 -427,134 -462,356 -44,271 -255,1921 90,1962 245,62 628,-1392 704,-1869 36,-221 -114,-424 -332,-449z"
                        />
                      </g>
                    </svg>
                  </Typography>{' '}
                  <br />
                  for your queries
                </Typography>
              </Box>
              <Box sx={{ mb: 4, width: { xs: '100%', md: '70%' } }}>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  {
                    "ReplyBot: chatbot for replying to your queries about your telephone operator"
                  }
                </Typography>
              </Box>
              <Box sx={{ '& button': { mr: 2 } }}>
              
                  <Button onClick={handleClick} variant="contained" sx={{bgcolor:"#607D8B", Radius:"20%", "&.MuiButtonBase-root:hover": {
              bgcolor: "#607D8B"
            }}} size="large">
                    Get Started
                  </Button>
             
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={5} sx={{ position: 'relative' ,marginTop:'100px' }}>
            <Box sx={{ lineHeight: 0 }}>
              <Image src="/images/bot-o.png" width={500} height={500} alt="Hero img" />
            </Box>
          </Grid>
        </Grid>
        </Container>
        </Box>
    </div>
		
	);
}