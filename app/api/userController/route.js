// app/api/users/route.js

import User from '../../../models/user.js';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../../lib/db.js';
import { NextResponse } from 'next/server';

// Main POST route - acts like Express router
export async function POST(req) {
  try {
    const { action, ...data } = await req.json();

    await connectToDatabase();

    switch (action) {
      case 'signup':
        return await signup(data);
      case 'login':
        return await login(data);
        case 'sendOtp':
            return await sendOtp(data);
        case 'checkOtp':
            return await checkOtp(data);
      default:
        return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in POST /api/users:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
export async function GET(req) {
    try {
        console.log("GET request received");
        const { action, ...data } = await req.json();

        await connectToDatabase();

        switch (action) {
        case 'checkOtp':{
            console.log("checkOtp called with data:", data);
            return await checkOtp(data);
            
        }
        
        default:
            return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
        }   
    }
    catch (error) {
        console.error('Error in GET /api/users:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
// Signup function
async function signup(data){
// async function signup({ firstname, lastname, email, password, phone, aadhar, dateOfBirth, pan, ration }) {
  try {
    // console.log(data);
    const { firstname, lastname, email, password, phone, aadhar, dateOfBirth, pan, ration } = data.userData;
    // console.log(firstname, lastname, email, password, phone, aadhar, dateOfBirth, pan, ration);
    if (!firstname || !lastname || !email || !password || !phone || !aadhar || !dateOfBirth) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await User.findOne({ aadhar });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    // Hash password
    let saltRound = parseInt(process.env.BCRYPT_SALT_ROUNDS);
    if (!saltRound) {
      return NextResponse.json({ message: 'Salt round not found' }, { status: 500 });
    }
    const hashedPassword = await bcrypt.hash(password, saltRound);

    // Create new user
    const newUser = new User({
      firstName: firstname,
      lastName: lastname,
      email,
      password: hashedPassword,
      phone,
      dateOfBirth,
      aadhar,
      pan,
      ration
    });

    await newUser.save();

    return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
  } catch (err) {
    console.error('Error in signup:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Login function
async function login({ email, password }) {
  try {
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login successful', user }, { status: 200 });
  } catch (err) {
    console.error('Error in login:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
async function checkOtp(data) {
    console.log("checkOtp called with data:", data);
  try {
    
    const { aadhar, otp } = data.userData;
    if (!aadhar || !otp) {
      return NextResponse.json({ message: 'Aadhar and OTP are required' }, { status: 400 });
    }

    const user = await User.findOne({ aadhar });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (user.otp !== otp) {
      return NextResponse.json({ message: 'Invalid OTP' }, { status: 401 });
    }

    // OTP is valid, proceed with login or further actions
    return NextResponse.json({ message: 'OTP verified successfully', user }, { status: 200 });
  }
    catch (err) {
        console.error('Error in checkOtp:', err);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
async function sendOtp({ userData }) {
  try {
    const { aadhar } = userData;
    if (!aadhar) {
      return NextResponse.json({ message: 'Aadhar number is required' }, { status: 400 });
    }

    // Here you would implement the logic to send OTP to the user's phone or email
    // For now, we will just simulate it
    console.log(`Sending OTP to Aadhar: ${aadhar}`);
    // Simulate sending OTP
    
    let otp=0;
    let x=0;
    while(x<6){
      otp=otp*10+Math.floor(Math.random()*10);
      x++;
    }
    const user= await User.findOne({ aadhar });
    if(!user){
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    user.otp=otp;
    await user.save();
    // console.log(user);
    console.log(user.otp)
    console.log(`OTP sent: ${otp}`);


    return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error in sendOtp:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
