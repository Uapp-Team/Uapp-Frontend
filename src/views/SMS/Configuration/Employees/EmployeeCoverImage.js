import { Upload, Modal } from "antd";
import React, { useState } from "react";
import * as Icon from "react-feather";
import { useDispatch } from "react-redux";
import { StoreEmployeeCoverData } from "../../../../redux/actions/SMS/Employees/EmployeeImageCoverActions";

const CoverPicturesWall = (props) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);
  const { error2, setError2 } = props;

  const dispatch = useDispatch();

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => {
    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setFileList([]);
      setError2("Only jpeg, jpg, png image is allowed");
    } else {
      setFileList(fileList);
      setError2("");
    }
  };

  dispatch(StoreEmployeeCoverData(FileList));

  return (
    <>
      <Upload
        listType="picture-card"
        multiple={false}
        fileList={FileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={(file) => {
          return false;
        }}
      >
        {FileList.length < 1 ? (
          <div className="text-danger" style={{ marginTop: 8 }}>
            <Icon.Upload />
          </div>
        ) : (
          ""
        )}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default CoverPicturesWall;
