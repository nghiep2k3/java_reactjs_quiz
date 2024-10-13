import React, { useEffect, useRef, useState } from 'react';
import { Input, List, Card, notification } from 'antd';
import axios from 'axios';
import debounce from 'lodash/debounce';
import './searchQuiz.module.css';

const SearchQuiz = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const token = localStorage.getItem("token");
    const searchRef = useRef(null);
    const debounceSearch = debounce(async (value) => {
        try {
            const response = await axios.get(
                `https://api.trandai03.online/api/v1/quizs/search?page=0&size=5&sort=title&filter=${encodeURIComponent(value)}&onlyValid=false`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                    },
                }
            );

            if (response.status === 200) {
                setSearchResults(response.data.content);
            }
        } catch (error) {
            notification.error({
                message: 'Lỗi khi tìm kiếm',
                description: 'Không thể tìm kiếm, vui lòng thử lại sau.',
            });
        }
    }, 300);
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (!value) {
            debounceSearch.cancel();
            setSearchResults([]);
        } else {
            debounceSearch(value);
        }
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchResults([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div style={{ position: "relative", width: "100%" }} ref={searchRef}>
            <Input.Search
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={handleSearchChange}
                enterButton="Tìm kiếm"
                size="middle"
                style={{ width: "100%", height: "40px" }}
            />
            {searchResults.length > 0 && (
                <div style={{
                    position: "absolute",
                    zIndex: '999',
                    top: "30px",
                    width: '100%',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}>
                    <List
                        itemLayout="vertical"
                        dataSource={searchResults}
                        renderItem={quiz => (
                            <List.Item key={quiz.id}>
                                <Card hoverable>
                                    <p><strong>{quiz.title}</strong></p>
                                    <p>Mô tả: {quiz.description}</p>
                                    <p>Ngày tạo: {new Date(quiz.createdAt).toLocaleDateString()}</p>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>
            )}
        </div>
    );
};

export default SearchQuiz;
