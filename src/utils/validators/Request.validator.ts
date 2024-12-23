import { param, query, body } from 'express-validator';


export const UserReqValidator = {
    Login: [
        body('email')
            .isString()
            .isEmail()
            .withMessage('Please provide a valid email address')
            .notEmpty()
            .withMessage('Email field is required'),
        body('password')
            .isString()
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
            .notEmpty()
            .withMessage('Password field is required'),
    ],
    Register: [
        body('name')
            .isString()
            .isLength({ min: 3, max: 32 })
            .withMessage('Name must be between 3 and 32 characters long')
            .notEmpty()
            .withMessage('Name field is required'),
        body('email')
            .isString()
            .isEmail()
            .withMessage('Please provide a valid email address')
            .notEmpty()
            .withMessage('Email field is required'),
        body('password')
            .isString()
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
            .notEmpty()
            .withMessage('Password field is required'),
    ],
    SendInstructions: [
        body('email')
            .isString()
            .isEmail()
            .withMessage('Please provide a valid email address')
            .notEmpty()
            .withMessage('Email field is required'),
    ],
    ResetPassword: [
        body('email')
            .isString()
            .isEmail()
            .withMessage('Please provide a valid email address')
            .notEmpty()
            .withMessage('Email field is required'),
        body('password')
            .isString()
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
            .notEmpty()
            .withMessage('Password field is required'),
        body('confirm_password')
            .isString()
            .isLength({ min: 6 })
            .withMessage('Confirm Password must be at least 6 characters long')
            .notEmpty()
            .withMessage('Confirm Password field is required'),
        param('token').notEmpty().withMessage('Reset Password Token is required'),

    ],
    VerifyEmail: [
        body('email')
            .isString()
            .isEmail()
            .withMessage('Please provide a valid email address')
            .notEmpty()
            .withMessage('Email field is required'),
        param('token').notEmpty().withMessage('Verify Email Token is required'),

    ],
};
export const AdminReqValidator = {
    GetAllUsers: [
        query('page').isNumeric().withMessage('Page must be a number'),
        query('limit').isNumeric().withMessage('Limit must be a number'),
    ],
    SearchQuery: [
        query('q').isString().notEmpty().withMessage('Search query is required'),
    ],
    UserIdParam: [
        param('user_id').isNumeric().withMessage('User id must be a number').notEmpty().withMessage('User id is required'),
    ],

}