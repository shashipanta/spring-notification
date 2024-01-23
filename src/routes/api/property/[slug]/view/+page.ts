import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  console.log("Slug params ", params.slug);
  let propertyId = params.slug;

  return { propertyId };
};
