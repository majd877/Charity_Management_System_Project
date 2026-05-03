import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const mutationsPostSlice = createApi({
  reducerPath: 'mutationsPostSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_ADMIN_API,
  }),
  tagTypes: ['AdminCreate'],
  endpoints: (build) => ({
    create: build.mutation({
      query: ({ method, endpoint, formData }) => ({
        url: endpoint,
        method,
        body: formData, // Use FormData directly
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${Cookies.get("authToken")}`, // Fixed the typo here
          // No Content-Type needed; the browser handles it with FormData
        },
      }),
    }),
  }),
});

export const { useCreateMutation } = mutationsPostSlice;
export default mutationsPostSlice;
