import { cookies } from "next/headers";

export const fetchFromServer = async (isRefresh: boolean = false) => {
  const getAccessToken = async () => {
    const cookie = (await cookies()).get("access_token")?.value;
    return cookie;
  };
  const getRefreshToken = async () => {
    const cookie = (await cookies()).get("refresh_token")?.value;
    return cookie;
  };
  try {
    const res = await fetch("/something", {
      headers: {
        Cookie: isRefresh
          ? `refresh_token=${await getRefreshToken()}`
          : `access_token=${await getAccessToken()}`,
      },
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  } catch (error) {
    if (error.status == 401) {
      // Handle token expiration or unauthorized access
      const newTokens = await getRefreshToken();
      if (newTokens) {
        // Retry the original request with the new tokens
        return fetchFromServer(isRefresh);
      }
    }
    console.error("Error fetching from server:", error);
    throw error;
  }
};
