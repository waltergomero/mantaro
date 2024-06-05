"use client";

import { updateStatus } from "@/actions/status-actions";
import { SaveStatusBtn } from "@/components/status/buttons";
import Link from "next/link";
import { toast } from "sonner";
import CheckboxDefault from "../Checkboxes/checkbox"

export default function UserEditForm({status, statustypeid}) {

const _updateStatus = async (formData) => {
  const result = await updateStatus(formData);
  if (result?.error) {
    toast.error(result.error);
  } 
};


  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
      <h3 className="font-medium text-black dark:text-white">
        Edit Status Form
      </h3>
    </div>
    <form action={_updateStatus} >
    <input type="hidden" name="id" defaultValue={status._id.toString()}/>
      <div className="p-6.5">
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Status name:
            </label>
            <input
              type="text"
              name="status_name"
              defaultValue={status.status_name}
              placeholder="Enter your first name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Status type id:
            </label>
            <select
              name="status_type_id"
              defaultValue={status.status_type_id}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 px-5 py-3 pl-10 text-md outline-2 placeholder:text-gray-500">
              <option value="" disabled>
              </option>
                  {statustypeid}
            </select>

          </div>
        </div>

        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">    
          <div className="w-full xl:w-1/2">
          <CheckboxDefault  title="Is status active?" name="isactive" checked={status.isactive} />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/status"
            className="flex h-10 items-center rounded-lg bg-gray-400 px-4 text-sm font-medium text-gray-100 transition-colors hover:bg-gray-500"
          >
            Cancel
          </Link>
          <SaveStatusBtn/>
        </div>
      </div>
    </form>
  </div>

  );
}