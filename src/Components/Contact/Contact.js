import React from "react";
import "./Contact.css";
export default function Contact() {
  return (
    <div className="body">
      <section class="contact_wrapper">
        <div class="contact_info">
          <h3 class="title">Contact Info</h3>

          <ul class="icons_wrapp">
            <li>
              <div class="icon">
                <span class="material-icons-outlined"> place </span>
              </div>
              <div class="text">
                Nambardar Farm House, near Lloyed collage , knowledge park 3,{" "}
                <br />
                Gr.Noida ,UP
              </div>
            </li>
            <li>
              <div class="icon">
                <span class="material-icons-outlined"> mail_outline </span>
              </div>
              <div class="text">info@bfsmart.in</div>
            </li>
            <li>
              <div class="icon">
                <span class="material-icons-outlined"> phone_in_talk </span>
              </div>
              <div class="text">8585980008</div>
            </li>
            <li>
              <div class="text">8585924455 (Whatsapp)</div>
            </li>
          </ul>

          <ul class="soci_wrap">
            <li>
              <a href="#">
                <span class="material-icons-outlined"> facebook </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="material-icons-outlined"> face </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="material-icons-outlined"> facebook </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="material-icons-outlined"> face </span>
              </a>
            </li>
          </ul>
        </div>

        <div class="contact_msg">
          <h3 class="title">Send a Message</h3>
          <form action="https://formspree.io/f/mbjwdwal" method="POST">
            <div class="form_fild">
              <div class="input_group w_50">
                <input name="First Name" type="text" class="input" required />
                <label class="placeholder">First Name</label>
              </div>

              <div class="input_group w_50">
                <input name="second name" type="text" class="input" required />
                <label class="placeholder">Last Name</label>
              </div>

              <div class="input_group w_50">
                <input name="_replyto" type="text" class="input" required />
                <label class="placeholder">Emal Address</label>
              </div>

              <div class="input_group w_50">
                <input name="number" type="tel" class="input" required />
                <label class="placeholder">Mobile Number</label>
              </div>

              <div class="input_group w_100">
                <textarea
                  name="message"
                  class="input input_textarea "
                  rows="6"
                  required
                ></textarea>
                <label class="placeholder textarea">
                  Write your message here...
                </label>
              </div>

              <div class="input_group">
                <input type="submit" class="btn" value="Send" />
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
