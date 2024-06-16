"use server";

import  Product  from "@/models/product";
import db from "@/utils/dbconnection";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

const ITEM_PER_PAGE = 10;

export const fetchFilteredProducts = async (q, page) => {
 
  const regex = new RegExp(q, "i");
 
  try {
    await db.connect();

    const products = await Product.find({ product_name: { $regex: regex } })
      .sort({ product_name: 1 })
 
    await db.disconnect();

    return products

  } catch (err) {
    return({error: "Failed to fetch parent products!"});
  }
};

export async function fetchProductPages(query) {
  noStore();
  const regex = new RegExp(query, "i");

  try {
    await db.connect();
    const count = await Product.find({ product_name: { $regex: regex } }).count();
    await db.disconnect();
    const totalpages = Math.ceil(Number(count) / ITEM_PER_PAGE);

    return totalpages;

  } catch (err) {
    return({error: "Failed to fetch products!"});
  }
}


export const fetchProductById = async (id) => {
  try {
    await db.connect();
    const _product = await Product.findById(id).select('_id product_name slug category_id category_name price cost number_instock number_onorder quantity_per_unit reorder_level isactive description').lean();  
    await db.disconnect();

    const product = JSON.parse(JSON.stringify(_product));
    return product;

  } catch (err) {
    return({error: "Failed to fetch a product!"});
  }
};

export const fetchProducts = async () => {
  try {
    await db.connect();
    const product = await Product.find().select('_id product_name').lean();
    await db.disconnect();
    return product;
  } catch (err) {
    return({error: "Failed to fetch products!"});
  }
};

export async function createProduct(formData) {

  try {
    const product_name = formData.get("product_name");    
    const slug = formData.get("slug");
    const category_id = formData.get("category_id");
    const category_name = formData.get("category_name"); 
    const quantity_per_unit = formData.get("quantity_per_unit"); 
    const cost = formData.get("cost");
    const price = formData.get("price");
    const number_instock = formData.get("number_instock");
    const number_onorder = formData.get("number_onorder");
    const reorder_level = formData.get("reorder_level");
    const description = formData.get("description"); 


    await db.connect();
    const productexists = await Product.findOne({ product_name: product_name });

    if (productexists) {
      return { error: `Product name ${product_name} already exists.` };
    }

    const newProduct = new Product({
      product_name,
      slug,
      category_id,
      category_name,
      quantity_per_unit,
      cost,
      price,
      number_instock,
      number_onorder,
      reorder_level,
      description,
    });

    await newProduct.save();
    await db.disconnect();
  } catch (err) {
    return { error: "Failed to insert new product!" };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function updateProduct(formData) {
  try {
    console.log("product updates")
    const id = formData.get("id");
    const product_name = formData.get("product_name");    
    const slug = formData.get("slug");
    const category_id = formData.get("category_id");
    const category_name = formData.get("category_name"); 
    const quantity_per_unit = formData.get("quantity_per_unit"); 
    const cost = formData.get("cost");
    const price = formData.get("price");
    const number_instock = formData.get("number_instock");
    const number_onorder = formData.get("number_onorder");
    const reorder_level = formData.get("reorder_level");
    const description = formData.get("description"); 
    const isactive = formData.get("isactive");

    await db.connect();
    const productexists = await Product.findOne({ product_name: product_name });

    if (productexists) {
      if (productexists._id != id) {
        return  {error: `Product name "${product_name}"  already exists`};
      }
    }


    const query = {
      product_name,
      slug,
      category_id,
      category_name,
      quantity_per_unit,
      cost,
      price,
      number_instock,
      number_onorder,
      reorder_level,
      description,
      isactive,
    };    

    await Product.updateOne({ _id: id}, query);
    await db.disconnect();

    }
   catch (err) {
    return { error: err };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function deleteProduct(id) {
  try {
    await db.connect();
    await Product.findByIdAndDelete(id);
    await db.disconnect();
  } catch (err) {
    throw new Error("Failed to delete product!");
  }
  revalidatePath("/dashboard/products");
}
