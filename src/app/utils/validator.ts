import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from './errors.js';

const validatePasswordString = Joi.string()
  .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)
  .min(6)
  .max(100)
  .required()
  .messages({
    'string.pattern.base':
      'Password must contain a capital letter, number, special character & greater than 8 digits.',
  });

const fileSchema = Joi.object({
  fieldname: Joi.string().required(),
  originalname: Joi.string().required(),
  encoding: Joi.string().required(),
  mimetype: Joi.string().required(),
  buffer: Joi.binary().required(),
  size: Joi.number().required(),
});

const validate = (
  schema: any,
  object: any,
  option = { abortEarly: true, allowUnknown: false }
) => {
  const check = schema.validate(object, option);
  if (check.error) {
    throw new ValidationError(check.error.details[0].message);
  }
  return check.value;
};

export function joiValidator(constraint: any, isMiddleware = true): any {
  if (!constraint)
    throw new ValidationError(
      'Kindly supply validation schema to joiValidator'
    );

  if (!isMiddleware) {
    return validate(constraint.schema, constraint.data, constraint.option);
  }
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (constraint.body) {
        req.body = validate(
          constraint.body.schema,
          req.body,
          constraint.body.options
        );
      }
      if (constraint.params)
        req.params = validate(
          constraint.params.schema,
          req.params,
          constraint.params.options
        );
      if (constraint.query)
        req.query = validate(
          constraint.query.schema,
          req.query,
          constraint.query.options
        );
      if (constraint.headers)
        req.headers = validate(
          constraint.headers.schema,
          req.headers,
          constraint.headers.options
        );

      return next();
    } catch (err) {
      next(err);
    }
  };
}

export default {
  create: {
    body: {
      schema: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        otherNames: Joi.string().optional(),
        email: Joi.string()
          .required()
          .email()
          .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        password: validatePasswordString,
        phoneNumber: Joi.string().required(),
        username: Joi.string().required(),
        dob: Joi.date().required(),
        address: Joi.string().required(),
      }),
    },
  },

  logout: {
    params: {
      schema: Joi.object({
        id: Joi.string().required(),
      }),
    },
  },

  verifyEmail: {
    body: {
      schema: Joi.object({
        insuredId: Joi.string().required(),
        otp: Joi.string().required(),
      }),
    },
  },

  restPassword: {
    body: {
      schema: Joi.object({
        email: Joi.string().required(),
        password: validatePasswordString,
        otp: Joi.string().required(),
      }),
    },
  },

  sendOtpToMail: {
    body: {
      schema: Joi.object({
        email: Joi.string().required(),
      }),
    },
  },

  sendOtpToPhone: {
    body: {
      schema: Joi.object({
        phoneNumber: Joi.string().required(),
      }),
    },
  },

  verifyPhone: {
    body: {
      schema: Joi.object({
        phoneNumber: Joi.string().required(),
        otp: Joi.string().required(),
      }),
    },
  },

  forgetPassword: {
    body: {
      schema: Joi.object({
        email: Joi.string().required(),
      }),
    },
  },

  login: {
    schema: Joi.object({
      email: Joi.string().optional(),
      userName: Joi.string().optional(),
      password: Joi.string().required(),
    }),
  },

  createGroup: {
    // headers: {
    //   schema: Joi.object({
    //     insuredId: Joi.string(),
    //   }),
    // },

    body: {
      schema: Joi.object({
        groupName: Joi.string().required(),
      }),
    },
  },
  addMemberToGroup: {
    body: {
      schema: Joi.object({
        groupId: Joi.string().required(),
        // insuredId: Joi.string().required(),
        memberId: Joi.string().required(),
      }),
    },
  },
  removeMemberFromGroup: {
    body: {
      schema: Joi.object({
        groupName: Joi.string().required(),
        insuredId: Joi.string().required(),
        memberId: Joi.string().required(),
      }),
    },
  },
  listOneGroupById: {
    params: {
      schema: Joi.object({
        id: Joi.string().required(),
      }),
    },
  },

  UploadImage: {
    body: {
      schema: Joi.object({
        insuredId: Joi.string().required(),
        image: fileSchema.required(),
      }),
    },
  },

  UploadNin: {
    body: {
      schema: Joi.object({
        insuredId: Joi.string().required(),
        ninDocument: fileSchema.required(),
      }),
    },
  },

  CreateWaitList: {
    body: {
      schema: Joi.object({
        full_name: Joi.string().required(),
        email: Joi.string()
          .required()
          .email()
          .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      }),
    },
  },
  ListOneWaitLIst: {
    params: {
      schema: Joi.object({
        id: Joi.string().required(),
      }),
    },
  },
};
