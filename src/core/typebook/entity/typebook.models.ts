import {
  getModelForClass,
  ModelOptions,
  prop,
  Severity,
} from "@typegoose/typegoose";
import { BaseModel, IBaseModel } from "../../../models/BaseModel";

export interface ITypebook extends IBaseModel {
  name: string;
  description: string;
}

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "typebooks",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Typebook extends BaseModel implements ITypebook {
  @prop({ required: true, trim: true })
   name!: string;

  @prop({ optional: true, trim: true })
  description!: string ;

  // @prop({ default: true })
  // status!: boolean;
}

export const TypebookModel = getModelForClass(Typebook);
