import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { getLessonbyId, updateLesson } from '../Services/Lessons';
import { useForm } from "react-hook-form";
import RichTextEditor from 'react-rte';
import { useNavigate } from "react-router-dom";
import EditVideosOfLesson from './EditVideosOfLesson';

const Edit_Lessons = () => {
    const Swal = require('sweetalert2')
    const navigate = useNavigate();
    let { id } = useParams();
    const [loder, setLoder] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit1 = async (formData) => {
        debugger
        setLoder(true)
        const data = {
            lessonId: parseInt(id),
            dayNumber: parseInt(formData.dayNumber),
            lessonDescription: formData.lessonDescription,
            lessonVideos: videosDetail,
            lessonAssessments: [{
                lessonAssessmentId: parseInt(id),
                lessonId: parseInt(id),
                assessmentString: assessmentData.value._cache.html
            }]
        }
        const response = await updateLesson(data)

        if (response.data.code === 1) {
            Swal.fire({
                title: 'Lesson Updated',
                timer: 1400,
                icon: 'success',
                showConfirmButton: false,
            })
            setTimeout(() => {
                navigate("/manage-lesson");
            }, 2000);
        } else {
            Swal.fire({
                title: response.data.data.message,
                timer: 1400,
                icon: 'error',
                showConfirmButton: false,
            })
            setLoder(false)
        }
    }

    // typing html like tag
    const toolbarConfig = {
        // Optionally specify the groups to display (displayed in the order listed).
        display: [
            "INLINE_STYLE_BUTTONS",
            "BLOCK_TYPE_BUTTONS",
            "LINK_BUTTONS",
            "BLOCK_TYPE_DROPDOWN",
            "HISTORY_BUTTONS",
        ],
        INLINE_STYLE_BUTTONS: [
            { label: "Bold", style: "BOLD", className: "custom-css-class" },
            { label: "Italic", style: "ITALIC" },
            { label: "Underline", style: "UNDERLINE" },
        ],
        BLOCK_TYPE_DROPDOWN: [
            { label: "Normal", style: "unstyled" },
            { label: "Heading Large", style: "header-one" },
            { label: "Heading Medium", style: "header-two" },
            { label: "Heading Small", style: "header-three" },
        ],
        BLOCK_TYPE_BUTTONS: [
            { label: "UL", style: "unordered-list-item" },
            { label: "OL", style: "ordered-list-item" },
        ],
    };
    const [assessmentData, setAssessmentData] = useState({
        value: RichTextEditor.createEmptyValue()
    })
    const fileConvert = (value) => {
        if (value) {
            value.toString("html");
        }
        setAssessmentData({ value });
    };

    // state for video detail section 
    const [videosDetail, setVideosDetail] = useState([])

    // deleting lesson vdeio
    const deleteQ = (item) => {
        debugger
        const delQ = videosDetail.filter((x) => {
            return x.lessonVideoId !== item
        })
        setVideosDetail(delQ)
    }
    // getting data on edit
    const getLessonbyIdFunc = async () => {
        const resp = await getLessonbyId(id)
        setVideosDetail(resp.data.data.lessonVideos)
        // typing html like tag
        let finalData = {
            value: RichTextEditor.createValueFromString(resp.data.data.lessonAssessments[0]?.assessmentString, "html")
        }
        setAssessmentData(finalData)
        // ended 
        reset(resp.data.data)
    }
    useEffect(() => {
        getLessonbyIdFunc()
    }, [])

    return (
        <div className="mainDashboard side_dashboard_container">
            <form onSubmit={handleSubmit(onSubmit1)}>
                <div className="row">
                    <div className="col-md-12">
                        <Link className="dashboardHeading arrowbefore" to="/manage-lesson">
                            <img src="/assets/images/Icon ionic-ios-arrow-back.svg" alt="" />
                            <h2>Edit Lesson</h2>
                        </Link>
                    </div>
                </div>
                <div className="users-table set3">
                    <div className="users-table-container">
                        <div className="user-table-head">
                            <div className="userHeading">
                                <h2>Lesson Details</h2>
                            </div>
                        </div>

                        <div className="form-login set2 setlesson">
                            <div className="therapist_name">
                                <input autocomplete="off" type="number" name="uname" placeholder="Day Number" {...register("dayNumber", { required: true })} />
                            </div>
                        </div>
                        {errors.dayNumber && <span className='eror'>This field is required</span>}
                        <div className="lessonDescr">
                            <textarea autocomplete="off" name="comment" form="usrform" placeholder="Lesson Description" {...register("lessonDescription", { required: true })} ></textarea>
                        </div>
                        {errors.lessonDescription && <span className='eror'>This field is required</span>}
                        <EditVideosOfLesson lessonId={id} setVideos={setVideosDetail} videos={videosDetail} />
                    </div>
                </div>

                {/* <QuestionsSection setdata={setQuestions} data={questions} /> */}
                <div className="users-table">
                    <div className="users-table-container">
                        <div className="user-table-head">
                            <div className="userHeading">
                                <h2>Lesson Video List</h2>
                            </div>
                        </div>
                        <div className='user-table-body'>
                            <div className='userAccess'>
                                <div className='accessHead'>
                                    <h4>Duration</h4>
                                </div>
                                <div className='accessHead'>
                                    <h4>Video Title</h4>
                                </div>
                                <div className='accessHead'>
                                    <h4>Video Path</h4>
                                </div>
                                <div className='accessHead'>
                                    <h4>Video Thumbnail</h4>
                                </div>
                                <div className='accessHead'>
                                    <h4>Delete</h4>
                                </div>
                            </div>

                            {videosDetail.map((x) => {
                                return <>
                                    <div style={{ backgroundColor: "#04305D" }} className='userAccess'>
                                        <div className='accessHead'>
                                            <h4 style={{ color: "white" }}>{x.duration}</h4>
                                        </div>
                                        <div className='accessHead'>
                                            <h4 style={{ color: "white" }}>{x.videoTitle}</h4>
                                        </div>
                                        <div className='accessHead'>
                                            <h4 style={{ color: "white" }}>{x.videoPath}</h4>
                                        </div>
                                        <div className='accessHead'>
                                            <h4 style={{ color: "white" }}>{x.videoThumbnail}</h4>
                                        </div>
                                        <div className='accessHead'>
                                            <img className="del-img" onClick={() => { deleteQ(x.lessonVideoId) }} src="/assets/images/del_Icon.svg" alt="" />
                                        </div>
                                    </div>
                                </>
                            })}
                        </div>
                    </div>
                </div>


                <div className="users-table">
                    <div className="users-table-container">
                        <div className="user-table-head">
                            <div className="userHeading">
                                <h2>Assessment Question</h2>
                            </div>
                        </div>
                        <div className='user-table-body'>
                            <RichTextEditor
                                toolbarConfig={toolbarConfig}
                                value={assessmentData?.value}
                                onChange={(e) => fileConvert(e)}
                            />
                        </div>
                    </div>
                </div>
                <div className="buttonSet">
                    <Link className="bttn setb" to="/manage-lesson">Cancel</Link>
                    {
                        (loder >= true) ?
                            <div className="relative">
                                <div className="loader alignLoader"></div>
                                <button className="bttn bttn-bg" type="submit" >Update</button>
                            </div>
                            :
                            <button className="bttn bttn-bg" type="submit" >Update</button>
                    }
                </div>
            </form>
        </div >
    );
}

export default Edit_Lessons;