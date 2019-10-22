import Quill from 'quill';
import ImageUploadModule from './ImageUploadModule';
import ImageUploadPlaceholder from './ImageUploadPlaceholder';

Quill.register('formats/imageUploadPlaceholder', ImageUploadPlaceholder);

export {
  ImageUploadModule,
  ImageUploadPlaceholder
};
