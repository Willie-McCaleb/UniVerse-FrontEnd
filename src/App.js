import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Events from "./pages/Events";
import Event from "./pages/Event";
import MyEvents from "./pages/MyEvents";
// import Messages from "./pages/MessagesPage";
import GroupChat from "./pages/Chat";
import CreateEvent from "./pages/CreateEvent";
import Profile from "./pages/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<Event />} />
          <Route path="/myEvents" element={<MyEvents />} />
          {/* <Route path="/messages" element={<Messages />} /> */}
          <Route path="/groupChat/:id" element={<GroupChat />} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
