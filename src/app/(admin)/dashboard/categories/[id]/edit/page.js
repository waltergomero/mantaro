import CategoryEditForm from "@/components/categories/edit-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import {fetchCategoryById, fetchParentCategories, } from '@/actions/category-actions'
import notFound from "./not-found";

export default async function CategoryEditPage({params}) {
  const id = params.id;
  
  const [category] = await Promise.all([fetchCategoryById(id)]);
  const parentcategory = await fetchParentCategories();

  if (!category) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Category", href: "/dashboard/categories" },
          {
            label: "Update Category Information",
            href: `/dashboard/categories/${id}/edit`,
            active: true,
          },
        ]}
      />
      <CategoryEditForm category={category} parentcategory={parentcategory}/>
    </main>
  );
}
