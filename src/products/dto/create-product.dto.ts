import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CateroryRole } from "src/enums/category-enum";

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    productName: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    quantity: number

    @IsNotEmpty()
    @IsNumber()
    location: string

    @IsNotEmpty()
    @IsNumber()
    price: string

    @IsEnum(CateroryRole)
    @IsNotEmpty()
    @IsString()
    category: CateroryRole
}
