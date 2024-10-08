import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload, notification } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const { TextArea } = Input;
const { Option } = Select;

const InforQuiz = () => {
    const [form] = Form.useForm();
    const [quizTitle, setQuizTitle] = useState('');
    const [quizCategory, setQuizCategory] = useState(null);
    const [quizDescription, setQuizDescription] = useState('');
    const [fileList, setFileList] = useState([
    ]);
    const [categories, setCategories] = useState([]);
    const storedQuiz = localStorage.getItem('quizInfo');
    const parsedQuiz = JSON.parse(storedQuiz);
    const token = localStorage.getItem("token");

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
            // if (Array.isArray(parsedQuiz.images)) {
            //     setFileList(parsedQuiz.images.map(file => ({
            //         uid: file.uid,
            //         name: file.name,
            //         url: file.url,
            //     })));
            // } else {
            //     setFileList([]);
            // }
        }
    }, [storedQuiz]);

    const handleSave = () => {
        const values = form.getFieldsValue();
        const userCreate = localStorage.getItem("username");
        // const imageFiles = fileList.map(file => ({
        //     uid: file.uid,
        //     name: file.name,
        //     url: file.url || URL.createObjectURL(file.originFileObj)
        // }));

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
    // const onChange = ({ fileList: newFileList }) => {
    //     setFileList(newFileList);
    // };
    // const onPreview = async (file) => {
    //     let src = file.url;
    //     if (!src) {
    //         src = await new Promise((resolve) => {
    //             const reader = new FileReader();
    //             reader.readAsDataURL(file.originFileObj);
    //             reader.onload = () => resolve(reader.result);
    //         });
    //     }
    //     const image = new Image();
    //     image.src = src;
    //     const imgWindow = window.open(src);
    //     imgWindow?.document.write(image.outerHTML);
    // };

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
            {/* <Form.Item
                label="Chọn ảnh của đề thi"
                name="image"
                rules={[{ required: true, message: 'Vui lòng chọn ảnh cho đề thi!' }]}
            >
                <ImgCrop rotationSlider>
                    <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                    >
                        {fileList.length < 5 && '+ Upload'}
                    </Upload>
                </ImgCrop>
            </Form.Item> */}
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
