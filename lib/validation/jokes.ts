import joi from 'joi'

export enum ValidationTypes {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

const getValidationSchema = (op = ValidationTypes.CREATE) => {
  switch (op) {
    case ValidationTypes.CREATE:
      return createJoke
    case ValidationTypes.UPDATE:
      return updateJoke
    default:
      return createJoke
  }
}

const createJoke = joi.object({
  title: joi.string().required(),
  text: joi.string().required(),
  country: joi.string().required(),
  lang: joi.string().required(),
})

const updateJoke = joi.object({
  title: joi.string(),
  text: joi.string(),
  country: joi.string(),
  lang: joi.string(),
})

export const checkInput = async (body: any, op = ValidationTypes.CREATE) => {
  const schema = getValidationSchema(op)
  const value = await schema.validateAsync(body)
  return value
}
