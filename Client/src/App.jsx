
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/pages/Login";
import AdminDashboard from "./component/pages/AdminDashboard";
import { GiveFeedback } from "./component/feedbacks/FeedBacks";
import Register from "./component/pages/Register";
import NavBar from "./component/pages/NavBar";


function App() {
  return (
    <>
   
    <BrowserRouter><NavBar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/feedback" element={<GiveFeedback />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
