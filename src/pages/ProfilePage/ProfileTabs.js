import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ProfilePost from "./ProfilePost";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "0 20px",
    // backgroundColor: theme.palette.background.paper,
  },
  appbar: {
    borderRadius: "10px",
    background: "rgba(255, 59, 59, 0.66)",
  },
}));

export default function ProfileTabs({
  enrollmentList,
  majorList,
  scholarshipList,
  livingList,
  supportList,
}) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          centered
        >
          <Tab label="스크랩 목록" {...a11yProps(0)} />
          <Tab label="건의 목록" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ul className="profilepage__postlist">
          {enrollmentList?.map((post) => (
            <li>
              <ProfilePost post={post} />
            </li>
          ))}
          {majorList?.map((post) => (
            <li>
              <ProfilePost post={post} />
            </li>
          ))}
          {scholarshipList?.map((post) => (
            <li>
              <ProfilePost post={post} />
            </li>
          ))}
          {livingList?.map((post) => (
            <li>
              <ProfilePost post={post} />
            </li>
          ))}
          {supportList?.map((post) => (
            <li>
              <ProfilePost post={post} />
            </li>
          ))}
        </ul>
      </TabPanel>
      <TabPanel value={value} index={1}>
        여기는 아직...!
      </TabPanel>
    </div>
  );
}
