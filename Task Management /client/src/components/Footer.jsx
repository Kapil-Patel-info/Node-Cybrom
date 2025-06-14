
import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Task Management System</h5>
            <p className="text-muted">
              Streamline your workflow and boost productivity with our comprehensive task management solution.
            </p>
          </Col>

          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/features" className="text-white">Features</a></li>
              <li className="mb-2"><a href="/pricing" className="text-white">Pricing</a></li>
              <li className="mb-2"><a href="/docs" className="text-white">Documentation</a></li>
              <li className="mb-2"><a href="/contact" className="text-white">Contact Us</a></li>
            </ul>
          </Col>

          <Col md={4}>
            <h5 className="text-uppercase mb-4">Connect With Us</h5>
            <div className="d-flex gap-3 mb-3">
              <a href="https://github.com/yourusername" className="text-white fs-5">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/yourprofile" className="text-white fs-5">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com/yourhandle" className="text-white fs-5">
                <FaTwitter />
              </a>
              <a href="mailto:contact@example.com" className="text-white fs-5">
                <FaEnvelope />
              </a>
            </div>
            <p className="text-muted mb-0">
              <small>Subscribe to our newsletter for updates</small>
            </p>
            <div className="input-group mt-2">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Your email" 
                aria-label="Your email"
              />
              <button className="btn btn-primary" type="button">
                Subscribe
              </button>
            </div>
          </Col>
        </Row>

        <hr className="my-4 bg-secondary" />

        <Row>
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0 text-muted">
              &copy; {currentYear} Task Management System. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="mb-0 text-muted">
              <a href="/privacy" className="text-muted me-3">Privacy Policy</a>
              <a href="/terms" className="text-muted me-3">Terms of Service</a>
              <a href="/cookies" className="text-muted">Cookie Policy</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;