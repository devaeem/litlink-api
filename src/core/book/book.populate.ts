export class BookPopulate {
  static readonly populateOptions = [
    {
      populateKey: 'typeBook',
      path: 'typeBook',
      fields: '_id,name,description'
    },
    // {
    //   populateKey: 'category',
    //   path: 'category',
    //   fields: '_id,name'
    // }
  ];

  static populate(keys?: string[]) {
    if (!keys || keys.length === 0) {
      return this.populateOptions;
    }

    // Filter populate options based on keys and split fields if provided
    return this.populateOptions.filter(option => {
      // แยก key และ fields ที่ต้องการ
      const keyParts: string[] = keys.find(k => k.startsWith(option.populateKey))?.split(',') || [];
      const populateKey: string = keyParts[0];
      const requestedFields: string[] = keyParts.slice(1);

      if (!populateKey) return false;

      // ถ้ามีการระบุ fields พิเศษ
      if (requestedFields.length > 0) {
        const availableFields: string[] = option.fields.split(',');
        const validFields: string[] = requestedFields.filter(field =>
          availableFields.includes(field)
        );

        // เพิ่มเงื่อนไข: ถ้าไม่พบ fields ที่ถูกต้องเลย ให้ใช้ fields เดิม
        if (validFields.length > 0) {
          option.fields = validFields.join(',');
        }
        // ไม่ต้องทำอะไร ถ้าไม่พบ fields ที่ถูกต้อง (จะใช้ fields เดิม)
      }

      return true;
    });
  }
}