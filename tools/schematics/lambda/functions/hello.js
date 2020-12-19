import { Response } from '@digitalvilla/lambdas'

export const handler = async (event) => {
  console.log(event)
  try {
    const message = 'Hello Lambdas!'

    return Response.success({ message, event })
  } catch (error) {
    return Response.error(error)
  }
}
