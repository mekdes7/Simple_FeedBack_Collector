import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("http://localhost:3203/api/feedback/get", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          
        });
        console.log("User from localStorage:", user);

        setFeedbacks(res.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    if (user?.role === "admin") {
      fetchFeedbacks();
    }
  }, [user]);

  if (!user || user.role !== "admin") {
    return <h2>Access Denied. Admins only.</h2>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Dashboard</h1>
      <h3>All Feedbacks</h3>
      <ul>
        {feedbacks.map((fb) => (
          <li key={fb._id}>
            {fb.message} - Rating: {fb.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
