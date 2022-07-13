import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating'
import { AuthContext } from '../../../App';

const Review = () => {

    const authToken = localStorage.getItem("auth-token");

    const [loggedInUser] = useContext(AuthContext)

    const [research, setResearch] = useState({})
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState("")
    const [isApproved, setIsApproved] = useState(false)
    const { id } = useParams()
    const [isReviewed, setIsReviewed] = useState(false)

    console.log(rating, description, isApproved)

    const handleRating = (rate) => {
        setRating(rate)
    }

    const handleReviewSubmit = (e) => {
        e.preventDefault()

        const review = {
            rating: (rating / 20) + "", description, isApproved,
            teacherId: loggedInUser._id,
            teacherName: loggedInUser.name,
            teacherImg: loggedInUser.img,
            researchId: id
        }
        console.log(review)

        fetch("http://localhost:5000/review/add", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                alert(data.msg)
                if (data.success) {
                    setIsReviewed(true)
                }
            })
            .catch(err => console.log(err))

    }

    useEffect(() => {
        fetch(`http://localhost:5000/research/single/${id}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        })
            .then(res => res.json())
            .then(data => setResearch(data.research))
    }, [])

    return (
        <div className='container'>
            <h3>Title: {research.title}</h3>
            <p>{research.description}</p>
            <h5>Publisher: {research.publisherName}</h5>
            <h5>{research.date}</h5>
            <h5>Research Paper</h5>
            <br />

            {!isReviewed && <div>
                <h3>Add your review:</h3>
                <form onSubmit={handleReviewSubmit} className='d-flex justify-content-center'>
                    <div className='text-center'>
                        <Rating onClick={handleRating} ratingValue={rating} /> <br /> <br />
                        <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder='Add your review' className='form-control' name="description" cols="70" rows="5"></textarea>
                        <input
                            type="checkbox"
                            checked={isApproved}
                            onChange={(e) => setIsApproved(e.target.checked)}
                        />
                        <span> Approve</span> <br /> <br />
                        <button className='custom-btn'>Submit</button>
                    </div>
                </form>
            </div>}
        </div>
    );
};

export default Review;