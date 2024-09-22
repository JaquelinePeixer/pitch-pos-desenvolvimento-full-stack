import { Expose } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UsuarioRequest {
    @IsOptional()
    @IsString()
    @Expose()
    name?: string;
  
    @IsOptional()
    @IsBoolean()
    @Expose()
    delayedUsers?: boolean;
}