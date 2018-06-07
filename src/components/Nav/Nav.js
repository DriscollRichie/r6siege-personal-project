import React from "react";
import "./Nav.css";
import logo from "../../assets/r6-logo.png";
import {Link} from 'react-router-dom'
import Donate from '../Donate/Donate'

export default function Nav() {
  return (
    <nav>
      <div className="nav-contents">
        <Link to='/account' className='account'><span>Account</span></Link>
        <Link to='/'><img src={logo} alt="" /></Link>
        <Link to='/forums' className='forums'><span>Forums</span></Link>
        <Donate/>
      </div>
    </nav>
  );
}
