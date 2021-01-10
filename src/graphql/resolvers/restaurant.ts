import { ArgsType, Field, Query, Resolver, Args, Arg, Mutation, InputType, Int } from "type-graphql";
import { Restaurant, RestaurantInput } from "../schema/restaurant";
import RestaurantService from '../services/restaurant'

@InputType()
class DistanceInput {
    
    @Field(type => [Int])
    center: number[]

    @Field(type => [Int])
    radius: number
}


@ArgsType()
export class RestaurantsArgs {
    
    @Field(type => String, {nullable: true})
    city?: string;

    @Field(type => DistanceInput, {nullable: true})
    distance?: DistanceInput;

    @Field(type => String, {nullable: true})
    cuisineType?: string;

    @Field(type => String, {nullable: true})
    itemRelated?: string;
}

@Resolver(Restaurant)
export class RestaurantResolver {

    @Query(returns => [Restaurant], {nullable: "items"})
    restaurants(@Args() args: RestaurantsArgs) {
        console.log(args)
        return RestaurantService.restaurants(args)
    }

    @Mutation(returns => Restaurant, {nullable: true})
    createRestaurant(@Arg("restaurant") restaurant: RestaurantInput) {
        return RestaurantService.createRestaurant(restaurant)
    }
}

