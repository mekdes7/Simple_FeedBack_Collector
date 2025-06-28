import { useState, useEffect } from "react";
import axios from "axios";

export const GiveFeedback = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: user?.username || "",
    email: user?.email || "",
    message: "",
    rating: "",
  });
  const [msg, setMsg] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ message: "", rating: "" });

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get(`http://localhost:3203/api/feedback/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const userFeedbacks = res.data.filter((fb) => fb.email === user.email);
        setFeedbacks(userFeedbacks);
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };
    if (user) fetchFeedbacks();
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3203/api/feedback/create", form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMsg(res.data.message);
      setForm({ ...form, message: "", rating: "" });
      setFeedbacks((prev) => [...prev, res.data.feedback]); 
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong");
    }
  };

  const startEdit = (fb) => {
    setEditing(fb._id);
    setFormData({ message: fb.message, rating: fb.rating });
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3203/api/feedback/update/${id}`, {
      
        name: user.username,
        email: user.email,
        message: formData.message,
        rating: formData.rating,
      },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
      setFeedbacks((prev) => prev.map((fb) => (fb._id === id ? res.data.feedback : fb)));
      setEditing(null);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3203/api/feedback/delete/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setFeedbacks((prev) => prev.filter((fb) => fb._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea name="message" value={form.message} onChange={handleChange} required />
        <select name="rating" value={form.rating} onChange={handleChange} required>
          <option value="">Select Rating</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <button type="submit">Submit Feedback</button>
        <p>{msg}</p>
      </form>

      <div>
        <h2>Your Feedbacks</h2>
        {feedbacks.map((fb) => (
          <div key={fb._id} style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>
            {editing === fb._id ? (
              <>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleUpdate(fb._id)}>Save</button>
              </>
            ) : (
              <>
                <p>
                  <strong>Message:</strong> {fb.message}
                </p>
                <p>
                  <strong>Rating:</strong> {fb.rating}
                </p>
                <button onClick={() => startEdit(fb)}>Edit</button>
                <button onClick={() => handleDelete(fb._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
