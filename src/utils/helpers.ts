export const getFIleExtension = (filename: string) =>
  filename.substring(filename.lastIndexOf(".") + 1, filename.length);
