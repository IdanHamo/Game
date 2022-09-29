import background from "../../images/firstBackground.png";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-first-section">
          <div className="home-first-section-container container ">
            <div className="home-lang h4 mt-5 ">English language project</div>
            <h1 className="text-white my-5 home-headline">
              Silkroad Online <br />
              Server
            </h1>

            <div className="home-description ps-3 text-white h3 ">
              Join our project and shine with us
            </div>
            <div className="btn-container ps-5 ">
              <Link
                to="/registration"
                className="registration-btn  col-md-3 col-sm-10 col-10 me-4"
              >
                Register
              </Link>
              <Link
                to="/login"
                className=" login-btn   col-md-3 col-sm-10 col-10"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="second-section">
        <h2 className="second-headline text-center mt-5 ">
          Server On
          <span className="second-headline-span"> Stages Of Development</span>
        </h2>
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-lg-6  text-white">
              <hr className="mt-5 hr" />
              <h3 className="third-headline py-4">
                REAL <span className="third-headline-span">PLAY2WIN</span>
              </h3>
              <p>
                Our project was created by Silkroad Online players, we really
                care about your gaming experience and do our best to make you
                feel comfortable playing
              </p>
            </div>
            <div className="col-md-10 col-lg-6 d-flex justify-content-center text-white">
              <h3>Real Play2Win</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
