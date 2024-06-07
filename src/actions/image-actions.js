"use server";

import  Images  from "@/models/image";
import db from "@/utils/dbconnection";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';



export async function addImage(formData) {

    try {

      console.log("formData: ", formData);

      const product_id = formData.get("product_id");    
      const images = formData.get("image");
      const image_ext = formData.get("extention");

  
      const newImage = new Images({
        product_id,
        image_name,
        format,
        order,
      });
  
      await db.connect();
      await newImage.save();
      await db.disconnect();
    } catch (err) {
      return { error: "Failed to insert new product!" };
    }
  }
  