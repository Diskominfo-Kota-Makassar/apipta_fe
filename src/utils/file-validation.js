/**
 * APIPTA File Upload Validator
 * Mitigates F03 (Parser DoS, unconstrained upload size and malformed/unsupported files)
 */

// Maximum file size: 10 MB (as specified in Audit Security Report F03)
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

// Approved file extensions for documents and attachments
export const ALLOWED_FILE_EXTENSIONS = [
  'pdf',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'csv',
  'jpg',
  'jpeg',
  'png',
];

export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'image/jpeg',
  'image/png',
];

/**
 * Validates file size and format before uploading to prevent server parser DoS
 * @param {File} file - File object to validate
 * @param {Object} [options] - Optional custom limits
 * @param {number} [options.maxSize] - Maximum allowed size in bytes
 * @param {string[]} [options.allowedExtensions] - List of allowed file extensions
 * @param {boolean} [options.strictMime] - Whether to strictly validate MIME type
 * @returns {{ valid: boolean, error?: string }}
 */
export const validateUploadFile = (file, options = {}) => {
  if (!file) {
    return { valid: false, error: 'File tidak boleh kosong' };
  }

  const maxSize = options.maxSize || MAX_FILE_SIZE_BYTES;
  if (file.size > maxSize) {
    const sizeInMb = (maxSize / (1024 * 1024)).toFixed(0);
    return {
      valid: false,
      error: `Ukuran file (${(file.size / (1024 * 1024)).toFixed(2)} MB) melebihi batas maksimum (${sizeInMb} MB)`,
    };
  }

  const allowedExts = options.allowedExtensions || ALLOWED_FILE_EXTENSIONS;
  const fileName = file.name || '';
  const fileExt = fileName.split('.').pop()?.toLowerCase();

  if (!fileExt || !allowedExts.includes(fileExt)) {
    return {
      valid: false,
      error: `Format file tidak diizinkan. Format yang diperbolehkan: ${allowedExts.join(', ')}`,
    };
  }

  if (file.type && options.strictMime) {
    const allowedMimes = options.allowedMimes || ALLOWED_MIME_TYPES;
    if (!allowedMimes.includes(file.type.toLowerCase())) {
      return {
        valid: false,
        error: 'Tipe MIME file tidak sesuai dengan format yang diizinkan',
      };
    }
  }

  return { valid: true };
};
