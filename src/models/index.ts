import { Model, model } from 'mongoose';

import ItemSchema, { IItem } from './item';
import RestaurantSchema, { IRestaurant } from './restaurant';

<<<<<<< HEAD
//Exportação dos modelos do Mongoose
=======
>>>>>>> d422cba40e86277677cca1f6291e415cd6526a3a
export const Item = model<IItem>('item', ItemSchema);
export const Restaurant = model<IRestaurant>('restaurant', RestaurantSchema);