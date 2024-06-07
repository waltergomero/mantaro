"use client";

import { useState} from "react";
import { updateProduct } from "@/actions/product-actions";
import { addImage } from "@/actions/image-actions";
import { SaveProductBtn, SaveImageBtn } from "@/components/products/buttons";
import Link from "next/link";
import { toast } from "sonner";
import CheckboxDefault from "../Checkboxes/checkbox";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { TrashIcon,} from "@heroicons/react/24/outline";
import Compressor from "compressorjs";


export default function CategoryEditForm({product, categories}) {


  const [productid, setProductid] = useState(product._id.toString());
  const [CategoryValue, setCategoryValue] = useState(product.category_name);
  
  const _updateProduct = async (formData) => {
    const result = await updateProduct(formData);
    if (result?.error) {
      toast.error(result.error);
    } 
  };

  const handleClick = e => {
    e.preventDefault();
    const dropdownName = e.target.options[e.target.selectedIndex].text;
    setCategoryValue(dropdownName);
  };

  //iamages
  const [selectedFiles, setSelectedFiles] = useState(null);

  const uploadImagesHandler = (e) =>{
    setSelectedFiles(Array.from(e.target.files))
  }


 function removeSelectedImage(_name){
    setSelectedFiles(image => image.filter(x => x.name != _name))
  };

 function onSubmit(data) {
    if (selectedFiles != null) {
      selectedFiles && selectedFiles?.map((image, index) => {
      console.log(image);
        const ext = image.name.substr(image.name.lastIndexOf(".") + 1);    
        new Compressor(image, {
          quality: 0.9, // 0.6 can also be used, but its not recommended to go below.
          maxWidth: 1290,
          maxHeight: 1290,
          success: (result) => {
            console.log(result);
            const formdata = new FormData();
            formdata.append("product_id", productid);
            formdata.append("image", result);
            formdata.append("extension", ext);
            //axios.post("/api/admin/gallery/add", formdata);
            addImage(formdata);
          },
        });      
      });
    } 
    else {
      setErrorMessage(true);
    }
   // return router.push("/admin/gallery");

  }

  return (
    <>

<Tabs>
  <TabList>
    <Tab>Product</Tab>
    <Tab>Images</Tab>
  </TabList>
  <TabPanel>
  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="border-b border-stroke px-6.5 dark:border-strokedark">
      <h3 className="font-medium text-black dark:text-white pt-4 pb-2">
        New Product Form
      </h3>
    </div>
    <form action={_updateProduct} >
    <input type="hidden" name="id" defaultValue={product._id.toString()}/>
    <input type="hidden" name="category_name" defaultValue={CategoryValue}/>
      <div className="p-6.5">
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Product name:
            </label>
            <input
              type="text"
              name="product_name"
              defaultValue={product.product_name}
              placeholder="Enter product name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Slug (code name):
            </label>
            <input
              type="text"
              name="slug"
              defaultValue={product.slug}
              placeholder="Enter product code name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Category:
            </label>
            <select
              name="category_id"
              defaultValue={product.category_id.toString()}
              onClick={handleClick}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 px-5 py-3 text-sm outline-2 placeholder:text-gray-500">
              <option value=""></option>
              {categories.map((category) => (
                <option key={category._id.toString()} value={category._id.toString()}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Quantity per unit:
            </label>
            <input
              type="text"
              name="quantity_per_unit"
              defaultValue={product.quantity_per_unit}
              placeholder="Enter quantity per unit"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

        </div>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Cost:
            </label>
            <input
              type="number"
              name="cost"
              step="0.01"
              defaultValue={product.cost}
              placeholder="Enter cost of the product"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Price:
            </label>
            <input
              type="number"
              name="price"
              step="0.01"
              defaultValue={product.price}
              placeholder="Enter price to sell the product"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/3">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              In Stock:
            </label>
            <input
              type="number"
              name="number_instock"
              step="0.01"
              defaultValue={product.number_instock}
              placeholder="Enter number of product in stock"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="w-full xl:w-1/3">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              On Order:
            </label>
            <input
              type="number"
              name="number_onorder"
              step="0.01"
              defaultValue={product.number_onorder}
              placeholder="Enter number of product on order"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="w-full xl:w-1/3">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Reorder level:
            </label>
            <input
              type="number"
              name="reorder_level"
              step="0.01"
              defaultValue={product.reorder_level}
              placeholder="Enter reorder level of the product"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-2/3">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Description:
                  </label>
                  <textarea
                    rows={2}
                    name="description"
                    defaultValue={product.description}
                    placeholder="Type your notes here..."
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
          </div>
          <div className="w-full xl:w-1/3">
            <div className="pt-8 pl-3"><CheckboxDefault  title="Is product active?" name="isactive" checked={product.isactive}/></div>
          </div>
        </div>

    <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/products"
            className="flex h-10 items-center rounded-lg bg-gray-400 px-4 text-sm font-medium text-gray-100 transition-colors hover:bg-gray-500"
          >
            Cancel
          </Link>
          <SaveProductBtn/>
        </div>
      </div>
    </form>
  </div>
  </TabPanel>
  <TabPanel>
  <form onSubmit={onSubmit}>
  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="border-b border-stroke px-6.5 dark:border-strokedark">
      <h3 className="font-medium text-black dark:text-white pt-4 pb-2">
        Images
      </h3>
    </div>
    <div className="p-6.5">
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/5">

                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Attach file
                </label>
                <input
                  type="file"
                  name="fileupload"
                  required 
                  multiple
                  onChange={uploadImagesHandler}
                  className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                />

          </div>
          <div className="w-full xl:w-4/5">
          <div className="flex gap-2">  
              {selectedFiles && selectedFiles?.map((file,index) => (             
                <div className="relative" key={index}>
                            <img  
                              className="rounded-md"
                              width="150"
                              data-key={file.name}                              
                              src={URL.createObjectURL(file)} alt="uploaded Images" />  
                  <button className="absolute top-0 right-0 rounded-md "  onClick={() => removeSelectedImage(file.name)}><TrashIcon className="w-6 h-8 text-rose-500"/></button> 
                  </div>                                                                                                                                                          
                ))}
              </div>

          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/products"
            className="flex h-10 items-center rounded-lg bg-gray-400 px-4 text-sm font-medium text-gray-100 transition-colors hover:bg-gray-500"
          >
            Cancel
          </Link>
          <SaveImageBtn/>
        </div>
      </div>
  </div>
  </form>
  </TabPanel>

</Tabs>


    </>

  );
}

