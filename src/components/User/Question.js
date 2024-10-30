import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox-react-18";

const Question = (props) => {

    const { data, index } = props;
    const [isPreviewImage, setIsPreViewImage] = useState(false);

    if (_.isEmpty(data)) {
        return (<></>)
    }

    const handleHandleCheckBox = (event, aId, qId) => {
        let isChecked = event.target.checked;
        props.handleCheckbox(aId, qId);
    }

    return (
        <>
            {data.image ?
                <div className="q-image">
                    <img
                        style={{ cursor: 'pointer' }}
                        src={`data:image/jpeg;base64,${data.image}`}
                        onClick={() => setIsPreViewImage(true)}
                    />
                    {isPreviewImage &&
                        <Lightbox
                            image={`data:image/jpeg;base64,${data.image}`}
                            title={`Question Image`}
                            onClose={() => { setIsPreViewImage(false) }}
                        />
                    }
                </div>
                :
                <div className="q-image">

                </div>
            }
            <div className="question">Question {index + 1}: {data.questionDescription}?</div>
            <div className="answer">
                {data.answers && data.answers.length > 0 && data.answers.map((a, index) => {
                    return (
                        <div
                            key={`answer-${index}`}
                            className="a-child">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={a.isSelected}
                                    onChange={(event) => handleHandleCheckBox(event, a.id, data.questionId)}
                                />
                                <label className="form-check-label" >
                                    {a.description}
                                </label>
                            </div>

                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Question;