import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Button from './Button';
import Input from './Input';
import Label from './Label';

function Login({ lang, onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        onLogin(true);
        const token = await userCredential.user.getIdTokenResult();
        if (token.claims.admin) {
          localStorage.setItem('isAdmin', 'true');
          onLogin(true);
          navigate('/admin');
        } else {
          setMessage('Login successful.');
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Login failed. Check credentials or permissions.");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 font-sans px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md space-y-6"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          {lang === 'th' ? 'เข้าสู่ระบบผู้ดูแล' : 'Admin Login'}
        </h2>
        
        <div className="mb-4">
          <Label htmlFor="email">
            {lang === 'th' ? 'อีเมล' : 'Email'}
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-3 border rounded-md focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        
        <div className="mb-6">
          <Label htmlFor="password">
            {lang === 'th' ? 'รหัสผ่าน' : 'Password'}
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-3 border rounded-md focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        
        {error && <p className="text-red-500">{error}</p>}
        
        <Button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md"
          aria-label={lang === "th" ? "เข้าสู่ระบบ" : "Login"}
        >
          {lang === 'th' ? 'เข้าสู่ระบบ' : 'Login'}
        </Button>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default Login;