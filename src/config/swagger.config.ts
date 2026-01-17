import { JsonReaderContract } from "@shared/contracts";
import { DocumentBuilder } from "@nestjs/swagger";

interface SwaggerConfigInfo {
    name: string;
    author: string;
    version: string;
    description: string;
    contact: { email: string };
};

export const createSwaggerConfig = async (
    jsonReader: JsonReaderContract
): Promise<DocumentBuilder> => {
  const info = await jsonReader.read<SwaggerConfigInfo>('package.json');

  return new DocumentBuilder()
    .setTitle(info.name)
    .setVersion(info.version)
    .setDescription(info.description)
    .setContact(info.author, '', info.contact.email)
};