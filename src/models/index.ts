import { model } from 'mongoose';

import CuisineSchema from './cuisine';
import ItemSchema from './item';
import RestaurantSchema from './restaurant';

export const Cuisine = model('cuisine', CuisineSchema);
export const Item = model('item', ItemSchema);
export const Restaurant = model('restaurant', RestaurantSchema);