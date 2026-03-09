import LoginForm from '@/app/components/LoginForm';

export default function LoginPage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fff5fb 0%, #fce7f3 50%, #f9f7f2 100%)'
      }}
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          style={{
            background: 'linear-gradient(135deg, #ec4899, #f472b6)',
            animation: 'float 8s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute -top-32 -right-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
          style={{
            background: 'linear-gradient(135deg, #c084fc, #ec4899)',
            animation: 'float 8s ease-in-out infinite 1s'
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{
            background: 'linear-gradient(135deg, #f472b6, #a855f7)',
            animation: 'float 8s ease-in-out infinite 2s'
          }}
        ></div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: Math.random() * 200 + 50 + 'px',
              height: Math.random() * 200 + 50 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              borderColor: 'rgba(236, 72, 153, ' + (Math.random() * 0.2 + 0.05) + ')',
              animation: 'float ' + (Math.random() * 10 + 15) + 's ease-in-out infinite'
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
          className="absolute inset-0 rounded-2xl blur-2xl opacity-40"
          style={{
            background: 'linear-gradient(135deg, #ec4899, #c084fc, #ec4899)',
            animation: 'glow 3s ease-in-out infinite'
          }}
        ></div>

        {/* Card Content */}
        <div 
          className="relative backdrop-blur-sm rounded-3xl shadow-2xl p-8 border"
          style={{
            background: '#ffffff',
            borderColor: '#fbcfe8'
          }}
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg mx-auto mb-4 animate-float"
              style={{
                background: 'linear-gradient(135deg, #ec4899 0%, #c084fc 100%)',
                boxShadow: '0 8px 32px rgba(236, 72, 153, 0.4)'
              }}
            >
              📚
            </div>
            <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-pink-500 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Student Hub
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Modern Student Management System
            </p>
          </div>

          {/* Divider */}
          <div className="mb-8 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-50"></div>

          {/* Form */}
          <LoginForm />

          {/* Footer Message */}
          <div className="mt-8 pt-6 border-t border-opacity-20" style={{borderColor: '#fbcfe8'}}>
            <p className="text-center text-xs text-gray-500 px-2">
              🔒 Enterprise-grade security • Advanced encryption • Secure sessions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
