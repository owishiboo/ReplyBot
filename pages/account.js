import { Route, Routes, Navigate } from "react-router-dom";
import Main from "../components/Main";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Chat from "../components/Chat";
import { Box } from "@mui/system";

export default function App() {
  let user="";
  const router = useRouter();
  if (typeof window !== 'undefined') {
    user = localStorage.getItem("token");
    if(!user){
      router.push("/login");
    }
  }
 
	return (
	<div>
     <Main/>
     <Box sx={{ marginTop:'30px'}}>
     <Chat/>
     </Box>
    </div>
	);
}