import LoginForm from '@/app/components/LoginForm';

export default function LoginPage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f4b 50%, #16213e 100%)'
      }}
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 -left-40 w-80 h-80 rounded-full mix-blend-screen filter blur-3xl opacity-40"
          style={{
            background: 'linear-gradient(135deg, #00d9ff, #0099ff)',
            animation: 'float 8s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute -top-32 -right-40 w-96 h-96 rounded-full mix-blend-screen filter blur-3xl opacity-30"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #00d9ff)',
            animation: 'float 8s ease-in-out infinite 1s'
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full mix-blend-screen filter blur-3xl opacity-35"
          style={{
            background: 'linear-gradient(135deg, #00d9ff, #ff006e)',
            animation: 'float 8s ease-in-out infinite 2s'
          }}
        ></div>
      </div>

      {/* Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.1,
              animation: 'twinkle ' + (Math.random() * 3 + 2) + 's infinite'
            }}
          ></div>
        ))}
      </div>

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
          className="absolute inset-0 rounded-2xl blur-2xl opacity-50"
          style={{
            background: 'linear-gradient(135deg, #00d9ff, #6366f1, #00d9ff)',
            animation: 'glow 3s ease-in-out infinite'
          }}
        ></div>

        {/* Card Content */}
        <div 
          className="relative backdrop-blur-xl rounded-2xl shadow-2xl p-8 border"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
            borderColor: 'rgba(0, 217, 255, 0.3)'
          }}
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-3xl font-bold shadow-lg mx-auto mb-4 animate-float"
              style={{
                background: 'linear-gradient(135deg, #00d9ff 0%, #6366f1 100%)',
                boxShadow: '0 8px 32px rgba(0, 217, 255, 0.4)'
              }}
            >
              📚
            </div>
            <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
              Student Hub
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              Professional Student Management System
            </p>
          </div>

          {/* Divider */}
          <div className="mb-8 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"></div>

          {/* Form */}
          <LoginForm />

          {/* Footer Message */}
          <div className="mt-8 pt-6 border-t border-opacity-20" style={{borderColor: 'rgba(0, 217, 255, 0.2)'}}>
            <p className="text-center text-xs text-gray-500 px-2">
              🔒 Enterprise-grade security • Advanced encryption • Secure sessions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
