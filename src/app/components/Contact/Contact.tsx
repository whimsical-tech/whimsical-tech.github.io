import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <footer id="contact" className={styles.contact}>
      <p className={styles.mailLink}>
        Thank you for the visit! Contact me at{" "}
        <a href="mailto:whimsicaltech+portfolio@proton.me">
          {" "}
          whimsicaltech+portfolio@proton.me
        </a>
      </p>
    </footer>
  );
}
