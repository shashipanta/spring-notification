export function load({ locals }) {

  console.log("========== /api/+layout.server.ts {method: load}: ", locals?.user);
  return {
    user: {
      username: locals?.user?.username,
      email: locals?.user?.email,
    }
  }
}
