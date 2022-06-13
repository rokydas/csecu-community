import styles from "../ProfileBlogs/ProfileBlogs.module.scss";

const ProfileResearch = ({ researchs }) => {
  return (
    <div className="container">
      <div className="row">
        {researchs.map((research) => (
          <div className="col-md-4">
            <div className={styles.band}>
              <div className={styles.card}>
                <img className={styles.thumb} src={research.img} alt="" />
                <article>
                  <h6 className={styles.publisher_Name}>{research.publisherName} </h6>
                  <h6 className={styles.date}>{research.date}</h6>
                  <h5 className={styles.research_title}>{research.title}</h5>
                  <p className={styles.research_desc}>{research.description.substring(0, 100)} </p>
                </article>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileResearch;
