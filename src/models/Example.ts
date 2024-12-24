import { Document, Schema, model } from 'mongoose';


export interface Example extends Document {
  name: string;
  description?: string;
}

const ExampleSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
});

export const ExampleModel = model<Example>('Example', ExampleSchema);