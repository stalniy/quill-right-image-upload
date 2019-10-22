import Quill from 'quill';
import ImageUploadModule from './ImageUploadModule';
import ImageUploadPlaceholder from './ImageUploadPlaceholder';

Quill.register('formats/_imageUploadPlaceholder', ImageUploadPlaceholder);

export {
  ImageUploadModule,
  ImageUploadPlaceholder
};
