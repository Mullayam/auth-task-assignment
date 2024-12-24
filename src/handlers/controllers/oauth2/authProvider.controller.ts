import type { Request, Response } from "express";

import { AuthProviderFactory } from "@/app/modules/oauth2/oauth2factory";
import { AuthProvidersList, GoogleAuthProviderResponse } from "@/utils/interfaces";
import { PublicRoute } from "@/utils/decorators";
import { IAuthProvider, IUser } from "@/utils/interfaces/user.interface";
import authService from "../user/auth.service";
import utils from "@/utils";
import { ID_TOKEN } from '../../../utils/interfaces/index';
import { __CONFIG__ } from "@/app/config";

const provider: Record<AuthProvidersList, IAuthProvider | undefined> = {
    "google": AuthProviderFactory.createProvider("google", {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        redirectUri: process.env.GOOGLE_REDIRECT_URL as string
    }),
    facebook: undefined,
    github: undefined
}

@PublicRoute()
class OAuthProvider {


    async providerAuth(req: Request, res: Response) {
        try {
            const providerName = req.params.provider as AuthProvidersList
            if (!provider[providerName]) {
                throw new Error("Provider not supported")
            }

            res.json({ message: "OK", result: { redirect: provider[providerName].getAuthUrl() }, success: true });
        } catch (error) {
            if (error instanceof Error) {
                res.json({ message: error.message, result: null, success: false })
                return;
            }
            res.json({ message: "Something went wrong", result: null, success: false })
        }
    }

    async providerCallback(req: Request, res: Response) {
        try {
            const providerName = req.params.provider as AuthProvidersList
            if (!provider[providerName]) {
                throw new Error("Provider not supported")
            }
            const { code } = req.query;
            const result = await provider[providerName].handleCallback<GoogleAuthProviderResponse>(code as string);
            if ("error" in result) {
                throw new Error("Error in Logging in")
            }

            const jwt = utils.decodeToken(result.id_token) as ID_TOKEN;
            let user = await authService.findByEmail(jwt.email);
            if (!user) {
                const hashedPassword = await utils.HashPassword(jwt.email);
                user = await authService.createUser({
                    email: jwt.email,
                    password: hashedPassword,
                    name: jwt.name,
                    avatar: jwt.picture,
                    email_verification_token: null
                })
            }
            const userObj: IUser = { uid: user.id.toString(), email: user.email, name: user.name, avatar: user.avatar, role: user.role };
            const access_token = utils.signJWT(userObj, `${user.id}`);
            res.json({
                message: "Login Success, Redirecting...", result: {
                    user, access_token,
                    type: "Bearer",
                    expires_at: __CONFIG__.SECRETS.JWT_SECRET_EXPIRATION
                }, success: true
            })

        } catch (error) {
            if (error instanceof Error) {
                res.json({ message: error.message, result: null, success: false })
                return;
            }
            res.json({ message: "Something went wrong", result: null, success: false })
        }
    }
    private async handleUserService() {

    }
}
export default new OAuthProvider();