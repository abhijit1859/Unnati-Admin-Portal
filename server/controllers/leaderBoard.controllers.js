import { User } from "../models/user.model.js";

export const monthlyLeaderBoard = async (req, res) => {
  try {
    const { teamName } = req.body;

    const query = teamName ? { associatedCenter: teamName } : {};

    const leaderboard = await User.find(query)
      .sort({ classes: -1 }) // highest classes first
      .limit(10)             // top 10
      .select("name associatedCenter classes");

    res.json({ leaderboard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
