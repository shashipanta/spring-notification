export function load({ locals }) {

  console.log("========== /api/+layout.server.ts {method: load}: ", locals?.user);
  return {
    user: {
      id: locals?.user?.id,
      username: locals?.user?.username,
      email: locals?.user?.email,
      accessToken: locals?.authToken,
      avatar: locals?.user?.avatar,
    }
  }
}
