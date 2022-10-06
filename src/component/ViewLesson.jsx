import { useState } from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getLessonbyId } from "../Services/Lessons";

const ViewLesson = () => {
    const [data, setData] = useState()
    const [video, setVideo] = useState([])
    let { id } = useParams();
    const getLessonbyIdFunc = async () => {
        const resp = await getLessonbyId(id)
        setData(resp.data.data)
        setVideo(resp.data.data.lessonVideos)
        console.log(resp)
    }
    useEffect(() => {
        getLessonbyIdFunc()
    }, [])

    return (
        <div>
            <div className="mainDashboard side_dashboard_container">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/manage-lesson" className="dashboardHeading arrowbefore">
                            <img src="/assets/images/Icon ionic-ios-arrow-back.svg" alt="" />
                            <h2>View Lesson</h2>
                        </Link>
                    </div>
                </div>
                <div className="users-table set3">
                    <div className="users-table-container set-4">
                        <div className="user-table-head setTH">
                            <div className="userHeading">
                                <h2>Lesson Information</h2>
                            </div>

                        </div>
                        {/* className="therapist_detail" */}
                        <Row className="setViewL">
                            
                            <Col md={4} style={{ width: "13%" }} className="therapist_list">
                                <h3>Day Number</h3>
                                <p>{data?.dayNumber}</p>
                            </Col>
                            {/* <div className="therapist_list">
                                <h3>Lesson Category</h3>
                                <p>Lorem Ipsum</p>
                            </div>
                            <div className="therapist_list setl">
                                <h3>File Type</h3>
                                <div><img src="/assets/images/lessons/fileType.png" alt="" /></div>
                            </div> */}
                            {/* <div className="therapist_list"> */}
                            <Col md={8} style={{ width: "87%" }} className="therapist_list">
                                <h3>Description</h3>
                                <p>{data?.lessonDescription}</p>
                            </Col>
                            {/* <div className="lesson_mtySec">
                            </div> */}
                        </Row>
                        <div className="lessonVideoSeting">
                            {video?.map((item) => {
                                return <>
                                    <div className='btn setbtn setforView'>
                                        <img src="/assets/images/View Password.svg" alt="" />
                                        <a href={item.videoPath}>View Video</a>
                                    </div>
                                </>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewLesson;