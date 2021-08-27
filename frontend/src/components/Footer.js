import React from 'react'

export default function Footer() {

  return (
    <footer>
      
      <div className="row center social-icon">
        <span>
          <a href="#facebook"><i className="fab fa-facebook"></i></a>
        </span>
        <span>
          <a href="#instagram"><i className="fab fa-instagram"></i></a>
        </span>
        <span>
          <a href="#youtube"><i className="fab fa-youtube"></i></a>
        </span>
        <span>
          <a href="#github"><i className="fab fa-github"></i></a>
        </span>
      </div>
    

      
      <div className="row center">
        <div className="footer-bottom">
          <p> © 2021. All Rights Reserved |  Design by Huynh Minh Thong.</p>
          <p className="text-center"> Data from <span><a  href="http://chuongtailor.com.vn/" target="_blank" rel="noreferrer">Chương Tailor</a></span>.</p>
        </div>
      </div>
    </footer>
  )
}
