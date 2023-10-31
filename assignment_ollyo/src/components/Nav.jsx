import { Box, IconButton, Typography } from '@mui/material'
import {DarkModeOutlined, LightModeOutlined} from '@mui/icons-material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMode } from '../redux/globalSlice'

const Nav = () => {
    const mode = useSelector(state => state.global.mode);
    const dispatch = useDispatch();
  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }}>
        <Typography variant='h4'>Ollyo Assignment</Typography>
        <IconButton onClick={() => dispatch(setMode())}>
            {mode == 'light' ? <LightModeOutlined fontSize='large' /> : <DarkModeOutlined fontSize='large' />}
        </IconButton>
    </Box>
  )
}

export default Nav