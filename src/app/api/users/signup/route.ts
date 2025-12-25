import { connect } from "@/dbConfig/dConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcyrptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    if (!username) {
      return NextResponse.json({ error: "Provide username" }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: "Provide username" }, { status: 400 });
    }

    if (!password) {
      return NextResponse.json({ error: "Provide password" }, { status: 400 });
    }

    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    //hash password
    const salt = await bcyrptjs.genSalt(10); //no of rounds
    const hashedPassword = await bcyrptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
