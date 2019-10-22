class ImageUploadModule {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.range = null;

    if (typeof this.options.upload !== 'function') {
      throw new Error('[Missing config] upload function that returns a promise is required');
    }

    this.quill.getModule('toolbar')
      .addHandler('image', this.selectLocalImage.bind(this));
  }

  selectLocalImage() {
    this.range = this.quill.getSelection(true);
    this.fileHolder = document.createElement('input');
    this.fileHolder.setAttribute('type', 'file');
    this.fileHolder.setAttribute('accept', this.options.accept || 'image/*');
    this.fileHolder.onchange = () => this.selectFile(this.fileHolder.files[0]);
    this.fileHolder.click();
  }

  selectFile(file) {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => this.insertBase64Image(reader.result), false);
    reader.readAsDataURL(file);

    return this.options.upload(file)
      .then(url => this.insertToEditor(url))
      .catch((error) => {
        this.deleteImagePlaceholder()
        return this.options.uploadError(error);
      })
  }

  deleteImagePlaceholder() {
    this.quill.deleteText(this.range.index, 2);
  }

  insertBase64Image(url) {
    this.quill.insertEmbed(this.range.index, 'imageUpload', url);
  }

  insertToEditor(url) {
    this.deleteImagePlaceholder();
    this.quill.insertEmbed(this.range.index, 'image', url);
  }
}

export default ImageUploadModule;
