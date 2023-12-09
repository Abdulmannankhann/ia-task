import React, { FC } from "react";
import SpectrumVideo from "../assets/videos/spectrum.mp4";

const Home: FC = () => {
  return (
    <div className="isar-container">
      <div className="video-container">
        <video src={SpectrumVideo} preload="autoplay" autoPlay playsInline loop muted className="spectrum__video object-cover object-center w-full h-full"></video>

        <div id="successfully-sent" className="overlay-text">
          <div className="text-center">
            <div className="mx-auto w-max">
              <div className="my-4 circle-decoration text-primary">Welcome to My Assignment!</div>
            </div>
            <p className="px-4">
              <strong>Dear Isar Aerospace Team, </strong>
              <br /> <br />I am thrilled for the opportunity to be considered for the <strong>Web Frontend Software</strong> at Isar Aerospace. Thank you for entrusting me with the chance to demonstrate my skills through the assigned task. You can find my solutions conveniently organized either via the navbar or the links below. I hope you enjoy
              reviewing my work, and I am eager to discuss any aspects further with you. <br />
              <br />
              Best regards,
              <br /> <strong>Abdul Mannan Khan</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
