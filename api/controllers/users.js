import { db } from "../db.js";

// Function to get user profile
export const getUserProfile = (req, res) => {
  const userId = req.params.id;

  const q = "SELECT id, username, email, img FROM users WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (!data.length) return res.status(404).json({ error: "User not found!" });

    const userProfile = {
      id: data[0].id,
      username: data[0].username,
      email: data[0].email,
      img: data[0].img, // Ensure consistency with your React component
    };

    res.status(200).json(userProfile);
  });
};

// Function to update user profile
export const updateUserProfile = (req, res) => {
  const userId = req.params.id;
  const { username, email } = req.body;

  const q = "UPDATE users SET username = ?, email = ? WHERE id = ?";

  db.query(q, [username, email, userId], (err, data) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (data.affectedRows === 0)
      return res.status(404).json({ error: "User not found!" });

    res.status(200).json({ message: "User updated successfully!" });
  });
};
