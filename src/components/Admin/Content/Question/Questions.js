import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const Questions = (props) => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({});

    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <div className="add-new-question">
                <div className='col-6 form group'>
                    <label>Select Quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={selectedQuiz}
                        options={options}
                    />
                </div>
            </div>
            <div className='mt-3'>
                Add question
            </div>
            <div>
                <div className="questions-content">
                    <div className="form-floating description">
                        <input type="text" className="form-control" />
                        <label >Description</label>
                    </div>
                    <div className="group-upload">
                        <label className='label-up'>Upload image</label>
                        <input type='file' hidden />
                        <span>0 file is  uploaded</span>
                    </div>
                    <div className='btn-add'>
                        <span>
                            <FaPlus className='icon-add' />
                        </span>
                        <span>
                            <FaMinus className='icon-remove' />
                        </span>
                    </div>
                </div>
                <div className='answers-content'>
                    <input
                        className="form-check-input iscorrect"
                        type="checkbox"
                    />
                    <div className="form-floating answers-name">
                        <input type="text" className="form-control" />
                        <label >answers1</label>
                    </div>
                    <div className='btn-group'>
                        <span>
                            <FaPlus className='icon-add' />
                        </span>
                        <span>
                            <FaMinus className='icon-remove' />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Questions;