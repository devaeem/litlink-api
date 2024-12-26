export const convertToISBN13 =  (isbn: string) => {
  // Input validation
  if (!isbn || typeof isbn !== 'string') {
    throw new Error('Invalid ISBN input: ISBN must be a non-empty string');
  }

  // Remove any hyphens or spaces from the ISBN
  isbn = isbn.replace(/[-\s]/g, '');

  // Validate that ISBN contains only digits
  if (!/^\d+$/.test(isbn)) {
    throw new Error('Invalid ISBN format: ISBN must contain only digits');
  }

  // If it's already 13 digits, return formatted with hyphens
  if (isbn.length === 13) {
    return `${isbn.slice(0, 3)}-${isbn.slice(3, 6)}-${isbn.slice(6, 9)}-${isbn.slice(9, 12)}-${isbn.slice(12)}`;
  }

  // If it's a 10 digit ISBN, convert to ISBN-13
  if (isbn.length === 10) {
    // Add '978' prefix
    const isbn13WithoutChecksum = '978' + isbn.slice(0, -1);

    // Calculate checksum
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(isbn13WithoutChecksum[i]) * (i % 2 === 0 ? 1 : 3);
    }
    const checksum = (10 - (sum % 10)) % 10;

    // Format ISBN-13 with hyphens
    const isbn13 = isbn13WithoutChecksum + checksum;
    return `${isbn13.slice(0, 3)}-${isbn13.slice(3, 6)}-${isbn13.slice(6, 9)}-${isbn13.slice(9, 12)}-${isbn13.slice(12)}`;
  }

  throw new Error('Invalid ISBN length: ISBN must be 10 or 13 digits');
};