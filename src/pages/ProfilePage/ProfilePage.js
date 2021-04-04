import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
import { authService } from "../../firebase";
import "./ProfilePage.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ProfileTabs from "./ProfileTabs";

const ProfilePage = () =>
  // user,
  // user: {
  //   scrap: { enrollment, living, major, scholarship, support },
  // },
  // enrollmentData,
  // majorData,
  // livingData,
  // scholarshipData,
  // supportData,
  {
    let history = useHistory();

    const [loggingUser, setLoggingUser] = useState(null);
    const [showSubmitForm, setShowSubmitForm] = useState(false);
    // const [enrollmentList, setEnrollmentList] = useState([]);
    // const [livingList, setLivingList] = useState([]);
    // const [majorList, setMajorList] = useState([]);
    // const [scholarshipList, setScholarshipList] = useState([]);
    // const [supportList, setSupportList] = useState([]);

    const loadCurrentUser = async () => {
      await authService.onAuthStateChanged((user) => {
        setLoggingUser({ ...user });
      });
    };

    // const setScrapListsData = () => {
    //   enrollmentData.forEach((target) => {
    //     enrollment?.forEach((id) => {
    //       if (target.id === id) {
    //         setEnrollmentList((prev) => {
    //           let list = [];
    //           list.push(target);
    //           return [...prev, ...list];
    //         });
    //       }
    //     });
    //   });
    //   majorData.forEach((target) => {
    //     major?.forEach((id) => {
    //       if (target.id === id) {
    //         setMajorList((prev) => {
    //           let list = [];
    //           list.push(target);
    //           return [...prev, ...list];
    //         });
    //       }
    //     });
    //   });
    //   livingData.forEach((target) => {
    //     living?.forEach((id) => {
    //       if (target.id === id) {
    //         setLivingList((prev) => {
    //           let list = [];
    //           list.push(target);
    //           return [...prev, ...list];
    //         });
    //       }
    //     });
    //   });
    //   scholarshipData.forEach((target) => {
    //     scholarship?.forEach((id) => {
    //       if (target.id === id) {
    //         setScholarshipList((prev) => {
    //           let list = [];
    //           list.push(target);
    //           return [...prev, ...list];
    //         });
    //       }
    //     });
    //   });
    //   supportData.forEach((target) => {
    //     support?.forEach((id) => {
    //       if (target.id === id) {
    //         setSupportList((prev) => {
    //           let list = [];
    //           list.push(target);
    //           return [...prev, ...list];
    //         });
    //       }
    //     });
    //   });
    // };

    useEffect(() => {
      loadCurrentUser();
    }, []);

    // useEffect(() => {
    //   setScrapListsData();
    // }, [enrollment, living, major, scholarship, support]);

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
          <div className="profilepage__submit">
            <p>
              본인만이 알고있는 팁이 있다면
              <br /> 공유해주시길 부탁드립니다
            </p>
            <button
              onClick={() => {
                setShowSubmitForm(!showSubmitForm);
              }}
            >
              작성하기
            </button>
            <br />

            {showSubmitForm && (
              <form className="profilepage__form">
                <p>#질문 제목</p>
                <textarea placeholder="예시) 전북대 도로명 주소가 어떻게 되나요?" />
                <p>#답변 내용</p>
                <textarea placeholder="예시) 전라북도 전주시 덕진구 금암1동 백제대로 567 " />

                <p>#답변 주신분의 닉네임</p>
                <span>
                  작성해주시지 않을 경우
                  <br />
                  Google 닉네임으로 자동 입력되어 업로드 됩니다
                </span>
                <textarea placeholder={loggingUser?.displayName} />
                {loggingUser.eafavs}
                <button type="submit">제출하기</button>
              </form>
            )}
          </div>
          <footer className="profilepage__footer">
            <p>
              이 사이트에서 다루는 내용은
              <br />
              모두 비공식적임을 알려드립니다.
            </p>
            <p>developed by cold_expression, 0Bong</p>
          </footer>
        </section>
      </div>
    );
  };

export default ProfilePage;
