import { useEffect, useState } from 'react';
import { uploadFile } from '../Services/Lessons';
import { useForm } from "react-hook-form";
import uuid from 'react-uuid';
import TimePicker from 'react-time-picker';

const VideosOfLessons = ({ videos, setVideos }) => {
    const Swal = require('sweetalert2')
    const [durationValue, setDurationValue] = useState('00:00');

    // img uplod
    const [picture1, setPicture1] = useState()

    const imagesPreview1 = (e) => {
        if (e.target.files[0]) {
            setPicture1(e.target.files[0])
        }
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // uplaod video
    const [picture, setPicture] = useState()
    const [imgData, setImgData] = useState()
    const imagesPreview = (e) => {
        if (e.target.files[0]) {
            setPicture(e.target.files[0])
            const reader = new FileReader();
            reader.onload = function (e) {
                setImgData(true)
            };
            reader.readAsDataURL(e.target.files[0])
        } else {
            setImgData(false)
        }
    }

    const [loder, setLoder] = useState(false)

    // if (picture1 !== null && picture !== null){
    // getting form data
    const onSubmit = async (data) => {
        setLoder(true)

        // upload img
        const formData1 = new FormData();
        formData1.append("", picture1);
        const imageResponse = await uploadFile(formData1);
        // data.ImagePath = imageResponse.data.data.filePath;

        // upload video
        const formData3 = new FormData();
        formData3.append("", picture);
        const videourl = await uploadFile(formData3);
        // data.videoPath = videourl.data.data.url;

        // validation for files
        if (imageResponse.status === 400 || videourl.status === 400) {
            Swal.fire({
                title: "Files are missing",
                timer: 1400,
                icon: 'error',
                showConfirmButton: false,
            })
            setLoder(false)
        }

        const v = [...videos];
        v.push({
            id: uuid(),
            videoPath: videourl.data.data.url,
            videoThumbnail: imageResponse.data.data.url,
            videoTitle: data.videoTitle,
            duration: durationValue
        })
        setVideos(v);
        reset({ videoTitle: "" });
        setDurationValue('00:00:00')
        setImgData('')
        setPicture1('')
        document.querySelector('.form_input_videos').reset()
        setLoder(false)
    }

    return (
        <div>
            <form className='form_input_videos'>
                <div className="user-table-head">
                    <div className="userHeading">
                        <h2>Upload Lesson Detail's</h2>
                    </div>
                </div>
                <div className='dFlex'>
                    <div className="therapist_name">
                        <input autocomplete="off" type="text" name="uname" placeholder="Video Title" {...register("videoTitle", { required: true })} />
                    </div>
                    {errors.videoTitle && <span className='eror'>This field is required</span>}
                    <div className="therapist_name">
                        <input type="file" className='uploadFile' accept="image/*" onChange={imagesPreview1} required="true" />
                    </div>
                    {/* <div className="therapist_name">
                        <input className='durationInput' type="time"  {...register("duration", { required: true })} />
                    </div>
                    {errors.duration && <span className='eror'>This field is required</span>} */}
                    <div className='durationKLye'>
                        <TimePicker onChange={setDurationValue} value={durationValue} format="mm:ss" clearIcon={true} clockIcon={false} disableClock={true} required={true} />
                    </div>
                </div>
                <div className="lessonDetailsBtn">
                    <div className='hiddenField'>
                        <label htmlFor="v" />
                        <input accept=".mp4" id="v" type="file" onChange={imagesPreview} required="true" />
                        {imgData ? <img className='sizeSet' src='/assets/images/tick1.png' alt='' /> : ""}
                    </div>
                    <button className='uploadBtn'><img src="/assets/images/Upload Video Icon.svg" alt="" /></button>
                </div>
                <div className='addLEssonBtnDiv'>
                    {
                        (loder === true) ?
                            <div className="relative">
                                <div className="loader alignAdd"></div>
                                <button className="bttn addLEssonBtn" onClick={handleSubmit(onSubmit)}>Save</button>
                            </div>
                            :
                            <button className="bttn addLEssonBtn" onClick={handleSubmit(onSubmit)} >Save</button>
                    }
                </div>
            </form>
        </div >
    );
}

export default VideosOfLessons