import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { authService } from "./firebase";
import Initializing from "./pages/LoginPage/Initializing";
import { firestoreService } from "./firebase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);

  //all data here
  const [user, setUser] = useState({ uid: "no user", scrap: ["nothing"] });
  const [enrollment, setEnrollment] = useState(["nothing here"]);
  const [major, setMajor] = useState(["nothing here"]);
  const [living, setLiving] = useState(["nothing here"]);
  const [scholarship, setScholarship] = useState(["nothing here"]);
  const [support, setSupport] = useState(["nothing here"]);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
        firestoreService.collection("users").onSnapshot((snapshot) => {
          const userList = snapshot.docs.map((doc) => {
            return doc.id;
          });
          if (userList.includes(user.uid)) {
            firestoreService
              .collection("users")
              .doc(user.uid)
              .onSnapshot((snapshot) => {
                setUser(snapshot.data());
              });
          } else {
            firestoreService
              .collection("users")
              .doc(user.uid)
              .set({
                scrap: {
                  enrollment: [],
                  living: [],
                  major: [],
                  scholarship: [],
                  support: [],
                },
                uid: user.uid,
              });
          }
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  //for load data
  useEffect(() => {
    firestoreService.collection("enrollment").onSnapshot((snapshot) => {
      setEnrollment(
        snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        })
      );
    });
    firestoreService.collection("major").onSnapshot((snapshot) => {
      setMajor(
        snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        })
      );
    });
    firestoreService.collection("living").onSnapshot((snapshot) => {
      setLiving(
        snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        })
      );
    });
    firestoreService.collection("scholarship").onSnapshot((snapshot) => {
      setScholarship(
        snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        })
      );
    });
    firestoreService.collection("support").onSnapshot((snapshot) => {
      setSupport(
        snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  return (
    
    <div className="App">
      {init ? (
        <Router>
          <Switch>
            <Route exact path="/login">
              <LoginPage user={user} />
            </Route>
            <Route exact path="/home">
              <MainPage
                user={user}
                enrollment={enrollment}
                major={major}
                living={living}
                scholarship={scholarship}
                support={support}
              />
            </Route>
            <Route exact path="/profile">
              <ProfilePage />
            </Route>
          </Switch>
          <Redirect from="*" to="/login" />
        </Router>
      ) : (
        <Initializing />
      )}
    </div>
  );
}

export default App;
