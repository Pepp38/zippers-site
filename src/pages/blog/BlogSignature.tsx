import { Link } from "react-router-dom";

export function BlogSignature() {
  return (
    <footer className="blogSignature">
      <p className="blogSignatureText">
        <strong>
          <a
            href="https://github.com/Pepp38/Savior"
            target="_blank"
            rel="noreferrer"
          >
            Savior Core
          </a>
        </strong>{" "}
        is an open-source library for basic form persistence.
        <br />
        <strong>
          <Link to="/products/safestate-recovery">
            Savior SafeState Recovery
          </Link>
        </strong>{" "}
        adds deterministic recovery for crashes and edge cases.
        <br />
        <br />
        More at{" "} 
        <Link to="/"><strong>Zippers.dev</strong></Link>

      </p>
    </footer>
  );
}
