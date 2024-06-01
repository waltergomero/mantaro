import UserCreateForm from "@/components/users/create-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export default async function UserCreatePage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Users", href: "/dashboard/users" },
          {
            label: "Create User",
            href: "/dashboard/users/create",
            active: true,
          },
        ]}
      />
      <UserCreateForm />
    </main>
  );
}