import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus, Inject} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: process.env.SECRET,
    });
  }

  public async validate(req, payload, done) {
    try {
      const isValid = await this.authService.validateUser(payload._id);

      if (!isValid) {
        return done(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED), false);
      }
      done(null, payload);
    } catch (e) {
      return done(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED), false);
    }
  }
}
