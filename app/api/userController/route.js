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

    switch (action) {
      case "signup":
        return await signup(data);
      case "login":
        return await login(data);
      case "sendOtp":
        return await sendOtp(data);
      case "checkOtp":
        return await checkOtp(data,req,res);
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
export async function GET(req) {
  try {
    console.log("GET request received");
    // const { action, ...data } = await req.json();
    // i will get the action from the url
    const url=new URL(req.url);
    const action=url.searchParams.get("action");
    console.log("action:",action);
    await connectToDatabase();

    switch (action) {
      case "checkOtp": 
        return await checkOtp();
      case "getuser":
        return await getuser();

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
  // const user=await User.findOne({aadhar:decoded.aadhar});
  console.log(decoded);
  
  const aadhar=decoded.aadhar;
  console.log("aadhar:",aadhar);
  const user=await User.findOne({aadhar:aadhar});
  console.log("user:",user);
  if(!user){
    return NextResponse.json({message:"User not found"}, {status:404});
  }
  
  return NextResponse.json({message:"User found",user}, {status:200});
}

