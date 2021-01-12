import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function IsLatLong(property: any, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isLatLong',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [property],
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            const [relatedPropertyName] = args.constraints;
            const relatedValue = (args.object as any)[relatedPropertyName];
            console.log(value)
            return value[0] >= -180 && value[0] <= 180 && value[1] >= -90 && value[1] <= 90;
          },
        },
      });
    };
  }