import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { decode } from "punycode";
import User from "../../../models/user.js";
export async function GET() {
  const cookieStore =await cookies();
  const token = cookieStore.get("token");
  console.log("token is",token);
  if (!token) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    // verify token
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    console.log("decoded ia",decoded);
    console.log(decoded.aadhar);
    const user=await User.findOne({aadhar:decoded.aadhar});
    // you can fetch user from DB if needed
    console.log("user fetched");
    console.log("user",user);
    return Response.json({
      success: true,
      user: user,
    });
  } catch (err) {
    return Response.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}
