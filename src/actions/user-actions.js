"use server";

import  User  from "@/models/user";
import db from "@/utils/dbconnection";
import bcrypt from "bcryptjs";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '../auth/index';
import { AuthError } from 'next-auth';
import { unstable_noStore as noStore } from 'next/cache';

const ITEM_PER_PAGE = 10;

export const fetchFilteredUsers = async (q, page) => {
 
  const regex = new RegExp(q, "i");
 
  try {
    await db.connect();

    const users = await User.find({ email: { $regex: regex } })
      .sort({ last_name: 1, first_name: 1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    await db.disconnect();

    return users

  } catch (err) {
    return({error: "Failed to fetch users!"});
  }
};

export async function fetchUserPages(query) {
  noStore();
  const regex = new RegExp(query, "i");

  try {
    await db.connect();
    const count = await User.find({ email: { $regex: regex } }).count();
    await db.disconnect();
    const totalpages = Math.ceil(Number(count) / ITEM_PER_PAGE);

    return totalpages;

  } catch (err) {
    return({error: "Failed to fetch users!"});
  }
}


export const fetchUserById = async (id) => {
  try {
    await db.connect();
    const user = await User.findById(id);
    await db.disconnect();
    return user
  } catch (err) {
    return({error: err + "Failed to fetch user!"});
  }
};

export async function createUser(formData) {

  try {
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const email = formData.get("email");
    const password = formData.get("password");
    const isAdmin = formData.get("isadmin");

    await db.connect();
    const userexists = await User.findOne({ email: email });

    if (userexists) {
      //throw new Error("User with this email account already exists.");
      return { error: `User with this email account ${email} already exists.` };
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin,
    });

    await newUser.save();
    await db.disconnect();
  } catch (err) {
    return { error: "Failed to insert new user!" };
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function updateUser(formData) {
  try {
    const id = formData.get("id");
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const email = formData.get("email");
    const password = formData.get("password");
    const isAdmin = formData.get("isadmin");
    const isActive = formData.get("isactive");

    await db.connect();
    const userexists = await User.findOne({ email: email });

    if (userexists) {
      if (userexists._id != id) {
        return  {error: `User with this email "${email}" already exists`};
      }
    }

    let query = "";

    if(password){
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt); 

       query = {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: hashedPassword,
          isAdmin: isAdmin,
          isActive: isActive,
        };
     }
     else{
       
       query = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        isAdmin: isAdmin,
        isActive: isActive,
        };
     }
      await User.updateOne({ _id: id}, query);
      await db.disconnect();
  } catch (err) {
    return { error: err };
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function deleteUser(id) {
  try {
    await db.connect();
    await User.findByIdAndDelete(id);
    await db.disconnect();
  } catch (err) {
    throw new Error("Failed to delete user!");
  }
  revalidatePath("/dashboard/users");
}

export async function fetchUserByEmail(email) {
  try {
    await db.connect();
    const user = await User.findOne({email: email});
    await db.disconnect();
    return user;
  } catch (error) {

    throw new Error('Failed to fetch user.');
  }
}

export async function doCredentialLogin(formData) {
  console.log("formData", formData);

  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (err) {
    throw err;
  }
}

export async function authenticate(formData) { 
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
    console.log('User logged in');
  }

