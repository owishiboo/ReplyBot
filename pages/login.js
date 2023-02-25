import React from 'react'
import LogIn from '../components/Login'
import { useRouter } from "next/router";

function Login() {
  // let user="";
  // const router = useRouter();
  // if (typeof window !== 'undefined') {
  //   user = localStorage.getItem("token");
  //   if(!user){
  //     router.push("/account");
  //   }
  // }
  return (
    <div><LogIn/></div>
  )
}

export default Login