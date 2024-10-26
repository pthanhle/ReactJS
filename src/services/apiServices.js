import axios from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
    //submitData
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return (
        axios.post('api/v1/participant', data)
    )
}

const getAllUsers = () => {
    return (
        axios.get('api/v1/participant/all')
    )
}

const putUpdateUser = (id, username, role, image) => {
    //submitData
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return (
        axios.put('api/v1/participant', data)
    )
}

const deleteUser = (userId) => {
    return (
        axios.delete('api/v1/participant', { data: { id: userId } })
    )
}

const getUserWithPaginate = (page, limit) => {
    return (
        axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
    )
}

const postlogin = (userEmail, userPassword) => {
    return axios.post(`api/v1/login`,
        {
            email: userEmail,
            password: userPassword,
            delay: 3000
        })
}

const postRegister = (userEmail, userPassword, username) => {
    return axios.post(`api/v1/register`,
        { email: userEmail, password: userPassword, username: username })
}

const getQuizByUser = () => {
    return axios.get(`/api/v1/quiz-by-participant`);
}

const getDataQuiz = (id) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`);
}

const postSubmitQuiz = (data) => {
    return axios.post(`/api/v1/quiz-submit`, { ...data });
}

const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return (
        axios.post('api/v1/quiz', data)
    )
}

const getAllQuiz = () => {
    return axios.get(`/api/v1/quiz/all`);
}

const putUpdateQuizForAdmin = (id, description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return (
        axios.put('api/v1/quiz', data)
    )
}

const deleteQuizForAdmin = (id) => {
    return (
        axios.delete(`api/v1/quiz/${id}`)
    )
}

export {
    postCreateNewUser,
    getAllUsers,
    putUpdateUser,
    deleteUser,
    getUserWithPaginate,
    postlogin,
    postRegister,
    getQuizByUser,
    getDataQuiz,
    postSubmitQuiz,
    postCreateNewQuiz,
    getAllQuiz,
    putUpdateQuizForAdmin,
    deleteQuizForAdmin,
};