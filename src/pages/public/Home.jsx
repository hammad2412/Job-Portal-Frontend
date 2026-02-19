import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Home.css";
import HeroSection from "../../components/home/HeroSection";
import ConnectSection from "../../components/home/ConnectSection";
import AchievementSection from "../../components/home/AchievementSection";
import How from "../../components/home/How";
import Benefits from "../../components/home/Benefits";
import ReviewSection from "../../components/home/ReviewSection";
import JobFilterBar from "../../components/home/JobFilterBar";
import Footer from "../../components/home/Footer";
import Navbar from "../../components/home/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      if (user.role === "candidate") {
        navigate("/candidate");
      } else {
        navigate("/recruiter/dashboard");
      }
    }
  }, [user, navigate]);

  return (
    <div className="home-page">
      <Navbar />
      <HeroSection />
      <ConnectSection />
      <How />
      <Benefits />
      <AchievementSection />
      <ReviewSection />
      <JobFilterBar />
      <Footer />
    </div>
  );
};

export default Home;
