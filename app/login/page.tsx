import LoginForm from '@/app/components/LoginForm';

export default function LoginPage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fdf2f7 0%, #fde8f0 50%, #fce7ef 100%)'
      }}
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{
            background: 'linear-gradient(135deg, #f5a9c8, #ec4899)',
            animation: 'float 8s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute -top-32 -right-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          style={{
            background: 'linear-gradient(135deg, #c084fc, #f5a9c8)',
            animation: 'float 8s ease-in-out infinite 1s'
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          style={{
            background: 'linear-gradient(135deg, #a855f7, #db2777)',
            animation: 'float 8s ease-in-out infinite 2s'
          }}
        ></div>
      </div>

      {/* Stars Background - disabled for clean look */}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>

      {/* Main Login Card */}
      <div className="relative w-full max-w-md z-10">
        {/* Glow Effect */}
        <div 
          className="absolute inset-0 rounded-2xl blur-2xl opacity-30"
          style={{
            background: 'linear-gradient(135deg, #f5a9c8, #c084fc, #f5a9c8)',
            animation: 'glow 3s ease-in-out infinite'
          }}
        ></div>

        {/* Card Content */}
        <div 
          className="relative backdrop-blur-xl rounded-2xl shadow-2xl p-8 border"
          style={{
            background: '#ffffff',
            borderColor: 'rgba(219, 39, 119, 0.2)'
          }}
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-3xl font-bold shadow-lg mx-auto mb-4 animate-float"
              style={{
                background: 'linear-gradient(135deg, #f5a9c8 0%, #c084fc 100%)',
                boxShadow: '0 8px 32px rgba(219, 39, 119, 0.2)'
              }}
            >
              📚
            </div>
            <h1 className="text-4xl font-black mb-2" style={{background: 'linear-gradient(to right, #ec4899, #c084fc, #a855f7)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Student Hub
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed font-medium">
              Professional Student Management System
            </p>
          </div>

          {/* Divider */}
          <div className="mb-8 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-40"></div>

          {/* Form */}
          <LoginForm />

          {/* Footer Message */}
          <div className="mt-8 pt-6 border-t border-opacity-20" style={{borderColor: 'rgba(219, 39, 119, 0.15)'}}>
            <p className="text-center text-xs text-gray-500 px-2">
              🔒 Enterprise-grade security • Advanced encryption • Secure sessions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
