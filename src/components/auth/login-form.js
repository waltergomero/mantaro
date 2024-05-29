'use client';

import { authenticate } from '@/actions/user-actions';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useFormState, useFormStatus } from 'react-dom';


import Link from 'next/link';

const LoginForm = () => {

  //const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  async function onSubmit(event) {
    event.preventDefault();
    try {
        const formData = new FormData(event.currentTarget);

        const response = await doCredentialLogin(formData);

        if (!!response.error) {
            console.error(response.error);
            setError(response.error.message);
        } else {
            router.push("/home");
        }
    } catch (e) {
        console.error(e);
        setError("Check your Credentials");
    }
}

  return (
    <form onSubmit={onSubmit}>
    <div className="p-6.5">
        <div className="mb-4">
            <label className="block text-sm font-medium text-black dark:text-white">Email:</label>
            <div className="relative">
            <input
                 id="email"
                 type="email"
                 name="email"
                 placeholder="Enter your email address"
                 required
                className="w-full rounded border-[1.5px] pl-10  border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-black dark:text-white">Password:</label>
            <div className="relative">
            <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
                className="w-full rounded border-[1.5px] pl-10  border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"/>
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        </div>
        <div className="mb-5.5 mt-5 flex items-center justify-between">
      <label htmlFor="formCheckbox" className="flex cursor-pointer">
        <div className="relative pt-0.5">
          <input
            type="checkbox"
            id="formCheckbox"
            className="taskCheckbox sr-only"
          />
          <div className="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark">
            <span className="text-white opacity-0">
              <svg
                className="fill-current"
                width="10"
                height="7"
                viewBox="0 0 10 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z"
                  fill=""
                />
              </svg>
            </span>
          </div>
        </div>
        <p>Remember me</p>
      </label>

      <Link href="#" className="text-md text-blue-500 hover:underline">
        You don't have an account?
      </Link>
    </div>
    <div className='mt-10'>
    <button type="submit" className="flex w-full justify-center rounded bg-blue-500 p-3 font-medium text-gray hover:bg-opacity-90">
      Sign In
    </button>
    </div>
    {/* <div className="flex h-8 items-end space-x-1 mt-2" aria-live="polite" aria-atomic="true" >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-6 w-6 text-danger" />
              <p className="text-md text-danger">{errorMessage}</p>
            </>
          )}
        </div> */}
        </div>
    </form>
  )
}

export default LoginForm;