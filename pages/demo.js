// import styles from '../styles/Home.module.css'
// import { useEffect, useState } from 'react'

// export default function Home() {
//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetch('/api')
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data.message)
//                 setMessage(data.message);
//                 setLoading(false);
//             })
//     }, [])

//     return (
//         <div className={styles.container}>
//             <p> {!loading ? message : "Loading.."}</p>
//         </div>
//     )
// }

import { useState } from 'react'
import axios from "axios";
// import logo from './logo.svg';
// import './App.css';

function App() {

   // new line start
  const [profileData, setProfileData] = useState(null)

  function getData() {
    axios({
      method: "GET",
      url:"http://localhost:5000/api/profile",
    })
    .then((response) => {
      const res =response.data
      console.log(response.data);
      setProfileData(({
        profile_name: res.name,
        about_me: res.about}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
    //end of new line 

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {/* new line start*/}
        <p>To get your profile details: </p><button onClick={getData}>Click me</button>
        {profileData && <div>
              <p>Profile name: {profileData.profile_name}</p>
              <p>About me: {profileData.about_me}</p>
            </div>
        }
         {/* end of new line */}
      </header>
    </div>
  );
}

export default App;