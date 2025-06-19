import { Container, Row, Col } from 'react-bootstrap';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope,
  FaRocket,
  FaShieldAlt,
  FaFileAlt,
  FaHeadset
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <Container>
        <Row className="g-4">
          {/* Brand Column */}
          <Col lg={4} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <FaRocket className="text-primary fs-3 me-2" />
              <h5 className="mb-0 fw-bold">TaskFlow</h5>
            </div>
            <p className="text-muted pe-lg-5">
              The ultimate task management solution for teams and individuals. 
              Streamline workflows, boost productivity, and achieve more every day.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="https://github.com" className="text-white fs-5 hover-primary">
                <FaGithub />
              </a>
              <a href="https://linkedin.com" className="text-white fs-5 hover-primary">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com" className="text-white fs-5 hover-primary">
                <FaTwitter />
              </a>
              <a href="mailto:contact@taskflow.com" className="text-white fs-5 hover-primary">
                <FaEnvelope />
              </a>
            </div>
          </Col>

          {/* Quick Links Column */}
          <Col md={6} lg={2} className="mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Product</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/features" className="text-muted hover-white">Features</a>
              </li>
              <li className="mb-2">
                <a href="/pricing" className="text-muted hover-white">Pricing</a>
              </li>
              <li className="mb-2">
                <a href="/integrations" className="text-muted hover-white">Integrations</a>
              </li>
              <li className="mb-2">
                <a href="/roadmap" className="text-muted hover-white">Roadmap</a>
              </li>
            </ul>
          </Col>

          {/* Resources Column */}
          <Col md={6} lg={2} className="mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Resources</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/docs" className="text-muted hover-white">
                  <FaFileAlt className="me-2" />
                  Documentation
                </a>
              </li>
              <li className="mb-2">
                <a href="/blog" className="text-muted hover-white">Blog</a>
              </li>
              <li className="mb-2">
                <a href="/webinars" className="text-muted hover-white">Webinars</a>
              </li>
              <li className="mb-2">
                <a href="/support" className="text-muted hover-white">
                  <FaHeadset className="me-2" />
                  Support
                </a>
              </li>
            </ul>
          </Col>

          {/* Newsletter Column */}
          <Col lg={4} className="mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Stay Updated</h6>
            <p className="text-muted mb-3">
              Subscribe to our newsletter for product updates and tips.
            </p>
            <div className="input-group mb-3">
              <input 
                type="email" 
                className="form-control bg-dark border-secondary text-white" 
                placeholder="Your email" 
                aria-label="Your email"
              />
              <button 
                className="btn btn-primary" 
                type="button"
                style={{ minWidth: '100px' }}
              >
                Join
              </button>
            </div>
            <div className="d-flex align-items-center text-muted mt-4">
              <FaShieldAlt className="me-2" />
              <small>We respect your privacy. Unsubscribe anytime.</small>
            </div>
          </Col>
        </Row>

        <hr className="my-4 border-secondary" />

        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <small className="text-muted">
              &copy; {currentYear} TaskFlow Systems. All rights reserved.
            </small>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <small className="d-block d-md-inline-block me-md-3 mb-2 mb-md-0">
              <a href="/privacy" className="text-muted hover-white">Privacy Policy</a>
            </small>
            <small className="d-block d-md-inline-block me-md-3 mb-2 mb-md-0">
              <a href="/terms" className="text-muted hover-white">Terms of Service</a>
            </small>
            <small className="d-block d-md-inline-block">
              <a href="/cookies" className="text-muted hover-white">Cookie Policy</a>
            </small>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .hover-primary:hover {
          color: var(--bs-primary) !important;
          transform: translateY(-2px);
          transition: all 0.2s ease;
        }
        
        .hover-white:hover {
          color: white !important;
          transition: color 0.2s ease;
        }
        
        footer a {
          text-decoration: none;
        }
        
        .form-control:focus {
          background-color: var(--bs-dark);
          border-color: var(--bs-primary);
          color: white;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
      `}</style>
    </footer>
  );
};

export default Footer;