import React, { useState } from 'react';
import { Upload, Button, message, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

// Hàm getBase64 để chuyển file thành chuỗi base64
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const Test = () => {
  const token = localStorage.getItem('token');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handlePreview = async (file) => {
    // Chuyển file thành base64 để xem trước
    const base64Url = await getBase64(file);
    setPreviewUrl(base64Url); // Set URL dưới dạng base64 để hiển thị ảnh
    setFile(file); // Set file để sử dụng cho upload
  };

  const handleUpload = async () => {
    if (!file) {
      message.warning("Chưa có hình ảnh nào được chọn!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // Log toàn bộ đối tượng file
    console.log('Thông tin đầy đủ của file:', file);

    try {
      const response = await axios.post(
        "https://api.trandai03.online/api/v1/quizs/image/68",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            Accept: "*/*",
          },
        }
      );
      message.success("Upload thành công!");
      console.log("Response:", response.data);

      // Reset preview và file sau khi upload thành công
      setPreviewUrl(null);
      setFile(null);
    } catch (error) {
      message.error("Upload thất bại!");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {/* Upload component */}
      <Upload
        beforeUpload={(file) => {
          handlePreview(file); // Xử lý xem trước file
          return false; // Ngăn không cho upload tự động
        }}
        showUploadList={false} // Ẩn danh sách file đã tải lên
      >
        <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
      </Upload>

      {/* Hiển thị ảnh xem trước */}
      {previewUrl && (
        <div style={{ marginTop: 20 }}>
          <Image
            src={previewUrl}
            alt="Xem trước ảnh"
            style={{ maxWidth: "200px", marginBottom: 20 }}
          />
          {/* Nút Tải lên */}
          <Button type="primary" onClick={handleUpload}>Tải lên</Button>
        </div>
      )}
    </div>
  );
};

export default Test;
