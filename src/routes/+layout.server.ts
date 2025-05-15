export function load({ locals }) {

  console.log("========== /api/+layout.server.ts {method: load}: ", locals.user);
  const user = JSON.parse(locals.user)
  return {
    user: {
      username: user.username,
      email: user.email,
    }
  }
}
