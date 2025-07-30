import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

export class User extends Model {
  id!: number;
  email!: string;
  senha!: string;
  nome!: string;
  role!: 'Gerente' | 'Funcionário' | 'Cliente'; 
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Funcionario', // Default role
  }  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;