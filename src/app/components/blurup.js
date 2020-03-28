import React, { Component } from 'react'
import classnames from 'classnames'
import holder from '../../img/holder_B.png';

class ImageLoader extends Component {
  state = {
    imgBlob: '',
    newImage: '',
    proxy: "http://localhost:8080"
  }

  // load file from user's computer.
  uploadFile = (e) => {
    const image = e.target.files[0];
    const value = e.target.name;
    if (image && image.type.indexOf('image') === 0) {
      this.renderLocal(image, (url) => {
        this.setState({ newImage: url, imgBlob: image })
        if (this.props.action)
          this.props.action(this.state.imgBlob)
      })
    }
  }

  // render uploded file on user's brwoser
  renderLocal = (image, next) => {
    if (image.type.indexOf('image') === 0) {
      const reader = new FileReader();
      reader.onload = function (event) {
        next(event.target.result)
      }
      reader.readAsDataURL(image);
    } else
      return "Invalid image type"
  }

  //render external  url into browser
  renderURL = (image) => {
    if (!image) return '';
    if (image.indexOf('http') > -1 || image.indexOf('data:image') > -1 || image.indexOf('/static/') > -1) return image;
    let url = `${this.state.proxy}/api/files/${image}`;
    return url;
  }

  render() {
    const { name, margin, width, radius, height, editable, className, imageURL } = this.props.options;
    const { newImage, imgBlob } = this.state;

    const figStyles = {
      cursor: "pointer",
      overflow: "hidden",
      position: "relative",
      width: width || "200px",
      margin: margin || "auto",
      borderRadius: radius || "10px",
      height: height || width || "150px",
      maxHeight: height || width || "150px"
    }

    const imgStyles = {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
    // console.log(newImage);
    // console.log(newImage, imgBlob);
  // console.log(this.props.options);

    return (
      <div>
        <input style={{ display: "none" }} type="file" onChange={this.uploadFile} name="img"
          id="uploader" ref={fileInput => this.ImagePicker = fileInput} />
        <figure style={figStyles} className={className} >
          <img style={imgStyles}onClick={() => editable ? this.ImagePicker.click() : ""}
            // render the new uploaded newImage, the passed url from parent , or a default place holder;
            src={newImage || this.renderURL(imageURL || holder)}
            alt="Upload a new image" />
        </figure>
      </div >
    )
  }
}
export default ImageLoader;

export const uploadToDB = (image, { width = 200, height = null }, next) => {
  const fileName = image.name;
  const type = image.type;
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = event => {
    const img = new Image();
    img.src = event.target.result;

    return img.onload = () => {
      const elem = document.createElement('canvas');
      const scaleFactor = height ? height :
        (width / img.width) * img.height;
      elem.width = width;
      elem.height = scaleFactor;
      const ctx = elem.getContext('2d');
      ctx.drawImage(img, 0, 0, width, scaleFactor);
      ctx.canvas.toBlob((blob) => {
        const file = new File([blob], fileName, {
          lastModified: Date.now(),
          type
        });
        next(file);
      }, 'image/jpeg', 0.7);
    },
    
      reader.onerror = error => console.log(error);
  };
}