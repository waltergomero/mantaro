"use server";

import  Images  from "@/models/image";
import db from "@/utils/dbconnection";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

var mv = require("mv");


export async function addImage(formData) {

    try {    
    var date = new Date();
    const unixTimestamp = Math.floor(date.getTime());
    
      const product_id = formData.get("product_id");    
      const image = formData.get("image");
      const image_ext = "." + formData.get("extension");
      const order = formData.get("order");

      //const imageName = unixTimestamp + image_ext;
      console.log("step1: ")
      const buffer = Buffer.from(await image.arrayBuffer());
      console.log("step2: ")
      var _path = create_folder();
      console.log("step4: ")
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      console.log("uniqueSuffix: ", uniqueSuffix)
      console.log("image.name: ", image.name)
      const filename = `${image.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
      console.log(filename)
     // await writeFile(`${_path}/${filename}`, buffer);
      const relativeUploadDir = removeFirstWord(_path)
      console.log("step5: ")
      const fileUrl = `${relativeUploadDir}/${filename}`;
      console.log("step6: ")
      
      console.log("fileurl: ", fileUrl)
    //   console.log("image info: ", image, imageName, oldPath, newPath)

    //   mv(oldPath, newPath, function (err) {});
    //   const updatedPath = removeFirstWord(newPath);

    //   var sizeOf = require("image-size");
    //   var dimensions = sizeOf(oldPath);

    //   var format = "Landscape";
    //   if (dimensions.height > dimensions.width) format = "Portrait";

    //   const newImage = new Images({
    //     product_id: product_id,
    //     image_name: imageName,
    //     path: updatedPath,
    //     format: format,
    //     order: order,
    //   });
  
    //   console.log("data: ", newImage)
    //   await db.connect();
    //   await newImage.save();
    //   await db.disconnect();
    } catch (err) {
       return { error: "Failed to insert new product!" };
    }    
  }
  
  function create_folder() {
    const fs = require("fs");
    const dir = "public/images/product";
    !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true });

    return dir;
   
  }
  
  function removeFirstWord(str) {
    const indexOfSpace = str.indexOf("/");
  
    if (indexOfSpace === -1) {
      return "";
    }
  
    return str.substring(indexOfSpace + 1);
  }