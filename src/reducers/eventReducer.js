export const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
  title: "",
  desc: "",
  shortDesc: "",
  school: "",
  date: "",
  time: "",
  address: "",
  city: "",
  state: "",
  zcode: 0,
  locationName: "",
  cat: "",
  price: 0,
  coverImg: "",
  images: [],
  featured: "",

  attend: 0,
};

export const eventReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_IMAGES":
      return {
        ...state,
        coverImg: action.payload.coverImg,
        images: action.payload.images,
      };

    default:
      break;
  }
};
