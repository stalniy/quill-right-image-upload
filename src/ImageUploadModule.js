function defaultHandleError(error) {
  return Promise.reject(error);
}
const defaultInvalidFile = () => {};

class ImageUploadModule {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.range = null;

    if (typeof this.options.upload !== 'function') {
      throw new Error('[Missing config] upload function that returns a promise is required');
    }

    if (this.options.accept && !Array.isArray(this.options.accept)) {
      throw new Error('Expect "accept" to be an array of file formats');
    }

    this.quill.getModule('toolbar')
      .addHandler('image', this.selectLocalImage.bind(this));
  }

  selectLocalImage() {
    this.range = this.quill.getSelection(true);
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute(
      'accept',
      this.options.accept ? this.options.accept.join(',') : 'image/*'
    );
    fileInput.onchange = () => this.selectFile(fileInput.files[0]);
    fileInput.click();
  }

  validate(file) {
    const { maxSize, accept } = this.options;

    if (maxSize && file.size > maxSize) {
      return false;
    }

    if (accept && !accept.includes(file.type)) {
      return false;
    }

    return true;
  }

  selectFile(file) {
    if (!file) {
      return null;
    }

    const isValid = this.validate(file);

    if (!isValid) {
      const onInvalid = this.options.invalid || defaultInvalidFile;
      onInvalid(file);
      return null;
    }

    this.tryToInsertPlaceholder(file);

    return this.options.upload(file)
      .then((url) => {
        this.deleteImagePlaceholder();
        this.insertImage(url);
      })
      .catch((error) => {
        this.deleteImagePlaceholder();
        const handleError = this.options.uploadError || defaultHandleError;
        return handleError(error);
      });
  }

  tryToInsertPlaceholder(file) {
    if (this.options.imagePlaceholder === false) {
      return;
    }

    if (this.options.imagePlaceholder) {
      this.insertImage(this.options.imagePlaceholder, 'imageUploadPlaceholder');
    } else {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.insertImage(reader.result, 'imageUploadPlaceholder');
      }, false);
      reader.readAsDataURL(file);
    }
  }

  deleteImagePlaceholder() {
    this.quill.deleteText(this.range.index, 2);
  }

  insertImage(url, format = 'image') {
    this.quill.insertEmbed(this.range.index, format, url);
  }
}

export default ImageUploadModule;
