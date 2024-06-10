import Stack from '@mui/material/Stack';
import { pink } from '@mui/material/colors';
import SvgIcon from '@mui/material/SvgIcon';

import './App.css';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
    </SvgIcon>
  );
}

function App() {
  return (
    <div>
      <Stack direction='row' spacing={3} alignItems='flex-end'>
        <HomeIcon fontSize='small' />
        <HomeIcon />
        <HomeIcon fontSize='large' color='primary' />
        <HomeIcon sx={{ fontSize: 40, color: pink[500] }} />
      </Stack>
    </div>
  );
}

export default App;
