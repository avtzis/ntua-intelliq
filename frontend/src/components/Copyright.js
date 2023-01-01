import * as React from 'react'
import { Typography, Link } from '@mui/material';

export default function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          intelliQ
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }