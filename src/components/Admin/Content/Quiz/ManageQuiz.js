import { useState } from 'react';
import './ManageQuiz.scss'
import Select from 'react-select';
import { postCreateNewQuiz } from '../../../../services/apiServices';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import { Accordion } from 'react-bootstrap';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = (props) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error('Name/Description is required');
            return;
        }

        let res = await postCreateNewQuiz(description, name, type?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('');
            setDescription('');
            setImage(null);
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="quiz-container">
            <Tabs
                defaultActiveKey='profile'
                id='uncontrolled-tab-example'
                className='mb-2'
                justify
            >
                <Tab className='p-3 pt-0' eventKey="ManageQuizz" title="ManageQuizz" >
                    <div className="add-new">
                        <fieldset className="border rounded-3 p-3">
                            <legend className="float-none w-auto px-3">Add new Quiz:</legend>
                            <div class="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='your quiz name'
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <label >Name</label>
                            </div>
                            <div class="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Description'
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                                <label >Description</label>
                            </div>
                            <div className='my-3'>
                                <Select
                                    defaultValue={type}
                                    onChange={setType}
                                    options={options}
                                    placeholder={"Quiz type..."}
                                />
                            </div>
                            <div className='more-actions form-group'>
                                <label className='mb-1'>Upload Image</label>
                                <input
                                    type='file'
                                    className='form-control'
                                    onChange={(event) => handleChangeFile(event)}
                                />
                            </div>
                            <div className='mt-3'>
                                <button
                                    className='btn btn-warning'
                                    onClick={() => { handleSubmitQuiz() }}
                                >Save</button>
                            </div>
                        </fieldset>
                    </div>
                    <div className="list-detail">
                        <TableQuiz />
                    </div>
                </Tab>
                <Tab className='p-3 pt-0' eventKey="Update Q/A Quizzes" title="Update Q/A Quizzes" >
                    <QuizQA />
                </Tab>
                <Tab className='p-3 pt-0' eventKey="Assign to Users" title="Assign to Users" >
                    <AssignQuiz />
                </Tab>
            </Tabs>
        </div>
    )
}

export default ManageQuiz;