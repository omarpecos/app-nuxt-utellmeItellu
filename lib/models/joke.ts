import { Expose } from 'class-transformer'

export class Joke {
  @Expose() title: String
  @Expose() text: String[]
  @Expose() country: String
  @Expose() lang: String
  @Expose() createdAt?: Date
  @Expose() updatedAt?: Date
}
