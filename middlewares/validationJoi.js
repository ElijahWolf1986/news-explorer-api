const { celebrate, Joi } = require('celebrate');

const urlPattern = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/;

const validateSignin = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email()
        .message('Поле email должно быть адресом электронной почты')
        .messages({
          'string.empty': 'Поле email должно быть заполнено',
        }),
      password: Joi.string().required().messages({
        'string.empty': 'Поле password должно быть заполнено',
      }),
    })
    .unknown(true),
});

const validateSignup = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30)
        .messages({
          'string.min': 'Минимальная длина поля name - 2',
          'string.max': 'Максимальная длина поля name - 30',
          'string.empty': 'Поле name должно быть заполнено',
        }),
      email: Joi.string()
        .required()
        .email()
        .message('Поле email должно быть адресом электронной почты')
        .messages({
          'string.empty': 'Поле email должно быть заполнено',
        }),
      password: Joi.string().required().messages({
        'string.empty': 'Поле password должно быть заполнено',
      }),
    })
    .unknown(true),
});

const validateCreateArticle = celebrate({
  body: Joi.object()
    .keys({
      keyword: Joi.string().required().messages({
        'string.empty': 'Поле keyword должно быть заполнено',
      }),
      title: Joi.string().required().messages({
        'string.empty': 'Поле title должно быть заполнено',
      }),
      text: Joi.string().required().messages({
        'string.empty': 'Поле text должно быть заполнено',
      }),
      date: Joi.date().max('now').required().messages({
        'date.max': 'Дата статьи не должна быть из будущего',
      }),
      source: Joi.string().required().required().messages({
        'string.empty': 'Поле source должно быть заполнено',
      }),
      link: Joi.string()
        .regex(urlPattern)
        .message('Неверная ссылка поля link')
        .required()
        .messages({
          'string.empty': 'Поле link должно быть заполнено',
        }),
      image: Joi.string()
        .regex(urlPattern)
        .message('Неверная ссылка поля image')
        .required()
        .messages({
          'string.empty': 'Поле image должно быть заполнено',
        }),
    })
    .unknown(true),
});

const validateDeleteArticle = celebrate({
  params: Joi.object()
    .keys({
      articleId: Joi.string()
        .hex()
        .message('Неправильная система счисления в id статьи')
        .length(24)
        .message('Неправильное id статьи'),
    })
    .unknown(true),
});

module.exports = {
  validateSignin,
  validateSignup,
  validateCreateArticle,
  validateDeleteArticle,
};
