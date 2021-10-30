import { User } from "../../../entity/User"
import Faker from 'faker';
import { define } from "typeorm-seeding"


define(User, (faker: typeof Faker) => {

    const gender = Math.round(Math.random())
    const firstName = faker.name.firstName(gender)
    const lastName = faker.name.lastName(gender)
    const email = faker.internet.email(firstName, lastName)
    const username = faker.internet.userName(firstName)
    const password = faker.internet.password(6)
    const avatar = `https://ui-avatars.com/api/?name=${firstName}+${lastName}`

    const user = new User()

    user.first_name = firstName
    user.last_name = lastName
    user.username = username
    user.email = email
    user.password = password
    user.avatar_url = avatar

    return user
})