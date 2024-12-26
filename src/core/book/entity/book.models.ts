import { getModelForClass, ModelOptions, prop, Ref, Severity } from "@typegoose/typegoose";
import { BaseModel, IBaseModel } from "../../../models/BaseModel";
import { Typebook } from "../../typebook/entity/typebook.models";

export interface IBook extends  IBaseModel {
  title: string;
  author: string;
  publishedYear: number;
  isbn: string;
  typeBook: Ref<Typebook>;
}

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'books',

  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Book extends BaseModel  {
  @prop({ required: true, trim: true })
  public title!: string;

  @prop({ required: true, trim: true })
  public author!: string;

  @prop({ required: true })
  public publishedYear!: number;

  @prop({ required: true })
  public isbn!: string;

  //typebook
  @prop({ ref: () => Typebook, type: () => String })
  public typeBook!: Ref<Typebook>;
}

export const BookModel = getModelForClass(Book);

