import { useQuery } from "@tanstack/react-query";
import React from "react";
import newRequest from "../utils/newRequest";

const Member = ({ member }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [member.userId],
    queryFn: () =>
      newRequest.get(`/users/${member.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="oneMem">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="user">
          <div className="member-info">
            <img src={data.img || "assets/noavatar.png"} alt="" />

            <span>{data.username}</span>
            <span className="school">{data.school}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Member;
