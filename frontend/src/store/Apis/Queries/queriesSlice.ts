import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

// Function to determine the base URL dynamically
const getApi = () => {
  if (window.location.pathname.startsWith("/player")) {
    return import.meta.env.VITE_DEFAULT_API;
  }
  return import.meta.env.VITE_ADMIN_API;
};

// Create the API slice
export const querySlice = createApi({
  reducerPath: 'querySlice',
  baseQuery: async (args, api, extraOptions) => {
    const dynamicBaseUrl = getApi();
    
    // Set up the base query with the dynamic base URL
    const baseQueryWithDynamicUrl = fetchBaseQuery({
      baseUrl: dynamicBaseUrl,
      prepareHeaders: (headers) => {
        const token = Cookies.get("authToken");
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Content-Type', 'application/json');
        return headers;
      },
    });

    // Execute the query
    return baseQueryWithDynamicUrl(args, api, extraOptions);
  },
  endpoints: (builder) => ({
    getQueryApi: builder.query({
      query: ({ name, ajax }) => `${name}?${ajax}`,
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetQueryApiQuery } = querySlice;
