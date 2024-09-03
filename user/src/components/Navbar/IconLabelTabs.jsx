import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HomeIcon from '@mui/icons-material/Home';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function IconLabelTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-white z-50">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
        className="w-full"
      >
        <Tab icon={<HomeIcon />} label="Home" />
        <Tab icon={<PermIdentityIcon />} label="Account" />
        <Tab icon={<SearchIcon />} label="Search" />
        <Tab icon={<FavoriteBorderIcon />} label="Favorites" />
      </Tabs>
    </div>
  );
}
