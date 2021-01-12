import { ItemInput, Item, ItemInputOptional } from './../schema/item';
import { Field, ID, Mutation, Query, Resolver, ArgsType, Args } from "type-graphql";
import ItemService from "../services/item";
import { IsMongoId, ValidateNested } from 'class-validator';

//Argumentos da mutation createItem
@ArgsType()
export class CreateItemArgs {

    @Field(type => ItemInput)
    item: ItemInput;

    @Field(type => ID)
    @IsMongoId({message: "Formato de ID incorreto"})
    restaurantId: string;

}

//Argumentos da mutation updateItem
@ArgsType()
export class UpdateItemArgs {

    @Field(type => ID)
    @IsMongoId({message: "Formato de ID incorreto"})
    restaurantId: string;

    @Field(type => ID)
    @IsMongoId({message: "Formato de ID incorreto"})
    itemId: string;

    @ValidateNested()
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
    createItem(@Args({validate: true}) args: CreateItemArgs) {
        return ItemService.createItem(args);
    }

    @Mutation(returns => Item, {nullable: true})
    updateItem(@Args({validate: true}) args: UpdateItemArgs ) {
        return ItemService.updateItem(args);
    }
}
