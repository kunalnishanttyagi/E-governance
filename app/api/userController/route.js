// app/api/users/route.js

import User from "../../../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

import cookieParser from "cookie-parser";
// import { connectToDatabase } from '../../../lib/db.js';
import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/db.js";
// Main POST route - acts like Express router
export function verifyUserToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, data: decoded };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}
export async function POST(req,res) {
  try {
    const { action, ...data } = await req.json();

    await connectToDatabase();
    console.log(action,data.userdata);
    switch (action) {
      case "signup":
        return await signup(data);
      case "login":
        return await login(data);
      case "sendOtp":
        return await sendOtp(data);
      case "checkOtp":
        return await checkOtp(data,req,res);
      case "updateProfile":
        return await updateProfile(data);
      case "sendissue":
        return await sendissue(data);
      case "getmedicalhelp":
        return await getmedicalhelp(data);
      default:
        return NextResponse.json(
          { message: "Invalid action" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error in POST /api/users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// export async function PUT(req) {
//   try {
//     console.log("Put request received");
    
//     const { action, ...data } = await req.json();

//     await connectToDatabase();

//     const users = await User.find({});
//     console.log("Users found:", users);

//     return NextResponse.json(users);
//   } catch (error) {  
//     console.error("Error in GET /api/users:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
// now i want to use super

export async function GET(req) {
  try {
    console.log("GET request received");
    
    // const { action, ...data } = await req.json();
    // get the action from the url
    const action=req.nextUrl.searchParams.get("action");
    console.log(action);
    await connectToDatabase();

    switch (action) {
      case "checkOtp": 
        return await checkOtp();
      case "getuser":
        return await getuser();
      case "signout":
        return await signOut();
      default:
        return NextResponse.json(
          { message: "Invalid action" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error in GET /api/users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
// Signup function
async function signup(data) {
  // async function signup({ firstname, lastname, email, password, phone, aadhar, dateOfBirth, pan, ration }) {
  try {

    // console.log(data);
    const {
      firstname,
      lastname,
      email,
      password,
      phone,
      aadhar,
      dateOfBirth,
      pancard,
      rationcard,
    } = data.userData;
    // console.log(data.userData.aadhar,data.userData.pancard);
    // console.log(firstname, lastname, email, password, phone, aadhar, dateOfBirth, pan, ration);
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !phone ||
      !aadhar ||
      !dateOfBirth
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    // console.log(aadhar, dateOfBirth, pancard, rationcard, email, phone, password);
    // Check if user exists
    const existingUser = await User.findOne({ aadhar });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    let saltRound = parseInt(process.env.BCRYPT_SALT_ROUNDS);
    if (!saltRound) {
      return NextResponse.json(
        { message: "Salt round not found" },
        { status: 500 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, saltRound);

    // Create new user
    const newUser = new User({
      firstName: firstname,
      lastName: lastname,
      email:email,
      password: hashedPassword,
      phone:phone,
      dateOfBirth:dateOfBirth,
      aadhar:aadhar,
      pancard:pancard,
      rationcard:rationcard,
    });

    await newUser.save();
    // console.log("User created successfully:", newUser);

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error in signup:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Login function
async function login({ email, password }) {
  try {
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login successful", user },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in login:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
async function checkOtp(data,req,res) {
  console.log("checkOtp called with data:", data);
  try {
    const { aadhar, otp } = data.userData;
    if (!aadhar || !otp) {
      return NextResponse.json(
        { message: "Aadhar and OTP are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ aadhar });
    // console.log("User found:", user);
    // now generate a jwt token and return it
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log("User found:", user);
    // now using the aadhar number phone number and otp i will create a jwt token
    const token = jwt.sign(
      {
        // Last 3 digits of Aadhaar
        aadhar: user.aadhar,

        // Last 3 digits of PAN
        pan: user.phone.slice(-3),

        // Last 4 digits of Voter ID
        voterId: user.pancard.slice(-4)||"987654",

        // First 5 digits of phone number
        phone: user.otp.slice(0, 5),

        // OTP digits at position 1, 3, 5 (1-based indexing)
        otp: `${user.otp[0]}${user.otp[2]}${user.otp[4]}`,
      },
      process.env.JWT_SECRET
    );
    // console.log("Token generated:", token);

    if (user.otp !== otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 401 });
    }

    // OTP is valid, proceed with login or further actions
    // res.coo
    const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/"
  });

  // console.log(token,dataa);

  return new Response(JSON.stringify({ message: "Logged in" }), { status: 200 });
  } catch (err) {
    console.error("Error in checkOtp:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
async function sendOtp({ userData }) {
  try {
    const { aadhar } = userData;
    if (!aadhar) {
      return NextResponse.json(
        { message: "Aadhar number is required" },
        { status: 400 }
      );
    }

    // Here you would implement the logic to send OTP to the user's phone or email
    // For now, we will just simulate it
    console.log(`Sending OTP to Aadhar: ${aadhar}`);
    // Simulate sending OTP

    let otp = 0;
    let x = 0;
    while (x < 6) {
      otp = otp * 10 + Math.floor(Math.random() * 10);
      x++;
    }
    const user = await User.findOne({ aadhar });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    user.otp = otp;
    await user.save();
    // console.log(user);
    console.log(user.otp);
    console.log(`OTP sent: ${otp}`);

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in sendOtp:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function getuser(){
  // accept the token from cookies
  // console.log("getuser called with data:", data);
  console.log("got a request to get user");
  const cookieStore=await cookies();
  const token=cookieStore.get("token");
  if(!token){
    return NextResponse.json({message:"Unauthorized"},{status:401});
  }
  const decoded=jwt.verify(token.value,process.env.JWT_SECRET);
  const user=await User.findOne({aadhar:decoded.aadhar});
  console.log(decoded);
  return NextResponse.json({message:"User found",user:user}, {status:200});
}


export async function updateProfile(data){
  try {
    console.log("updateProfile called with data:", data);
    const { address, phone, email, profilePicture,pancard,rationcard } = data.userData;
    if (!address && !phone && !email && !profilePicture) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const cookieStore=await cookies();
  const token=cookieStore.get("token");
  if(!token){
    return NextResponse.json({message:"Unauthorized"},{status:401});
  }
  const decoded=jwt.verify(token.value,process.env.JWT_SECRET);
  // const user=await User.findOne({aadhar:decoded.aadhar});
  // console.log(decoded);
  const aadhar=decoded.aadhar;
  const user=await User.findOne({aadhar});
  if(!user){
    return NextResponse.json({message:"User not found"},{status:404});
  }
  console.log("User found:", user);
  console.log(user.address)
    if(address) user.address=address;
    if(phone) user.phone=phone;
    if(email) user.email=email;
    if(profilePicture) user.profilePicture=profilePicture;
    if(pancard){
      if(!user.pancard) user.pancard=pancard;
    
    }
    if(rationcard){
      if(!user.rationcard) user.rationcard=rationcard;
    }

    await user.save();
    console.log(user);
    // console.log(aadhar, dateOfBirth, pancard, rationcard, email, phone, password);
    // Check if user exists
    // const existingUser = await User.findOne({ aadhar });
    // if (existingUser) {
      return NextResponse.json(
        { message: "User updated successfully" },
        { status: 200 }
      );
    // }
  }
  catch (err) {
    console.error("Error in updateProfile:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

const sendissue=async(data)=>{
  try {
    console.log("sending issue to user",data);
    const { description, department, image } = data.userData;
    if (!description || !department) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // console.log("sending issue to user",description,department,image);
    const user=await User.findOne({role:data.department});
    if(!user){
      console.log(" user not found");
      return NextResponse.json({message:"User not found"},{status:404});
    }
    user.notifications.push(description);
    await user.save();
    console.log(user);
    return NextResponse.json(
      { message: "Issue submitted successfully" },
      { status: 200 }
    );
  }
    catch (err) {
      console.error("Error in sendissue:", err);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }


  const getmedicalhelp=async(data)=>{
    try {
      console.log("sending issue to user",data);
      const { description, age, gender, frequency, image=null } = data.userData;
      if (!description || !age || !gender || !frequency) {
        return NextResponse.json(
          { message: "All fields are required" },
          { status: 400 }
        );
      }
  
      // console.log("sending issue to user",description,department,image);

      // const data = await req.json();
    // const { description, age, gender, frequency, image=null } = data.userData;

    // Construct prompt for Gemini
    const prompt = `
    The user has a medical issue. Provide a helpful solution/advice.
    Details:
    - Description: ${description}
    - Age: ${age}
    - Gender: ${gender}
    - Frequency: ${frequency}
    `;

    // Call Gemini API
    console.log("Calling Gemini API with prompt:", prompt);
    const geminiRes = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const geminiData = await geminiRes.json();
    console.log("Gemini API Response:", geminiData);
    const solution =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No solution found, please try again.";

    return NextResponse.json({ success: true, solution });
  } catch (err) {
    console.error("Gemini API Error:", err);
    return NextResponse.json(
      { success: false, message: "Error generating medical solution" },
      { status: 500 }
    );
  }
      
      
}


const signOut=async(data)=>{
  
    

  try {
    
    console.log("Signing out");
  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: "",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0, // expire immediately
  });

  return Response.json({ message: "Logged out" });
}
  
   catch (err) {
    console.error("Error in signOut:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
    // console.log("sending issue to user",description,department,image);

    // const data = await req.json();