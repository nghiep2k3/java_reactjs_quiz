import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useNavigate } from 'react-router-dom';
const { TextArea } = Input;
const { Option } = Select;

const InforQuiz = () => {
    const [quizTitle, setQuizTitle] = useState('');
    const [quizLevel, setQuizLevel] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [fileList, setFileList] = useState([
    ]);

    const storedQuiz = localStorage.getItem('quizInfo');
    const parsedQuiz = JSON.parse(storedQuiz);
    console.log("aa", parsedQuiz?.title);
    useEffect(() => {
        console.log("a1", storedQuiz);

        if (storedQuiz) {


            setQuizTitle(parsedQuiz.title || '');
            setQuizLevel(parsedQuiz.level || '');
            setQuizDescription(parsedQuiz.description || '');
            setFileList(parsedQuiz.images.map(file => ({
                uid: file.uid,
                name: file.name,
                url: file.url,
            })));
        }
    }, []);

    const navigate = useNavigate();
    const handleSave = () => {
        const imageFiles = fileList.map(file => ({
            uid: file.uid,
            name: file.name,
            url: file.url || URL.createObjectURL(file.originFileObj)
        }));
        const quizData = {
            title: quizTitle,
            level: quizLevel,
            description: quizDescription,
            images: imageFiles,
            questions: []
        };
        localStorage.setItem('quizInfo', JSON.stringify(quizData));

        navigate('/createquiz/createquestion');
    };
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <Form
            layout="vertical"
            onFinish={handleSave}
            initialValues={{
                level: quizLevel || 'Cơ bản',
            }}
        >
            <Form.Item
                label="Tên đề thi"
                name="examName"
                rules={[{ required: true, message: 'Vui lòng nhập tên đề thi!' }]}
            >
                <Input
                    placeholder="Nhập tên đề thi"
                    value={parsedQuiz?.title}
                    onChange={(e) => setQuizTitle(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label="Trình độ"
                name="level"
                rules={[{ required: true, message: 'Vui lòng chọn trình độ!' }]}
            >
                <Select
                    value={quizLevel}
                    onChange={(value) => setQuizLevel(value)}
                    placeholder="Chọn trình độ" style={{ width: "400px" }}>
                    <Option value="Cơ bản">Cơ bản</Option>
                    <Option value="Trung cấp">Trung cấp</Option>
                    <Option value="Nâng cao">Nâng cao</Option>
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
            <Form.Item
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
            </Form.Item>
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
