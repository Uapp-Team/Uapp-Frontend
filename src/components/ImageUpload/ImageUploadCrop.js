import React, { useEffect, useRef, useState } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import CancelButton from "../buttons/CancelButton";
import SaveButton from "../buttons/SaveButton";

const ImageUploadCrop = ({
  modalOpen,
  closeModal,
  heading,
  onSubmit,
  croppedImage,
  setCroppedImage,
  error,
  errorText,
  progress,
  buttonStatus,
}) => {
  const [isUpload, setUpload] = useState(false);
  const [croppedSize, setCroppedSize] = useState("");
  const [preview, setPreview] = useState("");
  const imageInputRef = useRef(null);
  const previewImageRef = useRef(null);
  const cropperRef = useRef(null);
  const width = 984;
  const height = 250;

  useEffect(() => {
    if (modalOpen === true) {
      setPreview(null);
      setUpload(false);
    }
  }, [modalOpen, setPreview]);

  const handleavater = (file) => {
    // const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      const base64 = reader.result;
      setCroppedImage({
        fileContent: base64,
        fileType: file.type,
        size: file.size,
        fileName: file.name,
      });
    };
    // reader.readAsBinaryString(file);
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (event) => {
    const input = event.target;

    if (!input.files || input.files.length === 0) {
      alert("No image selected.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const previewImage = previewImageRef.current;
      previewImage.src = e.target.result;

      // Initialize Cropper.js on the preview image
      cropperRef.current = new Cropper(previewImage, {
        aspectRatio: width / height,
        crop: () => {
          const croppedCanvas = cropperRef.current.getCroppedCanvas();
          const croppedWidth = croppedCanvas.width;
          const croppedHeight = croppedCanvas.height;
          setCroppedSize(`Selected size: ${croppedWidth} x ${croppedHeight}px`);
        },
      });
      // cropperRef.current = new Cropper(previewImage, {
      //   aspectRatio: 5, // Adjust this value for the desired aspect ratio
      //   viewMode: 1, // Adjust this value for the desired view mode
      // });
    };

    // Read the selected image file
    reader.readAsDataURL(input.files[0]);
    setUpload(true);
    handleavater(input.files[0]);
  };

  const cropImage = () => {
    // Get the cropped data URL
    const croppedDataURL = cropperRef.current.getCroppedCanvas().toDataURL();
    setPreview(croppedDataURL);

    setCroppedImage({
      fileContent: croppedDataURL,
      fileType: croppedImage.fileType,
      size: croppedImage.size,
      fileName: croppedImage.fileName,
    });
  };

  console.log("preview", preview);
  console.log("croppedImage", croppedImage);

  return (
    <>
      <Modal isOpen={modalOpen} toggle={closeModal}>
        <ModalHeader>{heading}</ModalHeader>
        <ModalBody>
          {isUpload ? (
            <div className="w-100">
              <img ref={previewImageRef} style={{ maxWidth: "100%" }} alt="" />
              {/* <p>
                Best size: {width} x {height} pixels
              </p> */}
              <span className="fs-12px">{croppedSize}</span>
              <br />
              <SaveButton text="Crop selected area" action={cropImage} />
            </div>
          ) : (
            <input
              type="file"
              ref={imageInputRef}
              accept="image/*"
              onChange={handleImageUpload}
            />
          )}

          {preview && (
            <div>
              <h4 className="my-2">Preview</h4>
              <img src={preview} alt="Cropped" className="w-100" />
            </div>
          )}
          {error && <span className="text-danger">{errorText}</span>}
          <div className="d-flex justify-content-between mt-4">
            <CancelButton cancel={closeModal} />
            {preview ? (
              <SaveButton
                action={onSubmit}
                progress={progress}
                buttonStatus={buttonStatus}
              />
            ) : null}
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ImageUploadCrop;
