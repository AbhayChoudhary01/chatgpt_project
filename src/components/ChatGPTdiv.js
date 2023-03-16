import React from "react"


export default function LeftBox() {
    const [got_ans, set_ans] = React.useState('ask bitch');

    const [question, setPrompt] = React.useState('');


    const handleSubmit = async () => {
        console.log(question);

        const response = await fetch('http://localhost:5000/users/question_to_gpt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
          }).then(response => response.json())
          .then(data => set_ans(data.answer))
          .catch(error => console.error(error));
    };



    return (
        <div className="form-area-content">

            <div className="form-textbox">
                <input
                    type="text"
                    className="ques--input"
                    name="ques"
                    value={question}
                    onChange={(e) => setPrompt(e.target.value)}
                />
            
            </div>
            <div className="send-icon">
                <img alt="send" src="images/send.png" width="30px"/>
            </div>
            <div className="send-icon">
                <img alt="send" src="images/mic.png" width="14px"/>
            </div>
            
        </div>
    )
};