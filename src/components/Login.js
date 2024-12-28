import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import Label from './Label';

function Login({ lang, onLogin }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  // Remove unused state variables
  // const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with real authentication logic
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isAdmin', 'true');
      onLogin(true);
      navigate('/admin');
    } else {
      alert(lang === 'th' ? 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' : 'Invalid username or password');
    }
  };

  const phoneNumber = '123-456-7890';
  const handlePhoneClick = () => {
    console.log(`Calling ${phoneNumber}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10 font-sans px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md space-y-6"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          {lang === 'th' ? 'เข้าสู่ระบบ' : 'Login'}
        </h2>
        
        <div className="mb-4">
          <Label htmlFor="username">
            {lang === 'th' ? 'ชื่อผู้ใช้' : 'Username'}
          </Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        
        {/* {error && <p className="text-red-500">{error}</p>} */}
        
        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition duration-300"
        >
          {lang === 'th' ? 'เข้าสู่ระบบ' : 'Login'}
        </Button>

        <a
          href={`tel:${phoneNumber}`}
          onClick={handlePhoneClick}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          aria-label={`Call ${phoneNumber}`}
        >
          <span className="text-white text-xl mr-2" role="img" aria-label="phone">📞</span> {phoneNumber}
        </a>
      </form>
    </div>
  );
}

export default Login;