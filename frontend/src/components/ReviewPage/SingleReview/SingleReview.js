import React from 'react';
import star from '../../../Assets/images/star.png'

const SingleReview = ({ review }) => {

    const reviewBoxStyle = {
        backgroundColor: "#f5f5f5"
    }

    const rating = parseInt(review.rating)
    const ratingArr = Array(rating).fill({})
    console.log(rating, ratingArr)

    return (
        <div style={reviewBoxStyle} className="p-3 m-2">
            <div className='d-flex my-2'>
                <img src={review.teacherImg} width="50" className='me-2' alt="" />
                <h5 className='me-5'>{review.teacherName}</h5>
                {review.status == "Approve" && <h5 style={{ color: "green" }}>Approved</h5>}
                {review.status == "Decline" && <h5 style={{ color: "red" }}>Declined</h5>}
                {review.status == "Need Revision" && <h5 style={{ color: "gray" }}>Need Revision</h5>}
            </div>
            <h4 >
                {
                    ratingArr.map(r => <img src={star} width="25px" alt="" />)
                }
            </h4>
            <p>{review.description}</p>
        </div>
    );
};

export default SingleReview;