import { IsOptional, IsString } from "class-validator";

export class GetAvailableUsersDto {
    @IsOptional()
    @IsString()
    search?: string;
}