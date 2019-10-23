# quill-right-image-upload

A plugin for uploading image in [Quill](https://quilljs.com/). Done right!

- upload a image when it is inserted, and then replace the base64-url with a http-url
- preview the image which is uploading with a loading animation
- when the image is uploading, we can keep editing the content including changing the image's position or even delete the image.
- does not insert image if it is not valid
- remove placeholder image when server returns an error

## Install

```sh
npm install quill-right-image-upload
```

## Start

```js
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { ImageUploadModule } from 'quill-right-image-upload';

Quill.register('modules/imageUpload', ImageUploadModule);

const editor = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'blockquote', 'image'],
      ['clean']
    ],
    imageUpload: {
      accept: ['image/jpeg', 'image/png', 'image/gif'],
      maxSize: 100 * 1024, // in bytes
      invalid(file) { // called if image is not in array of accept or greater than maxSize
        alert(`${file.name} is bigger than 100kb`)
      },
      upload(file) { // required
        // return a Promise that resolves to a link to the image
        const data = new FormData();
        data.append('file', file);

        return http.post('url/to/file/upload', data)
          .then(response => response.imageUrl);
      }
    },
  },
});
```
