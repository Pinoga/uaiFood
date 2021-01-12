import { ArrayMaxSize, ArrayMinSize, IsNumber, Length } from 'class-validator';
import { Field, ObjectType, ID, InputType, Int, Float } from 'type-graphql'
import { IsLatLong } from '../validators/IsLatLong';
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
    

    @Field(type => [Float])    
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
    @Length(1, 50, {message: "O nome do restaurante não pode ser vazio, e deve possuir no máximo 50 caracteres"})    
    name: string;
    
    @Field()
    @Length(1, 50, {message: "O tipo de cozinha não pode ser vazio, e deve possuir no máximo 50 caracteres"})
    cuisineType: string;
    
    @Field()
    @Length(1, 50, {message: "O nome da cidade não pode ser vazia, e deve possuir no máximo 50 caracteres"})
    city: string;
    
    @Field(type => [Float])
    @ArrayMinSize(2, {message: "O local deve possuir duas coordenadas"})
    @ArrayMaxSize(2, {message: "O local deve possuir duas coordenadas"})
    @IsNumber({}, {each: true, message: "Coordenadas devem ser números" })
    @IsLatLong({}, {message: "Longitude deve estar entre [-180, 180] e Latitude deve estar entre [-90, 90]"})
    location: number[];

    @Field(type => [ItemInput], {nullable: true})
    items?: ItemInput[];
}