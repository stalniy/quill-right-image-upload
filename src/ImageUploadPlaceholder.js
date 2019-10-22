import Quill from 'quill';

const Image = Quill.import('formats/image');

export default class ImageUploadPlaceholder extends Image {
  static blotName = 'imageUploadPlaceholder';

  static className = 'image-uploading';
}
