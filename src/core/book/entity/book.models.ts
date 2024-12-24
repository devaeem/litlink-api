import { getModelForClass, ModelOptions, prop } from "@typegoose/typegoose";
import { BaseModel, IBaseModel } from "../../../models/BaseModel";

export interface IBook extends  IBaseModel {
  title: string;
  author: string;
  publishedYear: number;
}

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Book extends BaseModel  {
  @prop({ required: true, trim: true })
  public title!: string;

  @prop({ required: true, trim: true })
  public author!: string;

  @prop({ required: true })
  public publishedYear!: number;
}

export const BookModel = getModelForClass(Book);

