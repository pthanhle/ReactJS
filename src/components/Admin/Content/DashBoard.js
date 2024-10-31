import './DashBoard.scss'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { getOverView } from '../../../services/apiServices';
import { useState, useEffect } from 'react';

const DashBoard = (props) => {

    const [dataOverView, setDataOverView] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        fetchDataOverView();
        // fetchDataChart();
    }, [])

    const fetchDataOverView = async () => {
        let res = await getOverView();
        if (res && res.EC === 0) {
            setDataOverView(res.DT);
            //process chart data
            let Qz = 0, Qs = 0, As = 0, Us = 0;
            Qz = res?.DT?.others?.countQuiz ?? 0;
            Qs = res?.DT?.others?.countQuestions ?? 0;
            As = res?.DT?.others?.countAnswers ?? 0;
            Us = res?.DT?.users?.total ?? 0;
            const data = [
                {
                    "name": "Quizzes",
                    "Qz": Qz,
                },
                {
                    "name": "Questions",
                    "Qs": Qs,
                },
                {
                    "name": "Answers",
                    "As": As,
                },
                {
                    "name": "Users",
                    "Us": Us,
                }
            ]
            setDataChart(data)
        }
        console.log("check res: ", res)
    }

    return (
        <div className="dashboard-container">
            <div className='title'>
                Analytics DashBoard
            </div>
            <div className='content'>
                <div className='left-content'>
                    <div className='child'>
                        <span className='text-1'> Total Users</span>
                        <span className='text-2'>
                            {dataOverView && dataOverView.users
                                && dataOverView.users.total ?
                                <>{dataOverView.users.total}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'> Total Quizzes</span>
                        <span className='text-2'>
                            {dataOverView && dataOverView.others
                                && dataOverView.others.countQuiz ?
                                <>{dataOverView.others.countQuiz}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'> Total Questions</span>
                        <span className='text-2'>
                            {dataOverView && dataOverView.others
                                && dataOverView.others.countQuestions ?
                                <>{dataOverView.others.countQuestions}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'> Total Answers</span>
                        <span className='text-2'>
                            {dataOverView && dataOverView.others
                                && dataOverView.others.countAnswers ?
                                <>{dataOverView.others.countAnswers}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                </div>
                <div className='right-content'>
                    <ResponsiveContainer width={'95%'} height={'100%'}>
                        <BarChart data={dataChart}>
                            <CartesianGrid strokeDasharray="4 4" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#8884d8" />
                            <Bar dataKey="Qs" fill="#82ca9d" />
                            <Bar dataKey="As" fill="#fcb12b" />
                            <Bar dataKey="Us" fill="#fae14b" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default DashBoard;