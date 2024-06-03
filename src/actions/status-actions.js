"use server";

import  Status  from "@/models/status";
import db from "@/utils/dbconnection";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

const ITEM_PER_PAGE = 10;

export const fetchFilteredStatus = async (q, page) => {
 
  const regex = new RegExp(q, "i");
 
  try {
    await db.connect();

    const status = await Status.find({ status_name: { $regex: regex } })
      .sort({ status_type_id: 1, status_name: 1 })
      //.limit(ITEM_PER_PAGE)
      //.skip(ITEM_PER_PAGE * (page - 1));
    console.log(status);
    await db.disconnect();

    return status

  } catch (err) {
    return({error: "Failed to fetch status!"});
  }
};

export async function fetchStatusPages(query) {
  noStore();
  const regex = new RegExp(query, "i");

  try {
    await db.connect();
    const count = await User.find({ status_name: { $regex: regex } }).count();
    await db.disconnect();
    const totalpages = Math.ceil(Number(count) / ITEM_PER_PAGE);

    return totalpages;

  } catch (err) {
    return({error: "Failed to fetch users!"});
  }
}

export async function fetchStatusTypeId() {
  noStore();

  try {
      var arr = [];
      for (let i = 0; i <= 10; i++) {
        arr.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }

      return arr;

  } catch (err) {
    return({error: "Failed to fetch status type id!"});
  }
}



export const fetchStatusById = async (id) => {
  try {
    await db.connect();
    const status = await Status.findById(id);
    await db.disconnect();
    return status;
  } catch (err) {
    return({error: "Failed to fetch status!"});
  }
};

export async function createStatus(formData) {

  try {
    const status_name = formData.get("status_name");
    const status_type_id = formData.get("status_type_id");

    await db.connect();
    const statusexists = await Status.findOne({ status_name: status_name, status_type_id: status_type_id });

    if (statusexists) {
      return { error: `Status name ${status_name} with type id ${status_type_id}  already exists.` };
    }

    const newStatus = new Status({
      status_name,
      status_type_id,
    });

    await newStatus.save();
    await db.disconnect();
  } catch (err) {
    return { error: "Failed to insert new status!" };
  }

  revalidatePath("/dashboard/status");
  redirect("/dashboard/status");
}

export async function updateStatus(formData) {
  console.log(formData);
  try {
    const id = formData.get("id");
    const status_name = formData.get("status_name");
    const status_type_id = formData.get("status_type_id");
    const isactive = formData.get("isactive");

    await db.connect();
    const statusexists = await Status.findOne({ status_name: status_name, status_type_id: status_type_id });

    if (statusexists) {
      if (statusexists._id != id) {
        return  {error: `Status name "${status_name}" with type id "${status_type_id}" already exists`};
      }
    }

    const query = {
      status_name: status_name,
      status_type_id: status_type_id,
      isActive: isactive
    };
    
    await Status.updateOne({ _id: id}, query);
    await db.disconnect();

    }
   catch (err) {
    return { error: err };
  }

  revalidatePath("/dashboard/status");
  redirect("/dashboard/status");
}

export async function deleteStatus(id) {
  try {
    await db.connect();
    await Status.findByIdAndDelete(id);
    await db.disconnect();
  } catch (err) {
    throw new Error("Failed to delete status!");
  }
  revalidatePath("/dashboard/status");
}
