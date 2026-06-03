import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const userName = form.email
        ? form.email.split('@')[0]
        : 'Guest';

      const dummyUser = {
        name: userName,
        email: form.email,
        profileCompleted: true
      };

      localStorage.setItem('user', JSON.stringify(dummyUser));
      localStorage.setItem('token', 'dummy_token');

      if (login) {
        login(dummyUser, 'dummy_token');
      }

      toast.success(`Welcome ${userName}! ✨`);

      navigate('/dashboard');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--gradient-warm)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div style={{ padding: '20px 24px' }}>
        <button
          className="back-btn"
          onClick={() => navigate('/welcome')}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '0 24px 40px'
        }}
      >
        {/* Brand */}
        <div
          className="animate-fade-up"
          style={{
            textAlign: 'center',
            marginBottom: 36
          }}
        >
          <div
            style={{
              fontSize: 48,
              marginBottom: 12
            }}
          >
            🌿
          </div>

          <h1
            style={{
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: '-0.5px'
            }}
          >
            Welcome Back
          </h1>

          <p
            style={{
              color: 'var(--text-secondary)',
              marginTop: 6,
              fontSize: 15
            }}
          >
            Your skin journey continues ✨
          </p>
        </div>

        {/* Form Card */}
        <div
          className="card animate-fade-up delay-100"
          style={{ padding: 28 }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 18
            }}
          >
            {/* Email */}
            <div className="input-group">
              <label className="input-label">Email</label>

              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />

                <input
                  type="email"
                  name="email"
                  className="input-field"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div className="input-group">
              <label className="input-label">Password</label>

              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />

                <input
                  type={showPw ? 'text' : 'password'}
                  name="password"
                  className="input-field"
                  placeholder="Any password"
                  value={form.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="input-icon-right"
                  onClick={() => setShowPw(!showPw)}
                >
                  {showPw ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <Link
                to="/forgot-password"
                style={{
                  fontSize: 13,
                  color: 'var(--primary)',
                  fontWeight: 600
                }}
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block"
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Sign In 🌿'}
            </button>
          </form>
        </div>

        {/* Divider */}
        <div
          className="divider-text animate-fade-up delay-200"
          style={{ margin: '24px 0' }}
        >
          or continue with
        </div>

        {/* Google Button */}
        <button
          className="btn btn-secondary animate-fade-up delay-300"
          style={{ width: '100%' }}
        >
          <span style={{ fontSize: 18 }}>🔑</span>
          Continue with Google
        </button>

        {/* Signup */}
        <p
          className="animate-fade-up delay-400"
          style={{
            textAlign: 'center',
            marginTop: 28,
            color: 'var(--text-secondary)',
            fontSize: 14
          }}
        >
          New here?{' '}
          <Link
            to="/signup"
            style={{
              color: 'var(--primary)',
              fontWeight: 700
            }}
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
