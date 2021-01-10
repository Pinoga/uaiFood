import { Length, Min } from 'class-validator';
import { Field, ObjectType, ID, InputType, Float } from 'type-graphql'

@ObjectType()
export class Item {

    @Field(type => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    cuisineType: string;

    @Field(type => Float)
    price: number;
}

@InputType()
export class ItemInput {

    @Field()
    @Length(1, 50)    
    name: string;

    @Field()
    @Length(1, 50)
    cuisineType: string;

    @Field(type => Float)
    @Min(0)
    price: number;
}

@InputType()
export class ItemInputOptional {

    @Field({nullable: true})
    @Length(1, 50)    
    name: string;

    @Field({nullable: true})
    @Length(1, 50)    
    cuisineType: string;

    @Field(type => Float, {nullable:  true})
    @Min(0)
    price: number;
}