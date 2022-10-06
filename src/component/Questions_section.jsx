import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import uuid from 'react-uuid'
export default function Questions_section({ setdata, data }) {

    const onSubmit = (formData) => {
        debugger
        const qData = [...data]
        qData.push({
            id: uuid(),
            question: formData.question,
            option1: formData.option1,
            option2: formData.option2,
            option3: formData.option3,
            option4: formData.option4,
            answers: formData.answers
        })
        setdata(qData)
    }
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    return (
        <div>
            <div className="users-table">
                <div className="users-table-container">
                    <div className="user-table-head">
                        <div className="userHeading">
                            <h2>Assessment</h2>
                        </div>
                    </div>
                    <form >
                        <div className="therapist_category questionI">
                            <input {...register("question", { required: true })} autocomplete="off" type="text" placeholder="Add Question" />
                        </div>
                        {errors.question?.type === "required" && <span className='error'>Question field is required</span>}
                        <div className="form-login setlessonChoice">
                            <div className="choice mar-27">
                                <input {...register("option1", { required: true })} autocomplete="off" type="text" id="choice1" placeholder="Choice 1" /><input {...register("answers", { required: true })} value='1' type="radio" />
                            </div>
                            <div className="choice mar-27">
                                <input {...register("option2", { required: true })} autocomplete="off" type="text" id="choice2" placeholder="Choice 2" /><input {...register("answers", { required: true })} value='2' type="radio" />
                            </div>
                            <div className="choice mar-27">
                                <input {...register("option3", { required: true })} autocomplete="off" type="text" id="choice3" placeholder="Choice 3" /><input {...register("answers", { required: true })} value='3' type="radio" />
                            </div>
                            <div className="choice">
                                <input {...register("option4", { required: true })} autocomplete="off" type="text" id="choice4" placeholder="Choice 4" /><input {...register("answers", { required: true })} value='4' type="radio" />
                            </div>
                            {errors.option4?.type === "required" && <span className='error'>Checkbox fields are required</span>}
                            {errors.option1?.type === "required" && <span className='error'>Choice fields are required</span>}
                        </div>
                        <div className='questionBtn'>
                            <input onClick={handleSubmit(onSubmit)} className="optBtnSet" value={"Add question"} style={{ zIndex: "99" }} />
                        </div>
                    </form>

                    
                </div>
            </div>
        </div>
    )
}
