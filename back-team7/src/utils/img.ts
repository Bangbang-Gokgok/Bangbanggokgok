export const getPostImageList = (files: { [fieldname: string]: Express.Multer.File[] }) => {
  const fileArray: any = files;
  const postImages: Array<string> = [];
  fileArray.map((data: any) => postImages.push(data.location));
  return postImages;
};
