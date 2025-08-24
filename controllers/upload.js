const { validationResult } = require("express-validator");
const Upload = require("../models/upload");
require("dotenv").config();
const path = require("path");
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");

exports.uploadFile = async (req, res, next) => {
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({message: "validation error", errors: errors.array()})
        }

        const client = new S3Client({
            region: "default",
            endpoint: "https://storage.c2.liara.space",
            credentials: {
                accessKeyId: process.env.LIARA_ACCESS_KEY_ID,
                secretAccessKey: process.env.LIARA_SECRET_ACCESS_KEY,
            },
        })

        const file = req.file;
        if(!file){
            return res.status(400).json({message: "file is required"})
        }
        
        const params = {
            Body: file.buffer,
            Bucket: process.env.LIARA_BUCKET_NAME,
            Key: `${Date.now()}-${file.originalname}`,
        }

        await client.send(new PutObjectCommand(params));

        const fileUrl = `https://${process.env.LIARA_BUCKET_NAME}.storage.c2.liara.space/${params.Key}`;

        const newFile = new Upload({
            file: fileUrl,
        });

        await newFile.save();

        return res.status(200).json({message: "file uploaded successfully", fileUrl: fileUrl})

    } catch(error){
        return res.status(500).json({message: "server error uploading file"})
        next(error);
    }
}

exports.downloadFile = async (req, res, next) => {
    try {
      const { fileUrl } = req.body;
  
      if (!fileUrl) {
        return res.status(400).json({ message: "fileUrl is required" });
      }
  
      // Extract file key from the URL
      const fileKey = path.basename(fileUrl);
  
      const client = new S3Client({
        region: "default",
        endpoint: "https://storage.c2.liara.space",
        credentials: {
          accessKeyId: process.env.LIARA_ACCESS_KEY_ID,
          secretAccessKey: process.env.LIARA_SECRET_ACCESS_KEY,
        },
      });
  
      const params = {
        Bucket: process.env.LIARA_BUCKET_NAME,
        Key: fileKey,
      };
  
      const command = new GetObjectCommand(params);
      const data = await client.send(command);
  
      // Set headers so browser downloads it
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${fileKey}"`
      );
      res.setHeader("Content-Type", data.ContentType || "application/octet-stream");
  
      // Pipe the file stream to the response
      data.Body.pipe(res);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error downloading file" });
      next(error);
    }
  };