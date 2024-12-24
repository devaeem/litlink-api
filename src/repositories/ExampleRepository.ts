import { Example, ExampleModel } from "../models/Example";
import { BaseRepository } from "./BaseRepository";

export class ExampleRepository extends BaseRepository<Example> {
  constructor() {
    super(ExampleModel); // Pass the table name to the base repository
  }



  // Add any example-specific repository methods here if needed
  // The basic CRUD operations will be inherited from BaseRepository
}
