import UserModel from "@/factory/models/user.model";
import utils from "@/utils";
import { PublicRoute } from "@/utils/decorators";
import helpers from "@/utils/helpers";
import type { Request, Response } from "express";
import { cacheServiceInstance } from '@/utils/services/redis/cacheService';
import { IUser, USER_STATUS, USER_STATUS_AND_ERROR } from "@/utils/interfaces/user.interface";
import { __CONFIG__ } from '@/app/config';
import { JwtPayload } from "jsonwebtoken";
import { MailService } from "@/utils/services/mail/mailService";
import moment from "moment";
import authService from "./auth.service";

const mail = MailService.createInstance()

class AuthController {

    @PublicRoute()
    async Login(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const isUser = await UserModel.findOne({ where: { email } });
            if (!isUser) {
                throw new Error("Invalid Credentials")
            }
            if (isUser.status !== USER_STATUS.ACTIVE) {
                throw new Error(USER_STATUS_AND_ERROR[isUser.status as keyof typeof USER_STATUS_AND_ERROR])

            }
            const isPasswordMatch = await utils.ComparePassword(isUser.password, password);
            if (!isPasswordMatch) {
                throw new Error("Invalid Credentials")
            }

            const user: IUser = { uid: isUser.id.toString(), email: isUser.email, name: isUser.name, avatar: isUser?.avatar, role: isUser.role };
            const access_token = utils.signJWT(user, `${isUser.id}`);


            res.json({
                message: "Login Success, Redirecting...", result: {
                    user, access_token,
                    type: "Bearer",
                    expires_at: __CONFIG__.SECRETS.JWT_SECRET_EXPIRATION
                }, success: true
            }).end()

        } catch (error: any) {
            if (error instanceof Error) {
                res.json({ message: error.message, result: null, success: false }).end()
                return;
            }
            res.json({ message: "Something went wrong", result: null, success: false }).end()
        }
    }
    @PublicRoute()
    async Register(req: Request, res: Response) {
        try {
            const { email, password, name } = req.body
            const isUser = await UserModel.findOne({ where: { email } });
            if (isUser) {
                throw new Error("User Already Exists")
            }
            const hashedPassword = await utils.HashPassword(password);

            const avatar = req.body.newNameOfFile
            const email_verification_token = helpers.Md5Checksum(helpers.SimpleHash() + Date.now());
            const user = await authService.createUser({
                email,
                name,
                password: hashedPassword,
                avatar,
                email_verification_token
            })

            await mail.SendTemplate({
                to: email,
                subject: "Email Verification",
                template: "email-verification",
                context: {
                    USER_NAME: name,
                    frontend_URL: `${__CONFIG__.APP.ALLOWED_PRIMARY_DOMAINS}`,
                    VERIFICATION_TOKEN: email_verification_token,
                },
            })
            res.json({
                message: "User Registered Successfully", result: {
                    id: user.id,
                    email
                }, success: true
            })
            res.end()
        } catch (error: any) {
            if (error instanceof Error) {
                res.json({ message: error.message, result: null, success: false })
                return;
            }
            res.json({ message: "Something went wrong", result: null, success: false })
        }
    }

    @PublicRoute()
    async SendResetPasswordInstructions(req: Request, res: Response) {
        try {
            const { email } = req.body
            const isUser = await UserModel.findOne({ where: { email } });
            if (!isUser) {
                throw new Error("Email does not exist")
            }
            const token = helpers.Md5Checksum(email + Date.now());
            await UserModel.update({ password_reset_token: token, password_reset_token_expiry: moment().add(1, 'hour').toDate() }, { where: { email } })
            await mail.SendTemplate({
                to: email,
                subject: "Password Reset Instructions",
                template: "reset-password",
                context: {
                    username: isUser.name,
                    frontend_URL: `${__CONFIG__.APP.ALLOWED_PRIMARY_DOMAINS}`,
                    token: token,
                    email
                },
            })

            res.json({ message: "Password Reset Instructions Mail Sent Successfully", result: {}, success: true })
        } catch (error: any) {
            if (error instanceof Error) {
                res.json({ message: error.message, result: null, success: false })
                return;
            }
            res.json({ message: "Something went wrong", result: null, success: false })
        }
    }
    @PublicRoute()
    async ResendEmail(req: Request, res: Response) {
        try {
            if (!req.body.email) {
                throw new Error("Email is required")
            }
            const { email } = req.body

            const isUser = await UserModel.findOne({ where: { email } });
            if (!isUser) {
                throw new Error("Email does not exist")
            }
            const emailVerficatoinToken = helpers.Md5Checksum(helpers.SimpleHash() + Date.now());
            await UserModel.update({ email_verification_token: emailVerficatoinToken, email_verification_token_expiry: moment().add(1, 'hour').toDate() }, { where: { email } })
            await mail.SendTemplate({
                to: email,
                subject: "Email Verification",
                template: "email-verification",
                context: {
                    USER_NAME: isUser.name,
                    frontend_URL: `${__CONFIG__.APP.ALLOWED_PRIMARY_DOMAINS}`,
                    VERIFICATION_TOKEN: emailVerficatoinToken,
                },
            })

            res.json({ message: "Verification Mail Sent Successfully", result: {}, success: true })
        } catch (error: any) {
            if (error instanceof Error) {
                res.json({ message: error.message, result: null, success: false })
                return;
            }
            res.json({ message: "Something went wrong", result: null, success: false })
        }
    }
    @PublicRoute()
    async ResetPassword(req: Request, res: Response) {
        try {
            const { email, password, confirm_password } = req.body
            const isUser = await UserModel.findOne({ where: { email } });
            const resetToken = req.query.token

            if (!isUser) {
                throw new Error("Email does not exist")
            }
            if (isUser.password_reset_token !== resetToken) {
                throw new Error("Invalid Token or Expired")
            }
            const currentTime = Math.floor(Date.now() / 1000);
            const token = isUser.password_reset_token_expiry?.getTime()! / 1000;
            if (currentTime > token) {
                throw new Error("Reset Token Expired, Send Again")
            }
            if (!password.match(confirm_password)) {
                throw new Error("Password does not match")
            }
            const hashedPassword = await utils.HashPassword(password);
            await UserModel.update({
                password: hashedPassword,
                password_reset_token_expiry: new Date(),
                password_reset_at: new Date(),

            }, { where: { email } })

            res.json({ message: "Password Reset Successfully", result: {}, success: true })
        } catch (error: any) {
            if (error instanceof Error) {
                res.json({ message: error.message, result: null, success: false })
                return;
            }
            res.json({ message: "Something went wrong", result: null, success: false })
        }
    }
    @PublicRoute()
    async VerifyEmail(req: Request, res: Response) {
        try {

            const query = req.query as { token: string, type: "verify" | "reset" }

            const isUser = await UserModel.findOne({ where: { email_verification_token: query.token, status: USER_STATUS.INACTIVE } });

            if (!isUser) {
                throw new Error("This Link is no more longer Invalid or May be Email is Already Verified")
            }
            const currentTime = Math.floor(Date.now() / 1000);
            const emailVerify_token_expiry = isUser.email_verification_token_expiry?.getTime()! / 1000;
            if (currentTime > emailVerify_token_expiry) {
                throw new Error("Token is Expired, Please Send Reset Again")
            }

            await UserModel.update({
                email_verified_at: new Date(),
                status: USER_STATUS.ACTIVE,
            }, { where: { email_verification_token: query.token } })

            res.json({ message: "Email Verified Successfully", result: {}, success: true })
        } catch (error: any) {
            if (error instanceof Error) {
                res.json({ message: error.message, result: null, success: false })
                return;
            }
            res.json({ message: "Something went wrong", result: null, success: false })
        }
    }
    @PublicRoute()
    async IsTokenExist(req: Request, res: Response) {
        try {

            const query = req.query as { token: string, type: "verify" | "reset", }
            let where: Record<any, any> = {}
            if (query.type === "verify") {
                where = { email_verification_token: query.token, status: USER_STATUS.INACTIVE }
            }
            if (query.type === "reset") {
                where = { password_reset_token: query.token }
            }

            const isUser = await UserModel.findOne({ where });
            if (!isUser) {
                throw new Error("This Link is no more longer Invalid")
            }
            const currentTime = Math.floor(Date.now() / 1000);

            const token_expiry = query.type === "verify" ? isUser.email_verification_token_expiry?.getTime()! / 1000 :
                isUser.password_reset_token_expiry?.getTime()! / 1000;
            if (currentTime > token_expiry) {
                throw new Error("Token is Expired, Please Send Reset Again")
            }

            res.json({ message: "Link is Valid", result: {}, success: true })
        } catch (error: any) {
            if (error instanceof Error) {
                res.json({ message: error.message, result: null, success: false })
                return;
            }
            res.json({ message: "Something went wrong", result: null, success: false })
        }
    }
    @PublicRoute()
    async RefereshToken(req: Request, res: Response) {
        try {
            const token = req.headers["authorization"]?.replace("Bearer ", "")
            if (!token) {
                throw new Error("Token is missing")
            }
            const user = utils.verifyJWT(token) as IUser & JwtPayload;
            const refresh_token = utils.signJWT(user, `${user.uid}`);
            res.json({
                message: "OK", result: {
                    user, access_token: refresh_token,
                    type: "Bearer",
                    expires_at: __CONFIG__.SECRETS.JWT_SECRET_EXPIRATION
                }, success: true
            })
        } catch (error: any) {
            if (error instanceof Error) {
                res.json({ message: error.message, result: null, success: false })
                return;
            }
            res.json({ message: "Something went wrong", result: null, success: false })
        }
    }
    async Logout(req: Request, res: Response) {
        try {
            const user = req as IUser & JwtPayload;
            const authHeader = req.headers["authorization"]
            const token = authHeader!.replace("Bearer ", "")
            const currentTime = Math.floor(Date.now() / 1000);
            const remainingTime = user.exp! - currentTime;

            cacheServiceInstance.cache.set(token, "true", { EX: remainingTime + 10 })
            res.json({ message: "OK", result: null, success: true })
        } catch (error: any) {
            if (error instanceof Error) {
                res.json({ message: error.message, result: null, success: false })
                return;
            }
            res.json({ message: "Something went wrong", result: null, success: false })
        }
    }
    async CurrentUser(req: Request, res: Response) {
        try {
            const user = req as IUser & JwtPayload;
            const authHeader = req.headers["authorization"]
            const token = authHeader!.replace("Bearer ", "")
            const currentTime = Math.floor(Date.now() / 1000);
            const remainingTime = user.exp! - currentTime;

            cacheServiceInstance.cache.set(token, "true", { EX: remainingTime + 10 })
            res.json({ message: "OK", result: null, success: true })
        } catch (error: any) {
            if (error instanceof Error) {
                res.json({ message: error.message, result: null, success: false })
                return;
            }
            res.json({ message: "Something went wrong", result: null, success: false })
        }
    }
}

export default new AuthController()