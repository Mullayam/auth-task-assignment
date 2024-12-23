import UserModel from "@/factory/models/user.model";
import { PublicRoute } from "@/utils/decorators";
import { cacheServiceInstance } from "@/utils/services/redis/cacheService";
import type { Request, Response } from "express";
import { Op } from "sequelize";

class BaseController {
    public async searchUsers(req: Request, res: Response) {
        try {
            const queries = req.query as { q: string, }
            const search = queries.q


            let result = await UserModel.findAndCountAll({
                attributes: { exclude: ["password"], include: ["id", "name", "avatar"] },
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: `%${search}%` } }, // Search in name
                        { role: { [Op.like]: `%${search}%` } }, // Search in role
                        { email: { [Op.like]: `%${search}%` } } // Search in email
                    ]
                }

            })
            res.json({
                message: "Data Fetched successfully", result: {
                    data: result.rows,
                    total: result.count,

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
    public async getAllUsers(req: Request, res: Response) {
        try {
            const queries = req.query as { page: string, limit: string }
            const page = parseInt(queries.page) || 1
            const limit = parseInt(queries.limit) || 10
            const offset = (page - 1) * limit
            const CACHE_KEY = `users-${page}-${limit}`
             
            // const cachedData = await cacheServiceInstance.cache.get(CACHE_KEY)
            // if (cachedData) {
            //     res.json({ message: "Data fetched from cache", result: JSON.parse(cachedData), success: true })
            //     return
            // }

            let result = await UserModel.findAndCountAll({
                attributes: { exclude: ["password"] },
                limit,
                offset
            })
            await cacheServiceInstance.cache.set(CACHE_KEY, JSON.stringify(result), { EX: 60 })
            res.json({
                message: "Data Fetched successfully", result: {
                    data: result.rows,
                    total: result.count,
                    page,
                    limit
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

    public async getUser(req: Request, res: Response) {
        try {
            const params = req.params as { user_id: string, }
            const user_id = parseInt(params.user_id)

            const CACHE_KEY = `users-${user_id}`
            const cachedData = await cacheServiceInstance.cache.get(CACHE_KEY)
            if (cachedData) {
                res.json({ message: "Data fetched from cache", result: JSON.parse(cachedData), success: true })
                return
            }
            let result = await UserModel.findOne({
                attributes: { exclude: ["password"] },
                where: { id: user_id }
            })
            cacheServiceInstance.cache.set(CACHE_KEY, JSON.stringify(result), { EX: 600 })
            res.json({ message: "Data Fetched successfully", result, success: true })
        } catch (error: any) {
            if (error instanceof Error) {
                res.json({ message: error.message, result: null, success: false })
                return;
            }
            res.json({ message: "Something went wrong", result: null, success: false })
        }
    }
     
    public async updateUser(req: Request, res: Response) {
        try {
            const params = req.params as { user_id: string, }
            const user_id = parseInt(params.user_id)          
            const CACHE_KEY = `users-${user_id}`
            cacheServiceInstance.cache.del(CACHE_KEY)
            const result = await UserModel.update(req.body, { where: { id: user_id } })
            res.json({ message: "User Updated successfully", result, success: true })
        } catch (error: any) {
            if (error instanceof Error) {
                res.json({ message: error.message, result: null, success: false })
                return;
            }
            res.json({ message: "Something went wrong", result: null, success: false })
        }
    }
    public async deleteUser(req: Request, res: Response) {
        try {
            const params = req.params as { user_id: string, }
            const user_id = parseInt(params.user_id)
            const result = await UserModel.destroy({
                where: { id: user_id }
            })
            const CACHE_KEY = `users-${user_id}`
            cacheServiceInstance.cache.del(CACHE_KEY)
            res.json({ message: "User Deleted successfully", result, success: true })
        } catch (error: any) {
            if (error instanceof Error) {
                res.json({ message: error.message, result: null, success: false })
                return;
            }
            res.json({ message: "Something went wrong", result: null, success: false })
        }
    }
}

export default new BaseController()