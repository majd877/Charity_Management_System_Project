import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const shearQuery = createApi({
  reducerPath: 'shearQuery',
  baseQuery: fetchBaseQuery({ baseUrl:import.meta.env.VITE_SHEAR_API }),
  endpoints: (builder) => ({
    getQueryShear: builder.query({
      query: ({name,ajax}) => `${name}?${ajax}`,
      
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetQueryShearQuery } = shearQuery