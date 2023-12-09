import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styleSheets/footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="row-container">
        <div className="col-container footer-wrapper1">
          <img src="logo4.png" width="50vw" alt="logo" />
          <span>이웃과 돕고돕는 커뮤니티 돕돕</span>
          <hr />
          <span>Copyright &#169; dobdob 2021</span>
        </div>
        <div className="col-container footer-wrapper2">
          <h2>
            CONTACT <FontAwesomeIcon icon={faPhone} />
          </h2>
          <span>runru1030@gmail.com</span>
          <span>+82. 02-xxx-xxxx</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
