import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import Image from 'mui-image'



const Logo = ({ onClick, variant }) => {
  return (
    <Box onClick={onClick}>
      <Stack direction="row" spacing={1}>
     
      <Box
                sx={{
                  boxShadow: 1,
                  borderRadius: '50%',
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  '& img': { width: '32px !important', height: 'auto' },
                }}
              >
                <img src="/images/bot.png" alt="Certificate icon" width={40} height={40} />
              </Box>
               
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 700, '& span': { color: variant === 'primary' ? 'black' : 'unset' } }}
      >
        Reply<span>Bot</span>
      </Typography>
      </Stack>
    </Box> 
  )
}

Logo.defaultProps = {
  variant: 'primary',
}

export default Logo