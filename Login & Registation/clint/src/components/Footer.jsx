import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';
import "../css/Footer.css"

function Footer() {
  return (
    <MDBFooter className='Footer  text-center  m-5' color='white' bgColor='dark'>
      <MDBContainer className='p-4'>

        <section className=' mb-4'>
          <MDBBtn outline color="light" floating className='m-1' href='https://facebook.com' role='button'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='https://twitter.com' role='button'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='https://google.com' role='button'>
            <MDBIcon fab icon='google' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='https://instagram.com' role='button'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='https://linkedin.com' role='button'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='https://github.com' role='button'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>


        <section className=''>
          <form action=''>
            <MDBRow className='d-flex justify-content-center'>
              <MDBCol size="auto">
                <p className='pt-2'>
                  <strong>Sign up for our newsletter</strong>
                </p>
              </MDBCol>

              <MDBCol md='5' start>
                <MDBInput contrast type='email' label='Email address' className='mb-4' />
              </MDBCol>

              <MDBCol size="auto">
                <MDBBtn outline color='light' type='submit' className='mb-4'>
                  Subscribe
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </form>
        </section>


        <section className='mb-4'>
          <p>
            Welcome to TechVerse – your one-stop shop for premium electronics, gadgets, and accessories. We provide the best deals, trusted brands, and fast delivery to power your digital lifestyle.
          </p>
        </section>


        <section className=''>
          <MDBRow>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Company</h5>
              <ul className='list-unstyled mb-0'>
                <li><a href='/about' className='text-white'>About Us</a></li>
                <li><a href='/careers' className='text-white'>Careers</a></li>
                <li><a href='/blog' className='text-white'>Blog</a></li>
                <li><a href='/contact' className='text-white'>Contact</a></li>
              </ul>
            </MDBCol>

           
            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Support</h5>
              <ul className='list-unstyled mb-0'>
                <li><a href='/faq' className='text-white'>FAQs</a></li>
                <li><a href='/shipping' className='text-white'>Shipping & Delivery</a></li>
                <li><a href='/returns' className='text-white'>Returns Policy</a></li>
                <li><a href='/warranty' className='text-white'>Warranty</a></li>
              </ul>
            </MDBCol>


            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Categories</h5>
              <ul className='list-unstyled mb-0'>
                <li><a href='/phones' className='text-white'>Smartphones</a></li>
                <li><a href='/laptops' className='text-white'>Laptops</a></li>
                <li><a href='/wearables' className='text-white'>Wearables</a></li>
                <li><a href='/accessories' className='text-white'>Accessories</a></li>
              </ul>
            </MDBCol>


            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Legal</h5>
              <ul className='list-unstyled mb-0'>
                <li><a href='/terms' className='text-white'>Terms of Service</a></li>
                <li><a href='/privacy' className='text-white'>Privacy Policy</a></li>
                <li><a href='/security' className='text-white'>Security</a></li>
                <li><a href='/cookies' className='text-white'>Cookie Policy</a></li>
              </ul>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>


      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} TechVerse. All rights reserved. &nbsp;
        <a className='text-white' href='https://techverse.com/'>techverse.com</a>
      </div>
    </MDBFooter>
  );
}

export default Footer;
