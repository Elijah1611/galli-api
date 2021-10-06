import Faker from 'faker';
import { define } from "typeorm-seeding"
import { Comment } from "../../../entity/Comment";
import { Post } from '../../../entity/Post';
import { User } from '../../../entity/User';

interface Context {
  user: User
  post: Post
}

define(Comment, (faker: typeof Faker, { user, post }: Context) => {

    const content = faker.lorem.paragraph(3)
    
    const comment = new Comment()

    comment.content = content

    comment.user = user
    comment.post = post
    
    return comment
})