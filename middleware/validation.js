const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateId = celebrate({
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
  });
  
  const validateURL = (value, helpers) => {
    if (validator.isURL(value)) {
      return value;
    }
    return helpers.error("string.uri");
  };

  const validateUserInfoBody = celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.empty": 'The "name" field must be filled in',
      }),
      avatar: Joi.string().required().custom(validateURL).messages({
        "string.empty": 'The "avatar" field must be filled in',
        "string.uri": 'the "avatar" field must be a valid url',
      }),
      email: Joi.string().required().email().messages({
        "string.empty": 'The "email" field must be filled in',
        "string.email": 'the "email" field must be a valid email',
      }),
      password: Joi.string().required().messages({
        "string.empty": 'The "imageUrl" field must be filled in',
      }),
      userName: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      totalIncome: Joi.number(),
    }),
  });

  const validateExpenseBody = celebrate({
    body: Joi.object().keys({
        category: Joi.any().required().messages({
          "string.empty": 'the "category" id is empty'
        }),
        amount: Joi.number().required().min(0).messages({
            "number.empty": 'The "amount" field must be filled in',
            "number.base": 'The "amount" field must be a number',
        }),
        title: Joi.string().required().min(4).max(15).messages({
            "string.min": 'The minimum length of the "title" field is 4',
            "string.max": 'The maximum length of the "title" field is 15',
            "string.empty": 'The "title" field must be filled in',
        }),
        description: Joi.string().required().max(40).messages({
          "string.max": 'Description is exceeds 40 characters',
        }),
        date: Joi.date().required().messages({
          "string.empty" : "the date field is empty",
        })
    })
  });

  const validateCategoryBody = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(4).max(20).messages({
            "string.min": 'The minimum length of the "name" field is 4',
            "string.max": 'The maximum length of the "name" field is 20',
            "string.empty": 'The "name" field must be filled in',
        }),
        budget: Joi.number().required().messages({
            "number.empty": 'The "budget" field must be filled in',
            "number.base": 'The "budget" field must be a number',
        })
    })
  })

  const validateLoginAuthentication = celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email().messages({
        "string.empty": 'The "email" field must be filled in',
        "string.email": 'the "email" field must be a valid email',
      }),
      password: Joi.string().required().messages({
        "string.empty": 'The "imageUrl" field must be filled in',
      }),
    }),
  });
  
  const validateUpdateUser = celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.empty": 'The "name" field must be filled in',
      }),
      avatar: Joi.string().custom(validateURL).messages({
        "string.empty": 'The "imageUrl" field must be filled in',
        "string.uri": 'the "imageUrl" field must be a valid url',
      }),
      userName: Joi.string().required().min(2).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.empty": 'The "name" field must be filled in',
      }),
    }),
  });

  module.exports = {
    validateId,
    validateUpdateUser,
    validateLoginAuthentication,
    validateUserInfoBody,
    validateCategoryBody,
    validateExpenseBody
  };