import sequelize from '@/app/config/Datasource';
import { RolesArray } from '@/utils/helpers/constants';
import { USER_STATUS } from '@/utils/interfaces/user.interface';
import { DataTypes, Model, Optional } from 'sequelize';


interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    role?: string;
    avatar?: string;
    is_email_verified?: boolean;
    email_verification_token?: string;
    email_verification_token_expiry?: Date;
    email_verified_at?: Date;
    password_reset_token?: string;
    password_reset_token_expiry?: Date;
    password_reset_at?: Date;
    status?: USER_STATUS; 
    deleted_at?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id!: number;
    name!: string;
    email!: string;
    password!: string;
    role?: string;
    avatar?: string;
    is_email_verified?: boolean;
    email_verification_token?: string;
    email_verification_token_expiry?: Date;
    email_verified_at?: Date;
    password_reset_token?: string;
    password_reset_token_expiry?: Date;
    password_reset_at?: Date;
    status?: USER_STATUS;
    readonly created_at?: Date;
    readonly updated_at?: Date;
    readonly deleted_at?:Date;
}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM,
            allowNull: false,
            defaultValue: 'USER',
            values: RolesArray,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_email_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        email_verification_token: DataTypes.TEXT,
        email_verification_token_expiry: {
            type: DataTypes.DATE,
            defaultValue: new Date(new Date().getTime() + 24 * 60 * 60 * 100)
        },
        email_verified_at: DataTypes.DATE,
        password_reset_token: DataTypes.TEXT,
        password_reset_token_expiry: {
            type: DataTypes.DATE,
            defaultValue: new Date(new Date().getTime() + 24 * 60 * 60 * 100)
        },
        password_reset_at: DataTypes.DATE,
        status: {
            type: DataTypes.ENUM,
            values: Object.values(USER_STATUS),
            defaultValue: USER_STATUS.PENDING
        },
        deleted_at: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        
    },
    {
        sequelize,
        timestamps: true,
        tableName: 'users',
    }
);

export default UserModel;
