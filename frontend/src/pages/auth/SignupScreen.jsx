import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export default function SignupScreen() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: ''
  });

  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

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
      const dummyUser = {
        name: form.name || 'Guest',
        email: form.email,
        age: form.age,
        profileCompleted: true
      };

      localStorage.setItem('user', JSON.stringify(dummyUser));
      localStorage.setItem('token', 'dummy_token');

      if (login) {
        login(dummyUser, 'dummy_token');
      }

      toast.success(`Welcome ${dummyUser.name}! ✨`);

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
        flexDirection: 'column',
        overflowY: 'auto'
      }}
    >
      <div style={{ padding: '20px 24px' }}>
        <button
          className="back-btn"
          onClick={() => navigate('/intro')}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div style={{ flex: 1, padding: '0 24px 48px' }}>
        <div
          className="animate-fade-up"
          style={{
            textAlign: 'center',
            marginBottom: 28
          }}
        >
          <div
            style={{
              fontSize: 44,
              marginBottom: 10
            }}
          >
            ✨
          </div>

          <h1
            style={{
              fontSize: 28,
              fontWeight: 800
            }}
          >
            Create Account
          </h1>

          <p
            style={{
              color: 'var(--text-secondary)',
              marginTop: 6,
              fontSize: 14
            }}
          >
            Join thousands glowing smarter
          </p>
        </div>

        <div
          className="card animate-fade-up delay-100"
          style={{ padding: 28 }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16
            }}
          >
            <div className="input-group">
              <label className="input-label">Full Name</label>

              <div className="input-wrapper">
                <User size={18} className="input-icon" />

                <input
                  type="text"
                  name="name"
                  className="input-field"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
            </div>

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

            <div className="input-group">
              <label className="input-label">
                Age{' '}
                <span
                  style={{
                    color: 'var(--text-muted)',
                    fontWeight: 400
                  }}
                >
                  (optional)
                </span>
              </label>

              <div className="input-wrapper">
                <Calendar size={18} className="input-icon" />

                <input
                  type="number"
                  name="age"
                  className="input-field"
                  placeholder="Your age"
                  value={form.age}
                  onChange={handleChange}
                />
              </div>
            </div>

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

            <div className="input-group">
              <label className="input-label">
                Confirm Password
              </label>

              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />

                <input
                  type="password"
                  name="confirmPassword"
                  className="input-field"
                  placeholder="Repeat password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Account 🌿'}
            </button>
          </form>
        </div>

        <p
          className="animate-fade-up delay-200"
          style={{
            textAlign: 'center',
            marginTop: 24,
            color: 'var(--text-secondary)',
            fontSize: 14
          }}
        >
          Already have an account?{' '}
          <Link
            to="/login"
            style={{
              color: 'var(--primary)',
              fontWeight: 700
            }}
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
