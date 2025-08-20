import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row border-top py-5">
        <h1 className="fs-3 text-center">People</h1>
      </div>

      <div className="row text-muted fs-6">
        <div className="col text-center">
          <img
            src="media/images/profile-pic-bw.jpg" alt="owner-picture"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h5 className="mt-5">Md. Abdul Sattar</h5>
          <p>Web Developer</p>
        </div>

        <div className="col">
          <p>
            Hi, I&apos;m a passionate developer with a keen interest in building
            web applications that solve real-world problems and offer smooth
            user experiences. I enjoy working on full-stack projects that
            involve clean UI, smart logic, and real-time interactivity.
          </p>
          <p>
            This project, Stockify, is a personal initiative to replicate the
            functionality of stock trading platforms like Zerodha. Through it,
            I&apos;m exploring modern web technologies like React, Node.js, REST
            APIs, and more—while also diving deeper into financial market
            concepts.
          </p>
          <p>
            Always open to feedback, collaboration, and new ideas!
            <br />
            Connect-

            {/* social links */}
            <a
              className="text-decoration-none px-2"
              href="https://x.com/Abdul03807937"
            >
              X (Twitter)
            </a>
            |
            <a
              className="text-decoration-none px-2"
              href="https://www.linkedin.com/in/md-abdul-sattar/"
            >
              LinkedIn
            </a>
            |
            <a
              className="text-decoration-none px-2"
              href="mailto:masattar.sunny@gmail.com"
            >
              Email
            </a>
          </p>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default Team;
