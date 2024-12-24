export class BookPopulate {
  static readonly populateOptions = [
    {
      populateKey: 'author',
      path: 'author',
      fields: 'name,email'
    },
    {
      populateKey: 'category',
      path: 'category',
      fields: 'name,description'
    }
  ];

  static populate(keys?: string[]) {
    if (!keys || keys.length === 0) {
      return this.populateOptions;
    }




    return this.populateOptions.filter(option =>
      keys.includes(option.populateKey)
    );
  }
}