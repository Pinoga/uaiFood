import { ArrayMaxSize, ArrayMinSize, IsEmail, Length } from 'class-validator';
import { Field, ObjectType, ID, InputType } from 'type-graphql'
import { Item, ItemInput } from './item'

//Schema do restaurante que será retornado pela API
@ObjectType()
export class Restaurant {

    @Field(type => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    cuisineType: string;
    
    @Field()
    city: string;
    
    @Field(type => [Number])
    location: number[];
    
    //Restaurante pode ter uma array vazia como campo item
    @Field(type => [Item], {nullable: "items"})
    items: Item[];
}

//Schema do restaurante que a API recebe do cliente
//Validações simples para todos os campos
@InputType()
export class RestaurantInput {

    @Field()
    @Length(1, 50)    
    name: string;
    
    @Field()
    @Length(1, 50)
    cuisineType: string;
    
    @Field()
    @Length(1, 50)
    city: string;
    
    @Field(type => [Number])
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    location: number[];

    @Field(type => [ItemInput], {nullable: true})
    items: string[];
}