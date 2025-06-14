const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-4 pb-2 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <h5>About Us</h5>
                        <p className="text-muted">
                            Some quick example text to build on the card title and make up the bulk of the
                            card's content.
                        </p>
                    </div>
                    
                    <div className="col-md-4 mb-3">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white">Home</a></li>
                            <li><a href="#" className="text-white">About</a></li>
                            <li><a href="#" className="text-white">Services</a></li>
                            <li><a href="#" className="text-white">Contact</a></li>
                        </ul>
                    </div>
                    
                    <div className="col-md-4 mb-3">
                        <h5>Contact</h5>
                        <address className="text-muted">
                            <i className="bi bi-geo-alt-fill me-2"></i> 123 Main St, City, Country<br/>
                            <i className="bi bi-envelope-fill me-2"></i> info@example.com<br/>
                            <i className="bi bi-telephone-fill me-2"></i> +1 (123) 456-7890
                        </address>
                        <div className="social-icons">
                            <a href="#" className="text-white me-2"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="text-white me-2"><i className="bi bi-twitter"></i></a>
                            <a href="#" className="text-white me-2"><i className="bi bi-instagram"></i></a>
                            <a href="#" className="text-white me-2"><i className="bi bi-linkedin"></i></a>
                        </div>
                    </div>
                </div>
                
                <hr className="my-3 bg-light"/>
                
                <div className="row">
                    <div className="col-md-6 text-center text-md-start">
                        <p className="mb-0">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <p className="mb-0">
                            <a href="#" className="text-white me-2">Privacy Policy</a>
                            <a href="#" className="text-white">Terms of Service</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;