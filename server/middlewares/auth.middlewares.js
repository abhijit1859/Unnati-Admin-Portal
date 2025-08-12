import jwt from "jsonwebtoken"
import dotenv from "dotenv"


export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
   



    try {
        if (!token) {
            return res.status(401).json({ message: "Access Denied" })

        }
      
        const decoded = jwt.verify(token, "sshh")

        req.user = decoded;
  
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
}