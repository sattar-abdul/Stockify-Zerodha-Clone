import React from "react";

function Universe() {
  return (
    <div className="container mt-5 pt-5 text-center">
      <div className="row m-3">
        <h2>The Stockify Universe</h2>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
      </div>
      <div className="row mt-5">
        <div className="col-4 ">
          <img src="media/images/smallcaseLogo.png" style={{height:"30%"}} alt="small-case"/>
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-4">
          <img src="media/images/streakLogo.png" style={{height:"30%"}} alt="streak"/>
          <p className="text-small text-muted">Algo & strategy platform</p>
        </div>
        <div className="col-4">
          <img src="media/images/sensibullLogo.svg" style={{height:"20%"}} alt="sensi-bull"/>
          <p className="text-small text-muted pt-1">Options trading platform</p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-4">
          <img src="media/images/zerodhaFundhouse.png" style={{height:"30%"}} alt="zerodha-Fundhouse"/>
          <p className="text-small text-muted">Asset management</p>
        </div>
        <div className="col-4">
          <img src="media/images/goldenpiLogo.png" style={{height:"30%"}} alt="golden-pi"/>
          <p className="text-small text-muted">Bonds trading platform</p>
        </div>
        <div className="col-4">
          <img src="media/images/dittoLogo.png" style={{width:"30%"}}/>
          <p className="text-small text-muted pt-1">Insurance</p>
        </div>
      </div>

      <button className='p-2 btn btn-primary fs-6 mb-5' style={{width:"12%", margin: "0 auto"}}>Signup Now</button>
    </div>
  );
}

export default Universe;
