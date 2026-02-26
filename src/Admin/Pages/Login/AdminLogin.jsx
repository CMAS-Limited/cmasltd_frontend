import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';
import { Loader2, ArrowLeft, Info } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState(null);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setAuthError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;

      console.log("Session Established:", data.session.access_token);
      window.location.href = '/admin/dashboard'; 

    } catch (error) {
      console.error("Auth Exception:", error.message);
      setAuthError("Authentication failed. Verify credentials.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative font-sans text-gray-900">
      
      <div className="w-full max-w-2xl relative z-10 flex flex-col gap-12">
        
        {/* Top Section: Informational */}
        <div className="flex flex-col gap-6">
          <button 
            onClick={() => navigate('/')}
            className="self-start flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors duration-300 text-xs font-medium uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Public Directory
          </button>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <Info className="w-5 h-5 text-teal-600" />
              <h1 className="text-xl font-bold tracking-wide uppercase">Administrative Portal</h1>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
              This directory is restricted to authorized CMAS personnel for system management and resource allocation. If you are a client or public visitor, please use the Navigation link above to go back to the main site.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
              Thank You.
            </p>
          </div>
        </div>

        {/* Structural Divider */}
        <hr className="border-gray-100" />

        {/* Bottom Section: Lowkey Form */}
        <div className="w-full max-w-sm">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Personnel Email</label>
              <input 
                type="email" 
                name="email" 
                value={credentials.email} 
                onChange={handleChange} 
                required
                className="w-full bg-transparent border-b border-gray-200 py-2 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-teal-600 transition-colors duration-300 text-sm"
                placeholder="admin@cmas.com"
                disabled={isAuthenticating}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Passphrase</label>
              <input 
                type="password" 
                name="password" 
                value={credentials.password} 
                onChange={handleChange} 
                required
                className="w-full bg-transparent border-b border-gray-200 py-2 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-teal-600 transition-colors duration-300 text-sm"
                placeholder="••••••••"
                disabled={isAuthenticating}
              />
            </div>

            {authError && (
              <div className="text-red-500 text-xs font-medium mt-1">
                {authError}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isAuthenticating}
              className="mt-4 flex justify-center items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-fit"
            >
              {isAuthenticating ? (
                <><Loader2 className="w-3 h-3 animate-spin" /> Processing...</>
              ) : (
                'System Login'
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;