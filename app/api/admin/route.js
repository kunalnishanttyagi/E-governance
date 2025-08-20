// here will write the code for the admin route
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/db';
import User from '../../../models/user.js';
import user from '../../../models/user.js';
export async function POST(req){
    try {
        const {action,...data}=await req.json();
        await connectToDatabase();
        // console.log("Action received:", action, "with data:", data.aadhar, data.departments);
        switch(action){
            
            case 'addToDepartment': {
                return addToDepartment(data.aadhar, data.departments);
            }
            case 'sendNotification': {
                return sendNotification(data.notificationForm);
            }
            default:
                return NextResponse.json({message: 'Invalid action'}, {status: 400});
        }        
    } catch (error) {
        console.error('Error in POST /api/admin:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
const sendNotification = async (notificationForm) => {
    try {
        if (!notificationForm.notification) {
            return NextResponse.json({ message: 'Notification is required' }, { status: 400 });
        }
        const  notification  = notificationForm.notification;
        console.log("Notification received:", notification);
        
    
    await User.updateMany(
      {},
      { $push: { notifications: notificationForm.notification } }
    );

    return NextResponse.json({ success: true, message: "Notification sent to all users!" });
  } catch (error) {
        console.error('Error sending notification:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

const addToDepartment = async ( aadhar, departments ) => {
    try {
        if (!aadhar || !departments) {
            return NextResponse.json({ message: 'Aadhar and departments are required' }, { status: 400 });
        }
        
        // Assuming you have a User model to interact with the database
        const user = await User.findOne({ aadhar });
        console.log("User found:", user.role);
        // return NextResponse.json({ message: 'User found', user }, { status: 200 });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Add the department to the user's departments array
        user.role = departments // Ensure no duplicates
        await user.save();

        return NextResponse.json({ message: 'User added to department successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error adding user to department:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}