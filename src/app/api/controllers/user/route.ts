import { NextApiRequest, NextApiResponse } from "next";
import User from "@/app/api/models/user";
import { NextRequest, NextResponse } from "next/server";
import validateEmail from "@/app/helpers/emailValidationHook";

export async function GET(req: NextRequest) {
  try {
    // const users = await User.countAll();
    const listUsers = await User.getAll();
    const users = listUsers.length;
    return NextResponse.json(
      { message: "sucess", users, listUsers },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "error", err }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const isValidEmail = validateEmail(email);
  console.log(email, isValidEmail);
  if (isValidEmail) {
    try {
      const user = new User(email, "John", "Doe", "password", 1);
      if (user) {
        await user.create();
      }
      return NextResponse.json({ message: "success", user }, { status: 201 });
    } catch (err) {
      return NextResponse.json({ message: "error", err }, { status: 400 });
    }
  } else {
    return NextResponse.json(
      { message: "error", error: "Invalid email" },
      { status: 400 }
    );
  }
}
