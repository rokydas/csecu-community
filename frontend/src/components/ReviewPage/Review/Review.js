import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating'
import { AuthContext } from '../../../App';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SingleReview from '../SingleReview/SingleReview';

const Review = () => {

    const authToken = localStorage.getItem("auth-token");

    const [loggedInUser] = useContext(AuthContext)

    const [research, setResearch] = useState({})
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("Approve")
    const { id } = useParams()
    const [isReviewed, setIsReviewed] = useState(false)
    const [reviews, setReviews] = useState([])
    const [needUpdate, setNeedUpdate] = useState(false)

    const handleRating = (rate) => {
        setRating(rate)
    }

    const handleReviewSubmit = (e) => {
        e.preventDefault()

        const review = {
            rating: (rating / 20) + "", description, status,
            teacherId: loggedInUser._id,
            teacherName: loggedInUser.name,
            teacherImg: loggedInUser.img,
            researchId: id
        }
        console.log(review)

        fetch("https://csecu-community.herokuapp.com/review/add", {
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
                    setNeedUpdate(!needUpdate)
                }
            })
            .catch(err => console.log(err))

    }

    useEffect(() => {
        fetch(`https://csecu-community.herokuapp.com/research/single/${id}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        })
            .then(res => res.json())
            .then(data => setResearch(data.research))

        fetch(`https://csecu-community.herokuapp.com/review/all`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                setReviews(data.reviews)
                if (data.reviews.length == 5) {
                    setIsReviewed(true)
                }
            })

    }, [needUpdate])

    const reviewBoxStyle = {
        backgroundColor: "#f5f5f5"
    }

    return (
        <div className='container'>
            <div className='text-center my-3'>
                <h3>Title: {research.title}</h3>
                <p>{research.description}</p>
                <h5>Publisher: {research.publisherName}</h5>
                <h5>{research.date}</h5>
                <h5>Research Paper</h5>
            </div>
            <br />

            <h3 className='text-center mb-4'>Teacher's Review</h3>

            {
                reviews.map(review => <SingleReview review={review} />)
            }

            {!isReviewed && <div style={reviewBoxStyle} className="my-5 p-5">
                <h3 className='text-center'>Add your review:</h3>
                <form onSubmit={handleReviewSubmit} className='d-flex justify-content-center'>
                    <div className='my-3 w-75'>

                        <h5>Rating:</h5>
                        <Rating onClick={handleRating} ratingValue={rating} /> <br /> <br />

                        <h5>Review</h5>
                        <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder='Add your review' className='form-control' name="description" cols="70" rows="5"></textarea>

                        <br />
                        <div className='d-flex'>
                            <h5 className='me-3 mt-1'>Status:</h5>

                            <DropdownButton title={status} variant="primary">
                                <Dropdown.Item onClick={() => setStatus("Approve")} >Approve</Dropdown.Item>
                                <Dropdown.Item onClick={() => setStatus("Decline")} >Decline</Dropdown.Item>
                                <Dropdown.Item onClick={() => setStatus("Need Revision")}>Need Revision</Dropdown.Item>
                            </DropdownButton>
                        </div> <br />

                        <button className='custom-btn'>Submit</button>
                    </div>
                </form>
            </div>}
        </div>
    );
};

export default Review;