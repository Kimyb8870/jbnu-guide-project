import React, { useState, useEffect } from "react";
import "./ProfilePost.css";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ReportIcon from "@material-ui/icons/Report";

const ProfilePost = ({ post }) => {
  // const { id, question, answer, classified } = post;

  console.log(post);

  const [isPostActive, setIsPostActive] = useState(false);
  const [buttonColor, setButtonColor] = useState("de726b");

  function chooseButtonColor() {
    switch (post.classified) {
      case "major":
        setButtonColor("color78934F");
        break;
      case "living":
        setButtonColor("color9C5B5B");
        break;
      case "enrollment":
        setButtonColor("colorE7AB20");
        break;
      case "scholarship":
        setButtonColor("colorDE726B");
        break;
      case "support":
        setButtonColor("color4F5A93");
        break;
      default:
        break;
    }
  }
  const handlePostActive = () => {
    setIsPostActive(!isPostActive);
  };

  useEffect(() => {
    chooseButtonColor();
  }, []);

  const deleteScrapElem = () => {
    alert("delete this");
  };

  return (
    <div className="profilepage__post">
      {/* 해당답변이 보여질 카드 */}
      <button onClick={handlePostActive} className={buttonColor}>
        Q. {post.question}
      </button>
      {/* 질문사항이 보여질 버튼*/}
      {isPostActive ? (
        <div>
          <header>
            <IconButton>
              <ReportIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon onClick={deleteScrapElem} />
            </IconButton>
          </header>
          <p>A. {post.answer}</p>
          {post.pic &&
            post.pic.map((link) => (
              <img className="post_pic" src={link} alt="" />
            ))}
        </div>
      ) : null}
    </div>
  );
};

export default ProfilePost;
