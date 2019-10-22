# quill-right-image-upload

A plugin for uploading image in Quill. Done right!

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
    toolbar: true,
    imageUpload: {
      upload(file) {
        // return a Promise that resolves in a link to the uploaded image
        const data = new FormData();
        data.append('file', file);

        return http.post('url/to/file/upload', data)
          .then(response => resolve(response.imageUrl));
      }
    },
  },
});
```
