import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload, notification, message, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";

import {ContextFileImage} from '../context/ContextFileImage'
import axios from 'axios';
const { TextArea } = Input;
const { Option } = Select;
const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};
const InforQuiz = () => {
    const { setFileImage } = useContext(ContextFileImage);
    const [form] = Form.useForm();
    const [quizTitle, setQuizTitle] = useState('');
    const [quizCategory, setQuizCategory] = useState(null);
    const [quizDescription, setQuizDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const storedQuiz = localStorage.getItem('quizInfo');
    const parsedQuiz = JSON.parse(storedQuiz);
    const token = localStorage.getItem("token");
    const [file, setFile] = useState(null);
    const [fileData, setFileData] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://api.trandai03.online/api/v1/category/getAll', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });
                if (response.status === 200) {
                    setCategories(response.data);
                }
            } catch (error) {
                notification.error({
                    message: 'Lỗi khi tải danh sách chủ đề',
                    description: 'Không thể tải danh sách chủ đề, vui lòng thử lại sau.',
                });
            }
        };
        fetchCategories();

        if (storedQuiz) {
            setQuizTitle(parsedQuiz.title || '');
            setQuizCategory(parsedQuiz.category_id || null);
            setQuizDescription(parsedQuiz.description || '');
        }
    }, [storedQuiz]);

    const handlePreview = async (file) => {
        const base64Url = await getBase64(file);
        setPreviewUrl(base64Url);
        setFile(file);
    };

    // const handleUpload = async () => {
    //     if (!file) {
    //         message.warning("Chưa có hình ảnh nào được chọn!");
    //         return;
    //     }
    //     const formData = new FormData();
    //     formData.append("file", file);
    //     try {
    //         const response = await axios.post(`https://api.trandai03.online/api/v1/quizs/image/76`, formData, {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json',
    //                 'Accept': '*/*',
    //             },
    //         });
    //         if (response.status === 201) {
    //             // localStorage.removeItem("images")
    //             // navigate('/quizlist')
    //             alert("ok");
    //         }
    //     } catch (error) {
    //         notification.error({
    //             message: 'Lỗi khi tạo quiz',
    //             description: 'Không thể tạo quiz, vui lòng thử lại sau.',
    //         });
    //         console.log("lỗi", error.response);
    //     }
    //     console.log('Thông tin đầy đủ của file:', file);
    //     localStorage.setItem("images", file);
    //     const loadingMessage = message.loading('Đang tải lên...', 10);
    //     loadingMessage();
    //     setPreviewUrl(null);
    //     setFile(null);
    // };

    const handleUpload = async () => {
        if (!file) {
            message.warning("Chưa có hình ảnh nào được chọn!");
            return;
        }
        setFileImage(file)
        // Log toàn bộ đối tượng file
        console.log('Thông tin đầy đủ của file:', file);
    };


    const handleRemove = () => {
        setPreviewUrl(null);
        setFile(null);
    };
    const handleSave = async () => {
        const values = form.getFieldsValue();
        const userCreate = localStorage.getItem("username");
        const quizData = {
            title: values.title,
            description: values.description,
            category_id: values.category_id,
            questions: [],
            isPublished: false,
            // images: imageFiles,
            userCreate: userCreate,
        };
        localStorage.setItem('quizInfo', JSON.stringify(quizData));
        navigate('/createquiz/createquestion');
    };

    return (
        <Form
            layout="vertical"
            form={form}
            onFinish={handleSave}
            initialValues={{
                category_id: quizCategory,
                description: quizDescription,
            }}
        >
            <Form.Item
                label="Tên đề thi"
                name="title"
                rules={[{ required: true, message: 'Vui lòng nhập tên đề thi!' }]}
            >
                <Input
                    placeholder="Nhập tên đề thi"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label="Chủ đề"
                name="category_id"
                rules={[{ required: true, message: 'Vui lòng chọn 1 chủ đề!' }]}
            >
                <Select
                    value={quizCategory || "Toán"}
                    onChange={(value) => setQuizCategory(value)}
                    placeholder="Chọn chủ đề" style={{ width: "400px" }}>
                    {categories.map(category => (
                        <Option key={category.id} value={category.id}>
                            {category.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                value={quizDescription}
                onChange={(e) => setQuizDescription(e.target.value)}
                label="Mô tả"
                name="description"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
            >
                <TextArea rows={4} placeholder="Nhập mô tả về đề thi" />
            </Form.Item>
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
                        <div>
                            {/* Nút Tải lên */}
                            <Button type="primary" onClick={handleUpload} style={{ marginRight: 10 }}>
                                Tải lên
                            </Button>
                            {/* Nút Xóa ảnh */}
                            <Button type="default" onClick={handleRemove} icon={<DeleteOutlined />}>
                                Xóa ảnh
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '150px' }}
                    onClick={handleSave}>
                    Tạo đề thi
                </Button>
            </Form.Item>
        </Form>
    );
};

export default InforQuiz;
