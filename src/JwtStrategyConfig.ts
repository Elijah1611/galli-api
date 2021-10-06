import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import { getConnection } from 'typeorm';
import { User } from './entity/User';

export const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET || "dragonball",
}

const jwtStrategy = new JwtStrategy(options, async (jwt_payload, done) => {
    try {
        const db = await getConnection(process.env.CONNECTION).getRepository(User)

        const user = await db.findOne({ id: jwt_payload.id })

        if (user)
            return done(null, user);
        else
            return done(null, false);
    }
    catch (error) {
        return done(error, false)
    }
});

export default jwtStrategy