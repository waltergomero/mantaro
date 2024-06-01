import { UpdateUser, DeleteUser } from '@/components/users/buttons';
import { fetchFilteredUsers } from '@/actions/user-actions';
import { Fragment } from 'react';

export default async function UsersTable({ query, currentPage }) {
  const users = await fetchFilteredUsers(query, currentPage);

  return (
    <Fragment>
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-2">
    <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Users
        </h4>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Last Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                First
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Is Admin?
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Is Active
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
          {users &&
                users?.map((user) => (
              <tr key={user._id.toString()}>
                <td className="border-b border-[#eee] px-4 py-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {user.last_name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {user.first_name}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {user.email}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                  {user.isadmin ? 'Yes' : 'No'}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                  {user.isactive ? 'Yes' : 'No'}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <UpdateUser id={user._id.toString()}/>
                    <DeleteUser id={user._id.toString()}/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </Fragment>
  );
}