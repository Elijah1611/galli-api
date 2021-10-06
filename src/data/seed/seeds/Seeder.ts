import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Favorite } from "../../../entity/Favorite";
import { Post } from "../../../entity/Post";
import { User } from "../../../entity/User";
import { Comment } from '../../../entity/Comment'

export default class AppSeeder implements Seeder {

    public async run(factory: Factory, connection: Connection): Promise<void> {

        const authorUser = await factory(User)().create()

        const otherUsers = await factory(User)().createMany(2)
        console.log(authorUser)
        const post = await factory(Post)({ user: authorUser }).create()

        for (const user of otherUsers) {
            const comment = await factory(Comment)({ user, post }).create()
            const favorite = await factory(Favorite)({ user, post }).create()

            post.comments = [comment]
            post.favorites = [favorite]
        }

        
    }
}