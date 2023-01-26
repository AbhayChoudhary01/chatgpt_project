import React from "react"

export default function RightBox() {

    
        const [formData, setFormData] = React.useState({
            email: "",
        password: "",
        passwordConfirm: "",
        joinedNewsletter: true
    })



        function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }))
    }

        function handleSubmit(event) {
            event.preventDefault()
        if(formData.password === formData.passwordConfirm) {
            console.log("Successfully signed up")
        } else {
            console.log("Passwords do not match")
            return
        }

        if(formData.joinedNewsletter) {
            console.log("Thanks for signing up for our newsletter!")
        }
    }

        return (
            <div className="right_box">
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email address"
                    className="form--input"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="form--input"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                />
                

                <button
                    className="form--submit"
                >
                    Sign in
                </button>
                <br></br>
                <h5>Not a member? Sign in</h5>
            </form>
        </div>
        </div>
        )
   
}