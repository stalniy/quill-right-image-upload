const styleElement = document.createElement('style');
styleElement.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(styleElement);

styleElement.appendChild(document.createTextNode(`
  .image-upload {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 3px solid #ccc;
    border-top-color: #1e986c;
    animation: spinner 0.6s linear infinite;
  }
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`));