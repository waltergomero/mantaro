import CategoryCreateForm from "@/components/categories/create-form";
import {fetchParentCategories, } from '@/actions/category-actions'
import Breadcrumbs from "@/components/ui/breadcrumbs";

export default async function CategoryCreatePage() {
  const parentcategory = await fetchParentCategories();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Categories", href: "/dashboard/categories" },
          {
            label: "Add New Category",
            href: "/dashboard/categories/create",
            active: true,
          },
        ]}
      />
      <CategoryCreateForm parentcategory={parentcategory}/>
    </main>
  );
}
