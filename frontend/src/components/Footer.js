export default function Footer() {
  const curYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <small className="footer__copyright">&copy; {curYear} Mesto Russia</small>
    </footer>
  );
}
