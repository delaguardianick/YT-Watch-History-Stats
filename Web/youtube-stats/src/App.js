import './App.css';
// import './dist/output.css';
import { useState, useEffect, useRef} from 'react';

function App() {
  const [plots, setPlots] = useState({});
  const inputTakeoutRef = useRef(null);
  const [takeoutStats, setDataFrameStats] = useState({});

  const getAllPlotsUrl = async () => {
    const response = await fetch('http://localhost:8000/plots/all');
    const data = await response.json();
    setPlots(data);
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    // TODO: Display the plots
    calcExtraInfo()
  };

  const calcExtraInfo = async () => {
    const response = await fetch('http://localhost:8000/upload/advanced');
    const data = await response.json();
  };
  
  const getDataFrameStats = async () => {
    const response = await fetch('http://localhost:8000/stats');
    const data = await response.json();
    setDataFrameStats(data)
  };

  useEffect(() => {
    getAllPlotsUrl();
    getDataFrameStats()
  }, []);

  return (
  
  <div className="body">

    {/* <!-- ======= Header ======= --> */}
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center justify-content-between">

        <nav id="navbar" className="navbar">
          <ul>
          <div id="logo">
            <h1><a href=""><span>Youtube</span>Stats </a></h1>
            {/* <!-- Uncomment below if you prefer to use an image logo --> */}
            {/* <!-- <a href="index.html"><img src="assets/img/logo.png" alt="" title="" /></a>--> */}
          </div>
            <li><a className="nav-link scrollto active" href="">Home</a></li>
            <li><a className="nav-link scrollto" href="#help">Help</a></li>
            <li><a className="nav-link scrollto" href="#contact">Github</a></li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>

      </div>
    </header>

    <main id="main">
      <div className="main-container">

        {/* <!-- ======= Hero Section ======= --> */}
        <section id="hero" className='hero-section'>
          <div className="hero-container hero-left" data-aos="fade-in">
            <h1>Watch History Analysis</h1>
            <h2>Analyze your youtube watch trends</h2>
          </div>
          <div className="hero-container hero-right" data-aos="fade-in">
          <label onChange={handleFileSelect} htmlFor="formId" className="btn-get-started scrollto">
                Upload Takeout
                <input name="" type="file" id="formId" hidden />
            </label>
            <div className='date-picker' >
              <label for="start" className='date-start'>Start date:</label>
                <input type="date" id="start" name="trip-start"
                    value={takeoutStats.start_date}
                    min={takeoutStats.start_date} max={takeoutStats.end_date}>
                </input>
              <label for="end" className='date-end'>End date:</label>
                <input type="date" id="end" name="trip-end"
                    value={takeoutStats.end_date}
                    min={takeoutStats.start_date} max={takeoutStats.end_date}>
              </input>
            </div>
          </div>
        </section>

        {/* <!-- ======= Plots Section ======= --> */}

        <section id="plots">
          <div className="plots-container">
            <div className="div1 plot-image">
              <span>Weekly</span>
              {plots && <img src={plots.weekly_avg} alt="" />}
            </div>
            <div className="div2 plot-image">
              <span>Daily</span>
              {plots && <img src={plots.hourly_avg} alt="" />}
            </div>
            <div className="div3 plot-image">
              <span>Monthly</span>
              {plots && <img src={plots.monthly_avg} alt="" />}

            </div>
            <div className="div4 plot-image">
              <span>Plot4</span>
              <img src="https://www.amcharts.com/wp-content/uploads/2019/10/demo_14593_none-7.png"></img>
            </div>
            <div className="div5 plot-image">
              <span>Plot5</span>
              <img src="https://www.amcharts.com/wp-content/uploads/2019/10/demo_14593_none-7.png"></img>
            </div>
            <div className="div6 plot-image">
              <span>Plot6</span>
              <img src="https://www.amcharts.com/wp-content/uploads/2019/10/demo_14593_none-7.png"></img>
            </div>
            <div className="div7 plot-image">
              <span>Plot7</span>
              <img src="https://www.amcharts.com/wp-content/uploads/2019/10/demo_14593_none-7.png"></img>
            </div>
            <div className="div8 plot-image">
              <span>Plot8</span>
              <img src="https://www.amcharts.com/wp-content/uploads/2019/10/demo_14593_none-7.png"></img>
            </div>
            <div className="div9 plot-image">
              <span>Plot9</span>
              <img src="https://www.amcharts.com/wp-content/uploads/2019/10/demo_14593_none-7.png"></img>
            </div>
          </div>
        </section>
      </div>
    </main>

    {/* <!-- ======= Footer ======= --> */}
    <footer className="footer">
      <div className="container">
        <div className="row">

          <div className="col-sm-6 col-md-3 col-lg-2">
            <div className="list-menu">

              <h4>About Us</h4>

              <ul className="list-unstyled">
                <li><a href="#">About us</a></li>
                <li><a href="#">Features item</a></li>
                <li><a href="#">Live streaming</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>

            </div>
          </div>

        </div>
      </div>

    </footer>

    <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>

    {/* <!-- Vendor JS Files --> */}
    <script src="assets/vendor/aos/aos.js"></script>
    <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
    <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
    <script src="assets/vendor/php-email-form/validate.js"></script>

    {/* <!-- Template Main JS File --> */}
    <script src="assets/js/main.js"></script>

  </div>

  );
}


export default App;
