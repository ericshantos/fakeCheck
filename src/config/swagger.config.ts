import { DocumentBuilder } from '@nestjs/swagger';
import { JsonReader } from '@/shared/services';

/**
 * Create Swagger configuration based on metadata in a JSON file
 */
export const createSwaggerConfig = async (jsonReader: JsonReader) => {
  const info = await jsonReader.read<{
    name: string;
    version: string;
    description: string;
    contact: { name: string; email: string };
  }>('package.json');

  return new DocumentBuilder()
    .setTitle(info.name)
    .setVersion(info.version)
    .setDescription(info.description)
    .setContact(info.contact.name, '', info.contact.email)
    .build();
};
