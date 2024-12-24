import mongoose from "mongoose";
import { ModelOptions, prop, PropType } from "@typegoose/typegoose";
import { v4 as uuidv4 } from 'uuid';
export interface IBaseModel  {
  _id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export abstract class BaseModel implements IBaseModel {
  @prop({ type: String, default: () => uuidv4() })
  public _id!: string;

  @prop({ type: Boolean, default: true })
  public isActive!: boolean ;

  @prop({ type: Date, default: () => new Date() })
  public createdAt!: Date;

  @prop({ type: Date, default: () => new Date() })
  public updatedAt!: Date;
}

