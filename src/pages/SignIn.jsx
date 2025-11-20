import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'
import './Auth.css'

function SignIn() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate authentication
    if (formData.email && formData.password) {
      // Store user session (in real app, use proper auth)
      localStorage.setItem('user', JSON.stringify({ email: formData.email }))
      navigate('/')
    } else {
      setError(t('fillAllFields') || 'Veuillez remplir tous les champs')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">{t('signInTitle')}</h1>
          <p className="auth-subtitle">{t('signInSubtitle')}</p>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('email')} *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="votre@email.com"
              />
            </div>
            
            <div className="form-group">
              <div className="form-group-header">
                <label>{t('password')} *</label>
                <Link to="/forgot-password" className="forgot-password-link">
                  {t('forgotPassword')}
                </Link>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>
            
            <button type="submit" className="auth-btn">
              {t('signIn')}
            </button>
          </form>
          
          <p className="auth-link">
            {t('noAccount')} <Link to="/signup">{t('signUpLink')}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn

