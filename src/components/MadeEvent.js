import React from "react";
import "./MyEvents.css";
import getCurrentUser from "../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";

function MadeEvent() {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myEvents"],
    queryFn: () =>
      newRequest.get(`/events?userId=${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.post(`/events/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myEvents"]);
    },
  });

  return (
    <div className="myEvent">
      <div className="container">
        <div className="cat-events">
          <h2>Created Events</h2>
          {isLoading ? (
            "loading "
          ) : error ? (
            "error"
          ) : (
            <table>
              <tbody>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
                {data.map((event) => (
                  <tr>
                    <td>
                      <img src={event.coverImg} alt="" />
                    </td>
                    <td>{event.title}</td>
                    <td>{event.price}</td>
                    <td>{event.date}</td>

                    <td>
                      <i
                        className="fa-solid fa-trash"
                        onClick={handleDelete}
                      ></i>
                      <i className="fa-solid fa-comment-dots"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default MadeEvent;
