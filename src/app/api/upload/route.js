import cloudinary from "cloudinary";

export async function POST(req) {
  console.log("req===>", req);
  const data = await req.formData();
  if (data.get("file")) {
    console.log("we have file", data.get("file"));
  }

//   //Handle Image Upload
//   let fileData = {};
//   if (data) {
//     //Sava Image to cloudinary
//     let uploadedFile;
//     try {
//       uploadedFile = await cloudinary.uploader.upload(req.file.path, {
//         folder: "Pinvent App",
//         resource_type: "image",
//       });
//     } catch (error) {
//       res.status(500);
//       throw new Error("Image could not be uploaded");
//     }

//     fileData = {
//       fileName: req.file.originalname,
//       filePath: uploadedFile.secure_url,
//       fileType: req.file.mimetype,
//       fileSize: fileSizeFormatter(req.file.size, 2),
//     };
//   }

  return Response.json(true);
}
