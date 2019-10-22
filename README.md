# quill-right-image-upload

A plugin for uploading image in Quill 🌇

- upload a image when it is inserted, and then replace the base64-url with a http-url
- preview the image which is uploading with a loading animation
- when the image is uploading, we can keep editing the content including changing the image's position or even delete the image.
- does not insert image if it is not valid
- remove placeholder image when server returns an error

![](https://user-images.githubusercontent.com/2622602/49206584-73c6b080-f3ed-11e8-8164-aad28508d4c4.gif)

## Install

```bash
npm install quill-right-image-upload
```

## Start

```js
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import ImageUpload from 'quill-right-image-upload';

Quill.register('modules/imageUpload', ImageUpload);

const editor = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: [
     'image'
    ],
    imageUpload: {
      validate(file) {
        // return false if file is invalid
      },

      upload(file) {
        // return a Promise that resolves in a link to the uploaded image
        return ajax()
          .then(data => resolve(data.imageUrl));
      }
    },
  },
});
```
