import "./AchievementSection.css";

const companies = [
  { name: "Cruise", url: "https://getcruise.com" },
  { name: "DoorDash", url: "https://doordash.com" },
  { name: "Roblox", url: "https://roblox.com" },
  { name: "Honey", url: "https://joinhoney.com" },
  { name: "Peloton", url: "https://onepeloton.com" },
  { name: "Meesho", url: "https://www.meesho.com" },
  { name: "Amazon", url: "https://www.amazon.com" },
  { name: "Zomato", url: "https://www.zomato.com" },
  { name: "Swiggy", url: "https://www.swiggy.com" },
  { name: "Flipkart", url: "https://www.flipkart.com" },
  { name: "Google", url: "https://www.google.com" },
  { name: "Netflix", url: "https://www.netflix.com" },
  { name: "Microsoft", url: "https://www.microsoft.com" },
  { name: "Clinikally", url: "https://www.clinikally.com" },
  { name: "Infosys", url: "https://www.infosys.com" },
  { name: "Adobe", url: "https://www.adobe.com" },
  { name: "Uber", url: "https://www.uber.com" },
];

const AchievementSection = () => {
  return (
    <section className="achievement">
      <div className="achievement-container">
        {/* Stats */}
        <div className="stats">
          <div className="stat">
            <h2>10M+</h2>
            <p>Verified Matches</p>
          </div>

          <div className="stat">
            <h2>100K+</h2>
            <p>Active Job Listings</p>
          </div>

          <div className="stat">
            <h2>15M+</h2>
            <p>Career-Ready Professionals</p>
          </div>
        </div>

        <div className="divider"></div>

        {/* Companies Marquee */}
        <div className="marquee">
          <div className="marquee-track">
            {companies.concat(companies).map((company, index) => (
              <a
                key={index}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`company company-${index % companies.length}`}
              >
                {company.name}
              </a>
            ))}
          </div>
        </div>

        <p className="startup-text">The Platform Behind Growing Companies</p>
      </div>
    </section>
  );
};

export default AchievementSection;
