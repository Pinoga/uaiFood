import { ItemInput, Item, ItemInputOptional } from './../schema/item';
import { Field, ID, Mutation, Query, Resolver, ArgsType, Args } from "type-graphql";
import ItemService from "../services/item";

<<<<<<< HEAD
=======
//Argumentos da mutation createItem
>>>>>>> tmp
@ArgsType()
export class CreateItemArgs {

    @Field(type => ItemInput)
    item: ItemInput;

    @Field(type => ID)
    restaurantId: string;

}

<<<<<<< HEAD
=======
//Argumentos da mutation updateItem
>>>>>>> tmp
@ArgsType()
export class UpdateItemArgs {

    @Field(type => ID)
    restaurantId: string;

    @Field(type => ID)
    itemId: string;

    @Field(type => ItemInputOptional)
    newData: ItemInputOptional;
}

<<<<<<< HEAD
=======
//Definição dos resolvers relacionados a um item
>>>>>>> tmp
@Resolver(Item)
export class ItemResolver {

    @Query(returns => [Item], {nullable: "items"})
    items() {
        return ItemService.items();
    }

    @Mutation(returns => Item, {nullable: true})
    createItem(@Args() args: CreateItemArgs) {
        return ItemService.createItem(args);
    }

    @Mutation(returns => Item, {nullable: true})
    updateItem(@Args() args: UpdateItemArgs) {
        return ItemService.updateItem(args);
    }
}
