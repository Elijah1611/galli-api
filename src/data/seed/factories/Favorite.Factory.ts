import Faker from 'faker';
import { define } from "typeorm-seeding"
import { Favorite } from "../../../entity/Favorite";
import { Post } from '../../../entity/Post';
import { Reaction } from '../../../entity/Reaction';
import { User } from '../../../entity/User';

interface Context {
    user: User
    post: Post
}

define(Favorite, (faker: typeof Faker, { user, post }: Context) => {

    const favorite = new Favorite()

    favorite.reaction = Reaction.LOVE
    
    favorite.user = user
    favorite.post = post

    return favorite
})