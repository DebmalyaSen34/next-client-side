import { withSession } from "@/lib/session";

export default withSession(async function handler(req, res) {
    if (req.method === 'POST') {
      req.session.destroy();
      res.status(200).json({ message: 'Logged out successfully' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  });