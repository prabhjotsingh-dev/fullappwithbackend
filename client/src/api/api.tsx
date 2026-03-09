import type { ILogin, UserDetails } from "@/assets/Types";
import axios from "axios";

export const apiUrl = "https://dummyjson.com/";

const userLogin = async ({ username, password }: { username: string; password: string }): Promise<ILogin> => {
  const data = await axios.post(
    `${apiUrl}user/login`,
    { username: username, password: password },
    { headers: { "Content-Type": "application/json" } },
  );
  return data.data;
};

const GetUserDetails = async (accessToken: string, refreshToken: string): Promise<UserDetails> => {
  const data = await axios.get(`${apiUrl}auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (data === null || data === undefined) {
    const response = await axios.post(
      `${apiUrl}auth/refresh`,
      {
        refreshToken: refreshToken,
      },
      { headers: { "Content-Type": "application/json" } },
    );

    return response.data;
  }

  return data.data;
};

const GetUserTodos = async (userId: number) => {
  if (userId === null || userId === undefined) {
    throw new Error("Invalid userId");
  }
  const data = await axios.get(`${apiUrl}users/${userId}/todos`);

  return data.data;
};

export { GetUserDetails, GetUserTodos, userLogin };
