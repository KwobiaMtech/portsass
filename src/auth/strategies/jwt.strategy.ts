import { Inject } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { GlobalConfig, globalConfig } from "src/config/global.config";

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt' ){
    constructor(
        @Inject(globalConfig.KEY) cfg: GlobalConfig
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: cfg.jwt.secret,
        })
    }

    async validate(payload: any){
        console.log('validate.payload', payload);
    }
}