import React from "react";

const Share = ({ title, text, url }) => {
  const handleShare = async () => {
    try {
      await navigator.share({
        title,
        url,
      });
      console.log("Content shared successfully");
    } catch (error) {
      console.error("Error sharing content:", error.message);
    }
  };

  return (
    <button onClick={handleShare} className="shareBtn">
      Share
    </button>
  );
};

export default Share;
