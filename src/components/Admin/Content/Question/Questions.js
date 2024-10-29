import { useEffect, useState } from 'react';
import Select from 'react-select';
import './Questions.scss'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { RiImageAddFill } from 'react-icons/ri'
import { v4 as uuidv4 } from 'uuid';
import _, { create } from 'lodash';
import Lightbox from "react-awesome-lightbox-react-18";
import { getAllQuiz, postCreateNewAnswerForQuestion, postCreateNewQuestionForQuiz } from '../../../../services/apiServices';

const Questions = (props) => {

    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    }
                ]
            }
        ]
    );

    const [isPreviewImage, setIsPreViewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: '',
    });

    useEffect(() => {
        fetchQuiz();
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuiz();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((item, index) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz);
        }
    }

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    }
                ]
            };
            setQuestions([...questions, newQuestion]);
        }
        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(item => item.id !== id)
            setQuestions(questionClone);
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions)
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false,

            };
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }
        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers =
                questionsClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionsClone);
        }
    }

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }
        }
    }

    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
        }
    }

    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value;
                    }
                    if (type === 'INPUT') {
                        answer.description = value;
                    }
                }
                return answer;
            })
            setQuestions(questionsClone);
        }
    }

    const handleSubmitQuestionForQuiz = async () => {
        //todo

        //validate data
        //submit question
        await Promise.all(questions.map(async (question) => {
            const q = await postCreateNewQuestionForQuiz(
                +selectedQuiz.value,
                question.description,
                question.imageFile);
            //submit answer
            await Promise.all(question.answers.map(async (answer) => {
                await postCreateNewAnswerForQuestion(
                    answer.description,
                    answer.isCorrect,
                    q.DT.id
                )
            }))
        }));
    }

    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName
            })
            setIsPreViewImage(true);
        }
    }

    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <hr />
            <div className="add-new-question">
                <div className='col-6 form group'>
                    <label className='mb-2'>Select Quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
            </div>
            <div className='mt-3 mb-2'>
                Add question
            </div>
            {questions && questions.length > 0 && questions.map((question, index) => {
                return (
                    <div key={question.id} className='q-main mb-4'>
                        <div className="questions-content">
                            <div className="form-floating description">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Description'
                                    value={question.description}
                                    onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                />
                                <label >Question {index + 1} 's description</label>
                            </div>
                            <div className="group-upload">
                                <label htmlFor={`${question.id}`}>
                                    <RiImageAddFill className='label-up' />
                                </label>
                                <input
                                    id={`${question.id}`}
                                    type='file'
                                    hidden
                                    onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                />
                                <span>
                                    {question.imageName ?
                                        <span
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handlePreviewImage(question.id)}>{question.imageName}</span>
                                        :
                                        '0 file is uploaded'
                                    }</span>
                            </div>
                            <div className='btn-add'>
                                <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                    <FaPlus className='icon-add' />
                                </span>
                                {questions.length > 1 &&
                                    <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                        <FaMinus className='icon-remove' />
                                    </span>
                                }
                            </div>
                        </div>
                        {question.answers && question.answers.length > 0 && question.answers.map((answer, index) => {
                            return (
                                <div key={answer.id} className='answers-content'>
                                    <input
                                        className="form-check-input iscorrect"
                                        type="checkbox"
                                        checked={answer.isCorrect}
                                        onChange={(event) => handleAnswerQuestion('CHECKBOX', question.id, answer.id, event.target.checked)}
                                    />
                                    <div className="form-floating answers-name">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='answer'
                                            value={answer.description}
                                            onChange={(event) => handleAnswerQuestion('INPUT', question.id, answer.id, event.target.value)}

                                        />
                                        <label >Answers {index + 1}</label>
                                    </div>
                                    <div className='btn-group'>
                                        <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                                            <FaPlus className='icon-add' />
                                        </span>
                                        {question.answers.length > 1 &&
                                            <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                <FaMinus className='icon-remove' />
                                            </span>
                                        }
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                )
            })
            }
            {
                questions && questions.length > 0 &&
                <div>
                    <button
                        onClick={() => handleSubmitQuestionForQuiz()}
                        className='btn btn-primary'>Save questions</button>
                </div>
            }
            {isPreviewImage &&
                <Lightbox
                    image={dataImagePreview.url}
                    title={dataImagePreview.title}
                    onClose={() => { setIsPreViewImage(false) }}
                />
            }
        </div>
    )
}

export default Questions;