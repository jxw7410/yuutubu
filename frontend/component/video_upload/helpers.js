export const readFile = (file, callback) => {
  if (!file || !callback) return;
  const fileReader = new FileReader();
  fileReader.onloadend = callback(file, fileReader);
  fileReader.readAsDataURL(file);
}