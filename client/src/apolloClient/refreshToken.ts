import { refreshTokenMutation } from "./querys";
import { client } from "./ApolloClient";

export const refreshAccessToken = async () => {
    const token = localStorage.getItem("refreshToken");

    if (!token) return null;

    try {
        const { data } = await client.mutate<{ refreshToken: { accessToken: string; refreshToken: string } }>({
            mutation: refreshTokenMutation,
            variables: { token: token },
        });

        if (data?.refreshToken) {
            const tokens = data.refreshToken;
            localStorage.setItem("accessToken", tokens.accessToken);
            localStorage.setItem("refreshToken", tokens.refreshToken);
            return tokens.accessToken;
        }
    } catch (error) {
        console.error("refresh token failed", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }

    return null;
};