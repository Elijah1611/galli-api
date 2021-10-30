import { EntitySubscriberInterface, EventSubscriber, LoadEvent } from 'typeorm';
import { Post } from '../entity/Post';
import { User } from '../entity/User'

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

  public listenTo(): string | Function {
    return User;
  }

  public async afterLoad(entity: User, event: LoadEvent<User>) {
    const posts = await event.manager.getRepository(Post).find({ where: { user_id: entity.id }, relations: ['favorites'] })

    if (posts.length < 1) return null
    const totalHearts = posts.map(post => post.favorites.length).reduce((total, curr) => total + curr, 0)

    return await event.manager.getRepository(User).update(entity.id, { total_hearts: totalHearts })
  }
}