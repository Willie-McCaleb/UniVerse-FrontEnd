import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../utils/newRequest";
import Member from "./Member";

const Members = ({ eventId }) => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["members"],
    queryFn: () =>
      newRequest.get(`/members/${eventId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (member) => {
      return newRequest.post("/members", member);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["members"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ eventId });
  };

  return (
    <div className="Members">
      <div className="UserMem">
        {isLoading
          ? "loading"
          : error
          ? "Something went wrong!"
          : data.map((member) => <Member key={member._id} member={member} />)}
      </div>
      <div className="add">
        <button onClick={handleSubmit}>Attend</button>
      </div>
    </div>
  );
};

export default Members;
