import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
import { authService, firestoreService } from "../../firebase";
import "./ProfilePage.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ProfilePage = () => {
  let history = useHistory();

  const [submitState, setSubmitState] = useState(false);
  const [loggingUser, setLoggingUser] = useState(authService.currentUser);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitForm, setSubmitForm] = useState({
    question: "",
    answer: "",
    username: loggingUser?.displayName,
  });

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    await authService.onAuthStateChanged((user) => {
      setLoggingUser({ ...user });
    });
  };

  const handleChangeForm = (e) => {
    const submitValue = {
      ...submitForm,
      [e.target.name]: e.target.value,
    };

    setSubmitForm(submitValue);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (submitForm.username === "") {
      const form = {
        ...submitForm,
        username: loggingUser?.displayName,
      };
      setSubmitForm(form);
    }

    firestoreService.collection("submit").add({ ...submitForm });
    setSubmitForm({
      question: "",
      answer: "",
      username: loggingUser?.displayName,
    });
  };

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
            <br />
            공유해주시길 부탁드립니다
            <br />
            🙏
            <br />
            작성해주신 내용은 확인 후 추후에
            <br />
            작성해주신 분의 닉네임과 함께
            <br />
            전북대 학생 모두를 위한
            <br />
            정보로 활용됩니다
            <br />
            💪
          </p>
          <button
            onClick={() => {
              setShowSubmitForm(!showSubmitForm);
            }}
          >
            {showSubmitForm ? "취소하기" : "작성하기"}
          </button>
          <br />

          {showSubmitForm && (
            <form className="profilepage__form">
              <div
                className={`profilepage__modal ${showModal ? "open" : "close"}`}
              >
                {submitState ? (
                  <div>
                    <h3>작성해주셔서 감사합니다</h3>
                  </div>
                ) : (
                  <div>
                    <h3>작성하신 내용이 제출 됩니다</h3>
                    <div>
                      <button
                        className="profilepage__modal__button"
                        type="submit"
                        onClick={(e) => {
                          setSubmitState(!submitState);
                          setTimeout(() => {
                            setShowModal(false);
                          }, 1000);
                          setTimeout(() => {
                            setSubmitState(false);
                          }, 2000);
                          handleSubmitForm(e);
                        }}
                      >
                        예
                      </button>
                      <button
                        className="profilepage__modal__button"
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                        }}
                      >
                        아니요
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <p>#질문 제목</p>
              <textarea
                placeholder="예시) 전북대 도로명 주소가 어떻게 되나요?"
                onChange={handleChangeForm}
                name="question"
                value={submitForm.question}
              />
              <p>#답변 내용</p>
              <textarea
                placeholder="예시) 전라북도 전주시 덕진구 금암1동 백제대로 567 "
                onChange={handleChangeForm}
                name="answer"
                value={submitForm.answer}
              />
              <p>#답변 해주신 분의 닉네임</p>
              <span>
                닉네임을 따로 작성해주시지 않을 경우
                <br />
                Google 닉네임이 자동으로 업로드됩니다
              </span>
              <textarea
                placeholder={loggingUser?.displayName}
                onChange={handleChangeForm}
                name="username"
                value={submitForm.username}
              />
              <button
                type="button"
                onClick={() => {
                  if (submitForm.question === "") {
                    alert("질문 제목이 입력되지 않았습니다");
                  } else if (submitForm.answer === "") {
                    alert("답변 내용이 입력되지 않았습니다");
                  } else setShowModal(true);
                }}
              >
                제출하기 👍
              </button>
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
