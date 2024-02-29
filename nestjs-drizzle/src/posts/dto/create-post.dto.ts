import { IsNotEmpty, IsString } from 'class-validator';
import { FileUpload } from 'src/common/file-upload.interface';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  image?: FileUpload;
}
