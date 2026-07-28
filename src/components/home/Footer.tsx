import { Icon } from '../Icon'

export function Footer() {
  return (
    <footer id="assessment">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">Zylk Health</div>
            <p className="footer-desc">
              AI-powered scalp assessments and doctor-reviewed plans, built
              around what&apos;s actually causing your hair fall.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram">
                <Icon name="instagram" />
              </a>
              <a href="#" aria-label="YouTube">
                <Icon name="youtube" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Icon name="linkedin" />
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About Zylk</a>
            <a href="#">Take Assessment</a>
            <a href="#">Shop</a>
            <a href="#">Careers</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
          </div>
          <div className="footer-col">
            <h4>Get in touch</h4>
            <p>care@zylkhealth.com</p>
            <p>+91 98765 43210</p>
            <p>HSR Layout, Bengaluru</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Zylk Health. All rights reserved.</span>
          <span>*Results vary by individual and adherence to plan.</span>
        </div>
      </div>
    </footer>
  )
}
