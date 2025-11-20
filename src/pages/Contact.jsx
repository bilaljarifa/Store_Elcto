import { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './Contact.css'

function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-hero">
          <h1 className="contact-title">{t('contactUs')}</h1>
          <p className="contact-subtitle">{t('weAreHere') || 'Nous sommes là pour vous aider'}</p>
        </div>
        
        <div className="contact-grid">
          <div className="contact-info-card">
            <div className="info-item">
              <div className="info-icon">📧</div>
              <div className="info-content">
                <h4>{t('email')}</h4>
                <p>contact@storeelcto.com</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📞</div>
              <div className="info-content">
                <h4>{t('phone')}</h4>
                <p>+33 1 23 45 67 89</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div className="info-content">
                <h4>{t('address')}</h4>
                <p>123 Rue de la Technologie<br />75001 Paris, France</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">🕒</div>
              <div className="info-content">
                <h4>{t('hours') || 'Horaires'}</h4>
                <p>Lun - Ven: 9h - 18h<br />Samedi: 10h - 16h</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form-card">
            {submitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <p>{t('messageSent') || 'Message envoyé avec succès !'}</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t('lastName')} *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{t('email')} *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>{t('subject') || 'Sujet'} *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{t('message')} *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  {t('send')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

