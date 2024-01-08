import React, { useState, useEffect, useRef } from "react";
import classes from "./UserPost.module.css";

function UserPost({ post }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef(null);

  const togglePopupVisibility = () => {
    setIsPopupVisible((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div onClick={togglePopupVisibility} className={classes.userpost}>
        <div className={classes.mytitle}>{post.title}</div>
        <div>{post.body}</div>
      </div>
      {isPopupVisible && (
        <div ref={popupRef} className={classes.popup}>
          {/* Your popup content goes here */}
          {post.body}
        </div>
      )}
    </>
  );
}

export default UserPost;
