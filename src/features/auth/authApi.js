import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: "/auth/register",
                method: "POST",
                body: userData,
            }),
        }),
        getProfile: builder.query({
            query: () => "/auth/profile",
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery } =
    authApi;
