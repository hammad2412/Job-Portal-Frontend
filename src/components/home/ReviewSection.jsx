import "./ReviewSection.css";

const reviews = [
  {
    company: "Desynova",
    text: "We were struggling to close key technical roles. Within weeks of using the platform, we were able to identify and onboard a highly qualified candidate without unnecessary back and forth.",
    name: "Tanu Bunker",
    role: "Senior HR Business Partner",
    location: "Mumbai, India",
  },
  {
    company: "Iksha Labs",
    text: "Finding strong engineering talent used to be time-consuming. The structured approach here reduced screening effort significantly and improved our offer conversion rate.",
    name: "Hiral Narwal",
    role: "CEO",
    location: "Bangalore, India",
  },
  {
    company: "Enparadigm",
    text: "The platform consistently delivers quality over quantity. We were able to move from sourcing to offer in under two weeks.",
    name: "Priyanka",
    role: "Senior Manager – HR",
    location: "Pune, India",
  },
  {
    company: "Vola Finance",
    text: "The experience has been seamless. The candidates we engaged with were aligned with our expectations and hiring standards.",
    name: "Himansh Kapoor",
    role: "Business Development Manager",
    location: "Delhi, India",
  },
  {
    company: "NocoDB",
    text: "As a founder, hiring efficiently is critical. This platform helped us secure two strong engineers within our target timeline.",
    name: "Chetan Pareek",
    role: "Founder",
    location: "Chennai, India",
  },
  {
    company: "Wohlig",
    text: "Pre-screened and relevant candidates helped our team reduce evaluation time while maintaining quality benchmarks.",
    name: "Gaurav Tiwari",
    role: "VP – Talent Acquisition",
    location: "Mumbai, India",
  },
  {
    company: "TechBridge",
    text: "The precision matching significantly reduced our dependency on external agencies while improving hiring accuracy.",
    name: "Arjun Mehta",
    role: "Head of Talent",
    location: "Hyderabad, India",
  },
  {
    company: "CoreAxis",
    text: "We appreciate the structured candidate profiles and the clarity it brings to decision-making across our hiring team.",
    name: "Pragati Lamba",
    role: "HR Director",
    location: "Gurgaon, India",
  },
];

const ReviewSection = () => {
  return (
    <section className="review-section">
      <div className="review-container">
        <h2 className="review-title">
          Trusted by growing teams and professionals
        </h2>

        <div className="review-grid">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className={`company-name company-${index}`}>
                {review.company}
              </div>

              <p className="review-text">{review.text}</p>

              <div className="review-meta">
                <p className="review-name">{review.name}</p>
                <p className="review-role">
                  {review.role}, {review.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
