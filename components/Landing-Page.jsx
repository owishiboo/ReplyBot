import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Logo from './Logo';

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background:'#607D8B'}}>
        <Logo/>
      </AppBar>
    </Box>
  );
}