import { SESClient } from "@aws-sdk/client-ses";
import * as dotenv from "dotenv";

dotenv.config();

const config = {
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
};

const sesClient = new SESClient(config);

export default sesClient;
