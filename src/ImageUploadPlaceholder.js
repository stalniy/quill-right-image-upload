import Quill from 'quill';

const Image = Quill.import('formats/image');

export default class ImageUploadPlaceholder extends Image {
  static get blotName() { return 'imageUpload' };
  static get className() { return 'image-uploading' };
}
