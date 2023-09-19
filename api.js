// import { createClient } from '@sanity/client';
import client from './sanity';

let sanityQuery = (query, params) => client.fetch(query, params);

export const getFeaturedRestaurants = () => {
  return sanityQuery(`
    *[_type=='featured'] {
        ...,
      restaurants[]-> {
        ...,
      dishes[]-> {
        ...
      },
      type-> {
        name
      }
      }
    }
  `);
};

export const getCategories = () => {
  return sanityQuery(`
    *[_type == 'category']
  `);
};

export const getFeaturedRestaurantById = (id) => {
  return sanityQuery(
    `
    *[_type == 'featured' && _id == $id] {
      ...,
      restaurant[]-> {
        ...,
        dishes[]->,
        type-> {
          name
        }
      }
    }[0]
  `,
    { id }
  );
};
