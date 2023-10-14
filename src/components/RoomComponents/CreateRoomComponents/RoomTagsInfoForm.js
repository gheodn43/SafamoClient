import React, { useState, useEffect } from 'react';
import ProgressBar from '../../ProcessComponents/processComponent';
import tagsService from '../../../services/tagsService';
import TagCard from '../../DataDisplayComponents/Cards/TagCard';

const RoomTagsInfoForm = ({ tagsRoom, onConfirmTags, onNextStep }) => {
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        tagsService.publicGetAll()
            .then(data => {
                setTags(data);
            })
            .catch(error => {
                console.error('Lỗi khi lấy tags:', error);
            });
    }, []);

    const handleSelectTag = (tagId) => {
        
        if (selectedTags.includes(tagId)) {
            setSelectedTags(selectedTags.filter(id => id !== tagId));
        } else {
            setSelectedTags([...selectedTags, tagId]);
            console.log( selectedTags);
        }
    };

    const handleNext = () => {
        tagsRoom = selectedTags;
        onConfirmTags(selectedTags);
        onNextStep();
    };

    return (
        <div>
            <ProgressBar initialValue={20} targetValue={50} />
            <h3>Thêm các tags vào phòng của bạn</h3>
            <div className='row'>
                {tags.map(tag => (
                    <TagCard
                        key={tag.roomRole_id}
                        tagname={tag.name}
                        isTagSelected={selectedTags.includes(tag.roomRole_id)}
                        onClick={() => handleSelectTag(tag.roomRole_id)}
                    />
                ))}
            </div>
            <button className='next-step-btn btn btn-primary' onClick={handleNext}>Tiếp theo</button>
        </div>
    );
};

export default RoomTagsInfoForm;
