import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Divider,
  Typography,
  List,
  Paper,
  Chip,
} from '@material-ui/core';
import API from './ChatbotApi';
import styles from '../styles/main.module.css';
import BotMessage from './BotMessage';
import UserMessage from './UserMessage';
import Messages from './Messages';
import Input from './Input';
import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import axios from 'axios';
import { useRouter } from 'next/router';
import ContentPasteGoIcon from '@mui/icons-material/Bolt';
import InputBase from '@mui/material/InputBase';
import { ScrollArea } from '@mantine/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
});

const Chat = () => {
  const classes = useStyles();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [inputBar, setInputBar] = useState([]);
  const [replyMessage, setReplyMessage] = useState(null);
  const [banglishwords, setBanglishWords] = useState([]);
  const [banglawords, setBanglaWords] = useState([]);
  const [banglapercentage, setBanglaPercentate] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const arr = [];
  const [id, setId] = useState(null);

  const [values, setValues] = React.useState({
    fields: '',
  });

  async function getSearchList() {
    const { pid } = router.query;
    const list = {
      email: pid,
    };
    await axios
      .post('/api/getSearch', list)
      .then((response) => {
        console.log(response.data.queries);
        setSearchItems(response.data.queries);
        setInputBar(response.data.queries);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    getSearchTerm();
  };

  const searchKeyword = (searchTerm) => {
    var arr = searchItems;
    if (searchTerm !== '' && searchTerm.length > 1) {
      const newSearchList = arr.filter((searchItem) => {
        return Object.values(searchItem)
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setInputBar(newSearchList);
    } else {
      setInputBar(searchItems);
    }
  };
  const getSearchTerm = () => {
    searchKeyword(values.fields);
  };
  function getData(text) {
    axios({
      method: 'GET',
      url: `http://localhost:5000/api/banglish/${text}`,
    })
      .then((response) => {
        const res = response.data;
        console.log(response.data.words);
        setBanglishWords(res.words);
        setPercentage(res.ratio1);
        setBanglaWords(res.bangla);
        setBanglaPercentate(res.ratio2);
        console.log({ rat2: res.ratio2 });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  useEffect(() => {
    getSearchList();
  }, [messages]);
  // async function getSearchList(){
  //   const { pid } = router.query
  //   const list = {
  //     email:pid
  //   }
  //   await axios.post("/api/getSearch",list).then((response)=>{
  //     console.log(response.data.queries);
  //     setSearchItems(response.data.queries);
  //     setInputBar(response.data.queries);
  //    }).catch((error)=>{
  //     console.log(error);
  //    })
  // }

  async function searchList(text) {
    const { pid } = router.query;
    let data = {
      email: pid,
      text: text,
    };
    try {
      const url = '/api/upload';
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
          fetchMessage={async () => await API.GetChatbotResponse('hi')}
        />,
      ]);
    }
    loadWelcomeMessage();
    setId(router.query);
    // getSearchList();
  }, []);

  const send = async (text) => {
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
    getSearchList();
  };

  return (
    <div>
      <div>
        <Grid container component={Paper} className={classes.chatSection}>
          <Grid item xs={3} className={classes.borderRight500}>
            <Divider />
            <Grid item xs={12} style={{ padding: '10px' }}>
              {/* <TextField id="outlined-basic-email" label="Search from history" variant="outlined" fullWidth ref={inputBar} onChange={getSearchTerm}/> */}
              <InputBase
                type="text"
                placeholder="search"
                value={values.fields}
                onChange={handleChange('fields')}
              />
            </Grid>
            <Divider />
            <ScrollArea h="70vh">
              <List>
                {inputBar ? (
                  inputBar.map((item) => (
                    <Box sx={{ marginBottom: '6px', marginLeft: '20px' }}>
                      <Grid
                        container
                        marginBottom={30}
                        spacing={2}
                        sx={{
                          alignItems: 'center',
                          mx: 'auto',
                          marginBottom: '30px',
                        }}
                      >
                        {/* <Grid><ContentPasteGoIcon sx={{ color:'#607D8B'}}/></Grid> */}
                        <Grid>
                          <Typography
                            onClick={() => {
                              navigator.clipboard.writeText(item.body);
                            }}
                          >
                            {item.body}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  ))
                ) : (
                  <div></div>
                )}
              </List>
            </ScrollArea>
          </Grid>
          <Grid item xs={9} sx={{ padding: '5px' }}>
            <div className={styles.chatbot}>
              <Header />
              <Messages messages={messages} />
              <Input onSend={send} />
            </div>
          </Grid>
        </Grid>
      </div>
      <Box sx={{ alignContent: 'center', alignItems: 'center', mx: 'auto' }}>
        <Grid container spacing={2} sx={{ alignItems: 'center', mx: 'auto' }}>
          <Grid item sx={2}>
            {percentage ? (
              <Chip label={percentage + '% Banglish'} />
            ) : (
              <div></div>
            )}
          </Grid>
          <Grid item sx={2}>
            {banglapercentage ? (
              <Chip label={banglapercentage + '% Bangla'} />
            ) : (
              <div></div>
            )}
          </Grid>
          <Grid item sx={2}>
            {percentage > 0 ? (
              <Chip
                label={'Banglish words: ' + banglishwords}
                color="primary"
              />
            ) : (
              <div></div>
            )}
          </Grid>
          <Grid item sx={2}>
            {banglapercentage > 0 > 0 ? (
              <Chip label={'Bangla words: ' + banglawords} color="primary" />
            ) : (
              <div></div>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Chat;
