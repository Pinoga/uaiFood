import { Model, model } from 'mongoose';

import ItemSchema, { IItem } from './item';
import RestaurantSchema, { IRestaurant } from './restaurant';

//Exportação dos modelos do Mongoose
export const Item = model<IItem>('item', ItemSchema);
export const Restaurant = model<IRestaurant>('restaurant', RestaurantSchema);