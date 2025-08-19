import { useUser } from "../context/UserContext";
export async function getCurrentUser() {
  // const { user, setUser } = useUser();
  try {
    const res = await fetch("/api/me", { credentials: "include" });

    if (!res.ok) {
      console.error("API /me failed:", res.status);
      return null;
    }
    console.log("res from getCurrentUser", res);
    const data = await res.json();
    // console.log("res", data.user);
    console.log("data from getCurrentUser", data);
    console.log("user from getCurrentUser", data.user);
    // setUser(data.user);

    if (!data.success) return null;

    console.log("data is kalu", data);
    return data.user;   // return only user object
  } catch (err) {
    console.error("getCurrentUser error:", err);
    return null;
  }
}