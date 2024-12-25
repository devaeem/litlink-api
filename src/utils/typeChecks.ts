import { v4 as uuidv4 } from 'uuid';

/**
 * Checks if the value is an array or string and formats it accordingly
 * @param value - The value to check and format
 * @returns Formatted string - if array, joins with comma, otherwise returns as is
 */
export const formatMessageValue = (value: unknown): string => {
  console.log(value);
  // Handle arrays specifically
  if(typeof value === 'string' && value.includes('Page number is required')) {
    const result : any = [
      {
        id: uuidv4(),
        type: 'error',
        traceId: uuidv4(),
        timestamp: new Date().toISOString(),
        field: 'page',
        message: 'Page number is required'
      }
    ]

    return  result;
  }

  if(typeof value === 'string' && value.includes('Limit number is required')) {
    const result : any = [
      {
        id: uuidv4(),
        type: 'error',
        traceId: uuidv4(),
        timestamp: new Date().toISOString(),
        field: 'limit',
        message: 'Limit number is required'
      }
    ]

    return  result;
  }



  if (typeof value === 'string' && value.includes('ErrorStrictPopulateError')) {
    const match = value.match(/Cannot populate path `([^`]+)`/);
    const path = match ? match[1] : 'unknown';
    return `Cannot populate field '${path}' because it is not in the schema`;
  }


  // Handle objects with pretty formatting
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
};