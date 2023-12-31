import { createClient } from '@sanity/client';
import imageBuilder from '@sanity/image-url';

const client = createClient({
  projectId: '5bizy30j',
  dataset: 'production',
  apiVersion: '2022-02-01',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  // ignoreBrowserTokenWarning: true,
});

export default client;

const builder = imageBuilder(client);

export const urlFor = (source) => builder.image(source);
