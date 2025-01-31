
import { BookPopulate } from "../core/book/book.populate";
import { PaginatedResponse } from "../utils/interface/GetAllRequestDto.interface";
import { Model, Document } from "mongoose";

export abstract class BaseRepository<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findAll(filter: Record<string, any> = {}): Promise<T[]> {
    return await this.model.find(filter);
  }

  async findById(
    id: string,
    filter: Record<string, any> = {}
  ): Promise<T | null> {
    return await this.model.findOne({ _id: id, ...filter, isActive: true });
  }

  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndUpdate(id, { isActive: false });
    return result !== null;
  }

  async findWithPagination(
    page: number,
    limit: number,
    populate?: string[] | undefined,
    searchFilter?:Record<string, any>,
    sortFilter?:Record<string, any>
  ): Promise<PaginatedResponse<T>> {
    const offset = (page - 1) * limit;
    const total = await this.model.countDocuments({ isActive: true, ...searchFilter, ...sortFilter });

    // Create base query
    let query = this.model
        .find({ isActive: true, ...searchFilter, ...sortFilter })
        .skip(offset)
        .limit(limit);

    // Apply populate if provided
    if (populate && populate.length > 0) {
        populate.forEach((path) => {
            const populateOptions = BookPopulate.populate([path]);
            populateOptions.forEach(option => {
                if (option.fields) {
                    query = query.populate({
                        path: option.path,
                        select: option.fields.replace(/,/g, ' '),
                        justOne: true,
                        transform: (doc, original) => doc || original
                    });
                } else {
                    query = query.populate({
                        path: option.path,
                        justOne: true,
                        transform: (doc, original) => doc || original
                    });
                }
            });
        });
    }

    const data = await query;



    return {
        rows: data,
        page,
        limit,
        total,
        pageCount: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
        previousPage: page - 1,
        nextPage: page + 1,
    };
  }
}
