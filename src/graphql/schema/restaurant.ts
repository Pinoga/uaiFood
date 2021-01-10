import { ArrayMaxSize, ArrayMinSize, IsEmail, Length } from 'class-validator';
import { Field, ObjectType, ID, InputType } from 'type-graphql'
import { Item, ItemInput } from './item'

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
    
    @Field(type => [Item], {nullable: "items"})
    items: Item[];
}

@InputType()
export class RestaurantInput {

    // @Field()
    // @IsEmail()
    // email: string;

    // @Field()
    // @Length(1, 10)
    // password: string;    

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