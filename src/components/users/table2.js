import Image from 'next/image';
import { UpdateUser, DeleteUser } from '@/components/users/buttons';
import { fetchFilteredUsers } from '@/actions/user-actions';
import { Fragment } from 'react';

export default async function UsersTable({ query, currentPage }) {
  const users = await fetchFilteredUsers(query, currentPage);

  return (
    <Fragment>
      <div className="mt-2 flow-root border">
        <div className="inline-block min-w-full align-middle">
          <div className=" md:pt-0">
            <div className="md:hidden">
              {users &&
                users?.map((user) => (
                  <div
                    key={user._id.toString()}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <Image
                            src="/user-icon.png"
                            className="mr-2 rounded-full"
                            width={28}
                            height={28}
                            alt={`${user.first_name}'s profile picture`}
                          />
                          <p>{user.last_name + ' ' + user.first_name}</p>
                        </div>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                      <div className="flex justify-end gap-2">
                        <UpdateUser id={user._id.toString()} />
                        <DeleteUser id={user._id.toString()} />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <table className="hidden min-w-full rounded-md border border-gray-200 bg-gray-200 text-gray-900 md:table">
              <thead className="rounded-md text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-4 font-medium sm:pl-6">
                    Last Name
                  </th>
                  <th scope="col" className="px-4 py-4 font-medium sm:pl-6">
                    First Name
                  </th>
                  <th scope="col" className="px-3 py-4 font-medium">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-4 font-medium">
                    isAdmin?
                  </th>
                  <th scope="col" className="px-3 py-4 font-medium">
                    isActive
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {users &&
                  users?.map((user) => (
                    <tr
                      key={user._id.toString()}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                          <Image
                            src="/user-icon.png"
                            className="rounded-full"
                            width={28}
                            height={28}
                            alt={`${
                              user.last_name + ' ' + user.first_name
                            }'s profile picture`}
                          />
                          <p>{user.last_name} </p>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-3 py-1 text-sm">
                        {user.first_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-1 text-sm">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-1 text-sm">
                        {user.isAdmin ? 'Yes' : 'No'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-1 text-sm">
                        {user.isActive ? 'Yes' : 'No'}
                      </td>
                      <td className="whitespace-nowrap py-1 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateUser id={user._id.toString()} />
                          <DeleteUser id={user._id.toString()} />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </Fragment>
  );
}