export function validateAadhar(aadharNumber) {
  const clean = aadharNumber.replace(/\D/g, '');
  if (clean.length !== 12) {
    return { isValid: false, message: 'Aadhar number must be exactly 12 digits.' };
  }
  return { isValid: true, message: '' };
}

export function validateFile(file, allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'], maxSizeMB = 2) {
  if (!file) return { isValid: false, message: 'No file selected.' };
  
  const isTypeValid = allowedTypes.includes(file.type);
  if (!isTypeValid) {
    return {
      isValid: false,
      message: 'Invalid file format. Please upload PDF, PNG, JPG, or JPEG.',
    };
  }

  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      message: `File size exceeds the ${maxSizeMB}MB limit.`,
    };
  }

  return { isValid: true, message: '' };
}
