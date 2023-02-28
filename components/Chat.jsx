import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Card from '@mui/material/Card';
import ReactDOM from "react-dom";
import API from './ChatbotApi';
import styles from "../styles/main.module.css";
import BotMessage from './BotMessage';
import UserMessage from './UserMessage';
import Messages from './Messages';
import Input from './Input';
import { useState,useEffect } from 'react';
import Header from './Header';
import axios from 'axios';
import Chip from '@material-ui/core/Chip';
import {useRouter} from 'next/router';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

const Chat = () => {
  const classes = useStyles();
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  const [replyMessage, setReplyMessage] = useState(null)
  const [banglishwords, setBanglishWords] = useState(null)
  const [percentage, setPercentage]=useState(null)
  const arr=[]
  function getData(text) {
    axios({
      method: "GET",
      url:`http://localhost:5000/api/banglish/${text}`,
    })
    .then((response) => {
      const res =response.data
      console.log(response.data.words);
      setBanglishWords(res.words)
      setPercentage(res.ratio)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    async function searchList(text) {
      const { pid } = router.query
      let data ={
        email:pid,
        text:text
      }
      try {
        const url = "/api/upload";
        const { data: res } = await axios.post(url, data);
        console.log(res.data);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
        }
        console.log(error);
      }
     }

  useEffect(() => {
    async function loadWelcomeMessage() {
      setMessages([
        <BotMessage
          key="0"
          fetchMessage={async () => await API.GetChatbotResponse("hi")}
        />
      ]);
    }
    loadWelcomeMessage();
  }, []);

  const send = async text => {
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => await API.GetChatbotResponse(text)}
      />
    );
    setMessages(newMessages);
    getData(text);
    searchList(text);
  };

  

  return (
    <div>
      <div>
        {/* <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid>
        </Grid> */}
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                {/* <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="John Wick"></ListItemText>
                    </ListItem>
                </List> */}
                <Divider />
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search from history" variant="outlined" fullWidth />
                </Grid>
                <Divider />
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                        <ListItemText secondary="online" align="right"></ListItemText>
                    </ListItem>
                    <ListItem button key="Alice">
                        <ListItemIcon>
                            <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Alice">Alice</ListItemText>
                    </ListItem>
                    <ListItem button key="CindyBaker">
                        <ListItemIcon>
                            <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={9}>
            <div className={styles.chatbot}>
      <Header />
      <Messages messages={messages} />
      <Input onSend={send} />
    </div>
            </Grid>
        </Grid>
      </div>
      <Grid container spacing={2} sx={{ alignItems: "center", mx:"auto"}}>
      <Grid item sx={2}> 
      {percentage?( <Chip label={percentage+"% Banglish"}/>):( <div></div>)
        }
        </Grid> 
        <Grid item sx={10}>
        {banglishwords?(
        //   <Card sx={{ minHeight: 50 }}>
        //   <Typography variant="h5" component="div">
        //     Banglish words:{banglishwords}
        //   </Typography>
        // </Card>
        <Chip label={"Banglish words: "+banglishwords} color="primary" />
        ):
      (
          <div></div>
      )
        }
        {/* <Chip label={getUser()} color="primary"/> */}
      </Grid>  
      {/* <Card>
          <Typography variant="h5" component="div">
            {percentage}% Banglish
          </Typography>
        </Card> */}   
        </Grid>
      </div>  
  );
}

export default Chat;