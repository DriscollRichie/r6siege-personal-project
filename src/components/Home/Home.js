import React from "react";
import "./Home.css";
import season8ProLeague from "../../assets/update season 8_327987.jpg";
import challengePic from "../../assets/r6s_memorialdaychallenge-thumb-960x540_324916.jpg";

export default function Home() {
  return (
    <div className="homepage-contents">
      <div className="home-image-1">
        <div id="text-container">
          <h1 className="box-title-text">OPERATION PARA BELLUM LIVE NOW</h1>
          <span className="box-text">
            Two new operators and a new map are now available. Team Rainbow is
            deploying Maestro and Alibi in the villa of one of the most
            dangerous crime families.
          </span>
        </div>
      </div>
      <div className="home-image-2">
        <div id="text-container-2">
          <h1 className="box-title-text">LATEST NEWS</h1>
          <div className="pro-league-box">
            <img src={season8ProLeague} width="120px" alt=''/>
            <span>SEASON 8 PRO LEAGUE KICKS OFF ON JUNE 18TH!</span>
          </div>
          <div className="challenge-box">
            <img src={challengePic} width="120px" alt='' />
            <span>
              NEW WEEKLY IN-GAME CHALLENGES COMING TO RAINBOW SIX SIEGE - MAY
              22ND, 2018
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
