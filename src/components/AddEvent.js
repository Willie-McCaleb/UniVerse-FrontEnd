import React, { useReducer, useState } from "react";
import "./AddEvent.css";
import { INITIAL_STATE, eventReducer } from "../reducers/eventReducer";
import upload from "../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { useNavigate, Link } from "react-router-dom";

function AddEvent() {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(eventReducer, INITIAL_STATE);

  const handleChange = (e) => {
    e.preventDefault();
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const coverImg = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { coverImg, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (event) => {
      return newRequest.post("/events", event);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myEvents"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/myEvents");
  };

  return (
    <div className="addEvent">
      <div className="container">
        <div className="section">
          <span className="breadCrumbs">
            {" "}
            <Link to="/myEvents" className="link">
              Events
            </Link>{" "}
            &gt; Create Events
          </span>
          <div className="basic">
            <div className="info">
              <i className="fa-solid fa-circle-info"></i>
              <div className="text">
                <h2>Basic Info</h2>
              </div>
            </div>
            <div className="allInfo">
              <p>Name your event and tell event-goers about your event.</p>
              <div className="inputs">
                <input
                  required
                  type="text"
                  name="title"
                  placeholder="Event Title"
                  onChange={handleChange}
                />
                <textarea
                  type="text"
                  name="desc"
                  placeholder="Full Describtion of Event"
                  onChange={handleChange}
                />
              </div>
              <p className="sub-para">
                Please pick a categary for this event below.
              </p>
              <select required name="cat" id="cat" onChange={handleChange}>
                <option value=""> Select An Categary</option>
                <option value="art"> Art & Theatre</option>
                <option value="lifestyle"> Lifestyle</option>
                <option value="sports"> Sports</option>
                <option value="music"> Music</option>
              </select>
              <h3>Images</h3>
              <p>Add life to your event post through images</p>
              <div className="img">
                <div className="imagesInputs">
                  <div>
                    <label htmlFor="">Cover Image</label>
                    <input
                      required
                      className="cover"
                      type="file"
                      onChange={(e) => setSingleFile(e.target.files[0])}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Upload Event Images</label>
                    <input
                      required
                      className="multiple"
                      type="file"
                      multiple
                      onChange={(e) => setFiles(e.target.files)}
                    />
                  </div>
                </div>
                <button onClick={handleUpload}>
                  {uploading ? "uploading" : "Upload"}
                </button>
              </div>
              <h3>Short Description</h3>
              <p>Mention any details or requirement for this event .</p>
              <input
                type="text"
                placeholder="Add extra details about the event"
                name="shortDesc"
                onChange={handleChange}
              />
            </div>
          </div>
          <hr />

          <div className="location">
            <div className="info">
              <i className="fa-solid fa-signs-post"></i>
              <h2>Location</h2>
            </div>
            <div className="allInfo">
              <p>
                Help people in the area discover your event and let attendees
                know where to show up.
              </p>
              <label htmlFor="">University</label>
              <input
                required
                className="up"
                type="text"
                onChange={handleChange}
                name="school"
                placeholder="University of Mississippi"
              />
              <label htmlFor="">Location Name</label>
              <input
                required
                className="up"
                type="text"
                onChange={handleChange}
                name="locationName"
                placeholder="e.g. Disney"
              />
              <label htmlFor="">Street Address</label>

              <div>
                <input
                  required
                  className="up"
                  type="text"
                  placeholder="Addess: 155 5th Street"
                  onChange={handleChange}
                  name="address"
                />
                <div className="second-row">
                  <input
                    type="text"
                    placeholder="City: Texas"
                    onChange={handleChange}
                    name="city"
                  />
                  <select onChange={handleChange} name="state" id="state">
                    <option value="">Select a state</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                  <input
                    onChange={handleChange}
                    name="zcode"
                    type="number"
                    placeholder="Zip Code: 78378"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div className="date-time">
            <div className="info">
              <i className="fa-solid fa-calendar"></i>
              <h2>Date and Time</h2>
            </div>

            <div className="allInfo">
              <p>
                Tell event goers when your event starts and ends so they can
                make plans to attend
              </p>
              <div className="dt">
                <label htmlFor="">Starts</label>
                <input
                  onChange={handleChange}
                  name="date"
                  required
                  type="date"
                  placeholder="Event Start Date"
                />
                <input
                  required
                  type="time"
                  onChange={handleChange}
                  name="time"
                  placeholder="Event Start Time"
                />
              </div>
            </div>
          </div>

          <hr />
          <div className="price">
            <div className="info">
              <i className="fa-solid fa-tag"></i>
              <h2>Price</h2>
            </div>
            <div className="allInfo">
              <p>
                Inform event goers of the event. Some might be windering if its
                free.
              </p>
              <input
                type="number"
                onChange={handleChange}
                name="price"
                placeholder='"0" or "$35.00"'
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="btn">
          <button onClick={handleSubmit} className="create">
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;
