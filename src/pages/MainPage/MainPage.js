import React from "react";
import Header from "./components/Header";
import NavContainer from "./containers/NavConnect";
import ArticleContainer from "./containers/ArticleConnect";

const MainPage = ({
  enrollment,
  living,
  major,
  scholarship,
  support,
  user,
}) => {
  console.log(user);
  console.log(enrollment);
  console.log(living);
  console.log(major);
  console.log(scholarship);
  console.log(support);
  return (
    <div>
      <NavContainer></NavContainer>

      <ArticleContainer
        user={user}
        enrollment={enrollment}
        living={living}
        major={major}
        scholarship={scholarship}
        support={support}
        />

    </div>
  );
};

export default MainPage;
