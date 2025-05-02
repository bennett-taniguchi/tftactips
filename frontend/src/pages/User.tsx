import { useAuth0 } from "@auth0/auth0-react";

export default function User() {
  const { user } = useAuth0();

  if (!user) return <div>You are not logged in, please login!</div>;
  if (user) return <div className="text-white text-4xl">{user.given_name} {user.family_name}</div>;
}
