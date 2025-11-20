import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'
import './Auth.css'

function SignUp() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    if (formData.password !== formData.confirmPassword) {
      setError(t('passwordsDontMatch') || 'Les mots de passe ne correspondent pas')
      return
    }
    
    if (formData.name && formData.email && formData.password) {
      // Store user session (in real app, use proper auth)
      localStorage.setItem('user', JSON.stringify({ 
        name: formData.name,
        email: formData.email 
      }))
      navigate('/')
    } else {
      setError(t('fillAllFields'))
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">{t('signUpTitle')}</h1>
          <p className="auth-subtitle">{t('signUpSubtitle')}</p>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('fullName') || 'Nom complet'} *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Jean Dupont"
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
                placeholder="votre@email.com"
              />
            </div>
            
            <div className="form-group">
              <label>{t('password')} *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>
            
            <div className="form-group">
              <label>{t('confirmPassword')} *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>
            
            <button type="submit" className="auth-btn">
              {t('signUp')}
            </button>
          </form>
          
          <p className="auth-link">
            {t('haveAccount')} <Link to="/signin">{t('signInLink')}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp

