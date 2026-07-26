export const fileHelper = {
  getFileExtension: (filename) => {
    return filename?.split(".").pop()?.toLowerCase();
  },
  isValidImageType: (filename) => {
    const allowed = ["jpg", "jpeg", "png", "gif", "webp"];
    return allowed.includes(fileHelper.getFileExtension(filename));
  },
  isValidDocumentType: (filename) => {
    const allowed = ["pdf", "doc", "docx", "txt"];
    return allowed.includes(fileHelper.getFileExtension(filename));
  },
  getFileSize: (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  },
};
