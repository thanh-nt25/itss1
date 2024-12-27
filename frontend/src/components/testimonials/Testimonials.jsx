import React from "react";
import "./testimonials.css";

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "Jisoo",
      position: "Vietnamese",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/9/29/1099051/209419948_8601681615.jpg",
    },
    {
      id: 2,
      name: "Jennie",
      position: "Japanese",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/6/12/1055592/Ef6eiswu0aetb9s.jpeg",
    },
    {
      id: 3,
      name: "Rosé",
      position: "Japanese",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://hopamchuan.com/node/get_artist_image/rose__blackpink_",
    },
    {
      id: 4,
      name: "Lisa",
      position: "Vietnamese",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://danviet.mediacdn.vn/296231569849192448/2024/8/23/lisa-new-solo-music-1724390421650756540387.jpg",
    },
  ];
  return (
    <section className="testimonials">
      <h2>What our students say</h2>
      <div className="testmonials-cards">
        {testimonialsData.map((e) => (
          <div className="testimonial-card" key={e.id}>
            <div className="student-image">
              <img src={e.image} alt="" />
            </div>
            <p className="message">{e.message}</p>
            <div className="info">
              <p className="name">{e.name}</p>
              <p className="position">{e.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
