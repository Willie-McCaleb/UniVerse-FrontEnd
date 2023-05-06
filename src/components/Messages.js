import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Messages.css";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import moment from "moment";

function Messages() {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversation"],
    queryFn: () =>
      newRequest.get(`/conversation`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversation/${id}`);
    },
    onSuccess: () => {
      QueryClient.invalidateQueries(["conversation"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>All Messages</h1>
          </div>
          <div className="cat-events">
            <table>
              <tbody>
                <tr>
                  <th>From</th>
                  <th>Last Message</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
                {data.map((c) => (
                  <tr
                    className={
                      !c.userId &&
                      !c.readByUser && (
                        <button className="btn">Mark as Read</button>
                      ) &&
                      "active"
                    }
                    key={c.id}
                  >
                    <td>{c.userId}</td>
                    <td>
                      <Link to={`/chat/${c.id}`} className="link">
                        {c?.lastMessage?.substring(0, 100)}...
                      </Link>
                    </td>
                    <td>{moment(c.updateAt).fromNow()}</td>
                    <td>
                      {!c.userId && !c.readByUser && (
                        <button
                          onClick={() => handleRead(c.id)}
                          className="btn"
                        >
                          Mark as Read
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;
