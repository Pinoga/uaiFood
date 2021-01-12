import { IsNumber, Length, Min, ValidateNested, registerDecorator, ValidationOptions, ValidationArguments, ArrayMinSize, ArrayMaxSize } from "class-validator";
import { ArgsType, Field, Query, Resolver, Args, Arg, Mutation, InputType, Int } from "type-graphql";
import { Restaurant, RestaurantInput } from "../schema/restaurant";
import RestaurantService from '../services/restaurant'
import { IsLatLong } from "../validators/IsLatLong";



//Schema auxiliar para o input das coordenadas e raio de proximidade
@InputType()
class DistanceInput {
    
    @Field(type => [Int])
    @ArrayMinSize(2, {message: "O centro deve possuir apenas duas coordenadas"})
    @ArrayMaxSize(2, {message: "O centro deve possuir apenas duas coordenadas"})
    @IsNumber({}, {each: true, message: "Coordenadas devem ser números" })
    @IsLatLong({}, {message: "Longitude deve estar entre [-180, 180] e Latitude deve estar entre [-90, 90]"})
    center: number[]

    @Field(type => Int)
    @IsNumber()
    @Min(0, {message: "O raio não pode ser negativo"})
    radius: number
}


//Argumentos da Query restaurants
@ArgsType()
export class RestaurantsArgs {
    
    @Field(type => String, {nullable: true})
    @Length(1, 50, {message: "A cidade não pode ser vazia, e deve possuir no máximo 50 caracteres"})
    city?: string;

    @Field(type => DistanceInput, {nullable: true})
    @ValidateNested()
    distance?: DistanceInput;

    @Field(type => String, {nullable: true})
    @Length(1, 50, {message: "O tipo de cozinha não pode ser vazio, e deve possuir no máximo 50 caracteres"})
    cuisineType?: string;


    @Field(type => String, {nullable: true})
    @Length(1, 50, {message: "O termo relacionado não pode ser vazio, e deve possuir no máximo 50 caracteres"})
    itemRelated?: string;
}

//Definição dos resolvers relacionados a um restaurante
@Resolver(Restaurant)
export class RestaurantResolver {

    @Query(returns => [Restaurant], {nullable: "items"})
    restaurants(@Args({validate: true}) args: RestaurantsArgs) {
        console.log(args)
        return RestaurantService.restaurants(args)
    }

    @Mutation(returns => Restaurant, {nullable: true})
    createRestaurant(@Arg("restaurant", {validate: true}) restaurant: RestaurantInput) {
        return RestaurantService.createRestaurant(restaurant)
    }
}

