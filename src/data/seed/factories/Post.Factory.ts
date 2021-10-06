import Faker from 'faker';
import { define } from "typeorm-seeding"
import { Post } from "../../../entity/Post";
import { User } from '../../../entity/User';

interface Context {
    user: User;
}

define(Post, (faker: typeof Faker, { user }: Context) => {

    const image = faker.image.imageUrl(300, 300, null, true)
    const title = faker.company.companyName(0)
    
    const post = new Post()

    post.title = title
    post.image_url = image

    post.user = user
    
    return post
})