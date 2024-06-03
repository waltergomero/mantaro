"use server";

import  Category  from "@/models/category";
import db from "@/utils/dbconnection";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

const ITEM_PER_PAGE = 10;

export const fetchFilteredCategories = async (q, page) => {
 
  const regex = new RegExp(q, "i");
 
  try {
    await db.connect();

    const categories = await Category.find({ category_name: { $regex: regex } })
      .sort({ category_name: 1 })
 
    await db.disconnect();

    return categories

  } catch (err) {
    return({error: "Failed to fetch parent categories!"});
  }
};

export async function fetchCategoryPages(query) {
  noStore();
  const regex = new RegExp(query, "i");

  try {
    await db.connect();
    const count = await Category.find({ category_name: { $regex: regex } }).count();
    await db.disconnect();
    const totalpages = Math.ceil(Number(count) / ITEM_PER_PAGE);

    return totalpages;

  } catch (err) {
    return({error: "Failed to fetch categories!"});
  }
}

export async function fetchParentCategories() {
  noStore();

  try {
    await db.connect();
    const parentecategories = await Category.find().select('_id category_name').sort({ category_name: 1 }).lean();
    await db.disconnect();
    return parentecategories;

  } catch (err) {
    return({error: "Failed to fetch parent categories!"});
  }
}


export const fetchCategoryById = async (id) => {
  try {
    await db.connect();
    const category = await Category.findById(id).select('_id category_name parent_category_id parent_category_name isActive notes');
    await db.disconnect();
    return category;
  } catch (err) {
    return({error: "Failed to fetch category!"});
  }
};

export const fetchCategories = async () => {
  try {
    await db.connect();
    let category = await Category.find().select('_id category_name').lean();
    await db.disconnect();
    return category;
  } catch (err) {
    return({error: "Failed to fetch category!"});
  }
};

export async function createCategory(formData) {

  try {
    console.log("form data: ", formData)
    const category_name = formData.get("category_name");
    const parent_category_id = formData.get("parent_category_id");
    let parent_category_name = "";
    const notes = formData.get("notes");

    await db.connect();
    const categoryexists = await Category.findOne({ category_name: category_name });

    if (categoryexists) {
      return { error: `Category name ${category_name} already exists.` };
    }

    if(parent_category_id != "") {
     const parentcategoryname = await Category.findOne({ _id: parent_category_id }).select('category_name');
    if (parentcategoryname) {
      parent_category_name = parentcategoryname.category_name;
    }
  }

    const newCategory = new Category({
      category_name,
      parent_category_id,
      parent_category_name,
      notes,
    });

    await newCategory.save();
    await db.disconnect();
  } catch (err) {
    return { error: "Failed to insert new category!" };
  }

  revalidatePath("/dashboard/categories");
  redirect("/dashboard/categories");
}

export async function updateCategory(formData) {
  try {
    console.log("form data actions: ", formData)
    const id = formData.get("id");
    const category_name = formData.get("category_name");
    const parent_category_id = formData.get("parent_category_id");
    let parent_category_name = "";
    const isActive = formData.get("isactive");
    const notes = formData.get("notes");

    await db.connect();
    const categoryexists = await Category.findOne({ category_name: category_name });

    if (categoryexists) {
      if (categoryexists._id != id) {
        return  {error: `Category name "${category_name}"  already exists`};
      }
    }

    if(parent_category_id != "") {
    const parentcategoryname = await Category.findOne({ _id: parent_category_id }).select('category_name');
    console.log("parent category name: ", parentcategoryname.category_name)
    if (parentcategoryname) {
      parent_category_name = parentcategoryname.category_name;
    }
   }


    const query = {
      category_name: category_name,
      parent_category_id: parent_category_id,
      parent_category_name: parent_category_name,
      isActive: isActive,
      notes: notes,
    };
    console.log("query: ", query)
    await Category.updateOne({ _id: id}, query);
    await db.disconnect();

    }
   catch (err) {
    return { error: err };
  }

  revalidatePath("/dashboard/categories");
  redirect("/dashboard/categories");
}

export async function deleteCategory(id) {
  try {
    await db.connect();
    await Category.findByIdAndDelete(id);
    await db.disconnect();
  } catch (err) {
    throw new Error("Failed to delete category!");
  }
  revalidatePath("/dashboard/categories");
}
