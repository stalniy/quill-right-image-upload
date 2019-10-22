import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { ImageUploadModule } from 'quill-right-image-upload';

Quill.register('modules/imageUpload', ImageUploadModule);

const MOCK_IMG_SRC = 'http://freaksidea.com/images/logo.jpg';
const editorNode = document.createElement('div');

document.body.appendChild(editorNode);

new Quill(editorNode, { // eslint-disable-line
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'blockquote', 'code-block', 'image'],
      [{ align: [] }, { indent: '-1' }, { indent: '+1' }],
      ['clean']
    ],
    imageUpload: {
      accept: ['image/jpeg', 'image/png', 'image/gif'],
      maxSize: 100 * 1024,
      invalid(file) {
        alert(`${file.name} is bigger than 100kb`);
      },
      upload(file) { // eslint-disable-line
        // return a Promise that resolves in a link to the uploaded image
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(MOCK_IMG_SRC); // Must resolve as a link to the image
          }, 3000);
          // const UPLOAD_URL = ''; // specify url here
          // const fd = new FormData();
          // fd.append("upload_file", file);

          // const xhr = new XMLHttpRequest();
          // xhr.open('POST', UPLOAD_URL, true);
          // xhr.onload = () => {
          //   if (xhr.status === 200) {
          //     const response = JSON.parse(xhr.responseText);
          //     resolve(response.imageUrl); // Must resolve as a link to the image
          //   }
          // };
          // xhr.send(fd);
        });
      }
    },
  },
});
