import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4444',
    prepareHeaders: (headers, { getState }) => {
      headers.set('authorization', window.localStorage.getItem('token'))
      return headers
    },
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
    }),
    getTags: builder.query({
      query: () => 'tags',
    }),
    getOnePost: builder.query({
      query: (id = '') => `/posts/${id}`,
    }),
    getAuthMe: builder.query({
      query: () => '/auth/me',
    }),
    signIn: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetTagsQuery,
  useGetOnePostQuery,
  useSignInMutation,
  useGetAuthMeQuery,
} = api
