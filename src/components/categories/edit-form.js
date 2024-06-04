"use client";

import { updateCategory } from "@/actions/category-actions";
import { SaveCategoryBtn } from "@/components/categories/buttons";
import Link from "next/link";
import { toast } from "sonner";
import CheckboxDefault from "../Checkboxes/checkbox"

export default function CategoryEditForm({category, parentcategory}) {

  const _updateCategory = async (formData) => {
    const result = await updateCategory(formData);
    if (result?.error) {
      toast.error(result.error);
    } 
  };



  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
      <h3 className="font-medium text-black dark:text-white">
        Edit Category Form
      </h3>
    </div>
    <form action={_updateCategory} >
    <input type="hidden" name="id" defaultValue={category._id.toString()}/>
      <div className="p-6.5">
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Category name:
            </label>
            <input
              type="text"
              name="category_name"
              defaultValue={category.category_name}
              placeholder="Enter your first name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Parent category:
            </label>
            <select
              name="parent_category_id"
              defaultValue={category.parent_category_id.toString()}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="parent-category-error"
            >
              <option value="">
              </option>
              {parentcategory.map((pc) => (
                <option key={pc._id.toString()} value={pc._id.toString()}>
                  {pc.category_name}
                </option>
              ))}
            </select>

          </div>
        </div>
        <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Notes:
                  </label>
                  <textarea
                    rows={3}
                    name="notes"
                    defaultValue={category.notes}
                    placeholder="Type your notes here..."
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">    
          <div className="w-full xl:w-1/2">
          <CheckboxDefault  title="Is category active?" name="isactive" checked={category.isactive} />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/categories"
            className="flex h-10 items-center rounded-lg bg-gray-400 px-4 text-sm font-medium text-gray-100 transition-colors hover:bg-gray-500"
          >
            Cancel
          </Link>
          <SaveCategoryBtn/>
        </div>
      </div>
    </form>
  </div>

  );
}