import styles from "../Footer/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/dist/client/link";


function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footContent}>
        <div className={styles.socialLinks}>
          <a
            href="https://www.instagram.com/julieyudowitch"
            passHref
            className={styles.navlink}
            target="blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              className={styles.socialLink}
              color="rgb(227, 238, 242)"
              icon={faInstagram}
              size="2x"
            />
          </a>
          <a
            href="https://twitter.com/YudowitchJulie"
            passHref
            className={styles.navlink}
            target="blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              className={styles.socialLink}
              color="rgb(227, 238, 242)"
              icon={faTwitter}
              size="2x"
            />
          </a>
          <a
            href="https://www.tiktok.com/@julie_yudowitch"
            passHref
            className={styles.navlink}
            target="blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              className={styles.socialLink}
              color="rgb(227, 238, 242)"
              icon={faTiktok}
              size="2x"
            />
          </a>
        </div>
        <p className={styles.copyright}>
          &copy;{new Date().getFullYear()} JULIE YUDOWITCH | ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
}

export default Footer;
