import React from 'react'
import { IoStar, IoStarOutline } from "react-icons/io5";
import styles from '../../styles/componentCSS/review.module.css'
function ReviewComponent() {
    const review = {
        Rating: 3
    }
    return (
        <div className={styles.mainDiv}>
            <div className={styles.userDetails}>
                <span>Name</span>
                <div className={styles.ratingDiv}>
                    <span className={styles.stars}>{
                        Array.from({ length: review.Rating }).map((_, index) => (
                            <IoStar key={index} />
                        ))
                    }</span>
                    <span className={styles.stars}>{
                        Array.from({ length: 5 - review.Rating }).map((_, index) => (
                            <IoStarOutline key={index} />
                        ))
                    }</span>
                </div>
            </div>
            <div className={styles.reviewContent}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem accusamus vel impedit expedita rerum minus tempore, debitis consequuntur, quaerat incidunt assumenda illo voluptatum eaque voluptas reiciendis corrupti laboriosam facilis asperiores dicta in quam minima voluptate! Fuga facere fugit, consequatur vel facilis velit corporis veritatis tenetur autem! Illum repellendus laborum harum laudantium sed voluptatibus, libero esse eveniet vel deleniti repellat eligendi.
            </div>
        </div>
    )
}

export default ReviewComponent