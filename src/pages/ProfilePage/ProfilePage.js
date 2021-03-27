import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
import { authService } from "../../firebase";
import "./ProfilePage.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ProfileTabs from "./ProfileTabs";

const ProfilePage = ({
  user,
  user: {
    scrap: { enrollment, living, major, scholarship, support },
  },
  enrollmentData,
  majorData,
  livingData,
  scholarshipData,
  supportData,
}) => {
  let history = useHistory();

  const [loggingUser, setLoggingUser] = useState(null);

  const [enrollmentList, setEnrollmentList] = useState([]);
  const [livingList, setLivingList] = useState([]);
  const [majorList, setMajorList] = useState([]);
  const [scholarshipList, setScholarshipList] = useState([]);
  const [supportList, setSupportList] = useState([]);

  const loadCurrentUser = async () => {
    await authService.onAuthStateChanged((user) => {
      setLoggingUser({ ...user });
    });
  };

  const setScrapListsData = () => {
    enrollmentData.forEach((target) => {
      enrollment?.forEach((id) => {
        if (target.id === id) {
          setEnrollmentList((prev) => {
            return [...prev, target];
          });
        }
      });
    });
    majorData.forEach((target) => {
      major?.forEach((id) => {
        if (target.id === id) {
          setMajorList((prev) => {
            return [...prev, target];
          });
        }
      });
    });
    livingData.forEach((target) => {
      living?.forEach((id) => {
        if (target.id === id) {
          setLivingList((prev) => {
            return [...prev, target];
          });
        }
      });
    });
    scholarshipData.forEach((target) => {
      scholarship?.forEach((id) => {
        if (target.id === id) {
          setScholarshipList((prev) => {
            return [...prev, target];
          });
        }
      });
    });
    supportData.forEach((target) => {
      support?.forEach((id) => {
        if (target.id === id) {
          setSupportList((prev) => {
            return [...prev, target];
          });
        }
      });
    });
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  useEffect(() => {
    setScrapListsData();
  }, [enrollment, living, major, scholarship, support]);

  const handleLogOut = () => {
    authService.signOut();
    history.push("/login");
  };

  return (
    <div className="profilepage">
      <header className="profilepage__header">
        <Link to="/home">
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </Link>
      </header>
      <section className="profilepage__main">
        <div className="profilepage__userProfile">
          <div className="profilepage__userInfo">
            <img
              className="profilepage__userPic"
              src={loggingUser?.photoURL}
              alt="user"
            />
            <h4 className="profilepage__userName">
              {loggingUser?.displayName}
            </h4>
          </div>
          <div className="profilepage__btnGroup">
            <button onClick={handleLogOut}>Log out</button>
          </div>
        </div>
        <ProfileTabs
          enrollmentList={enrollmentList}
          majorList={majorList}
          scholarshipList={scholarshipList}
          livingList={livingList}
          supportList={supportList}
        />
      </section>
    </div>
  );
};

export default ProfilePage;
