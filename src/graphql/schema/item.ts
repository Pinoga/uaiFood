import { Length, Min } from 'class-validator';
import { Field, ObjectType, ID, InputType, Float } from 'type-graphql'

//Schema do item que será retornado pela API
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

//Schema do item que a API recebe do cliente
//Validações simples para todos os campos
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

//Schema auxiliar para incluir o caso da Mutation updateItem, onde 
//qualquer campo do item é opcional
//TODO: Utilizar apenas um Schema para os dois casos para evitar duplicidade de código
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