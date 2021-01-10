import { ItemInput, Item, ItemInputOptional } from './../schema/item';
import { Field, ID, Mutation, Query, Resolver, ArgsType, Args } from "type-graphql";
import ItemService from "../services/item";

@ArgsType()
export class CreateItemArgs {

    @Field(type => ItemInput)
    item: ItemInput;

    @Field(type => ID)
    restaurantId: string;

}

@ArgsType()
export class UpdateItemArgs {

    @Field(type => ID)
    restaurantId: string;

    @Field(type => ID)
    itemId: string;

    @Field(type => ItemInputOptional)
    newData: ItemInputOptional;
}

//Definição dos resolvers relacionados a um item
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
