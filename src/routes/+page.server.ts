import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {

    // If the user is not logged in, redirect to dashboard
    if (!locals.user) {
        throw redirect(302, "/api/dashboard");
    }

    return {};
    
}