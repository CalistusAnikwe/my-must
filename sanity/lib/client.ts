import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  /* Change useCdn to false for Auth. 
     The Sanity Adapter needs to fetch the most recent session/user data 
     without waiting for the cache to refresh.
  */
  useCdn: false, 
  /* The 'token' is required for NextAuth to create/update users in Sanity.
     Make sure SANITY_API_TOKEN is added to your .env.local file.
  */
  token: process.env.SANITY_API_TOKEN,
})