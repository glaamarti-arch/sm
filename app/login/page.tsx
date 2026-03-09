import LoginForm from '@/app/components/LoginForm';

export default function LoginPage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFF9FB 0%, #FFF0F5 50%, #FFE4F0 100%)'
      }}
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <div 
          className="absolute top-0 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          style={{
            background: 'linear-gradient(135deg, #E91E63, #F06292)',
            animation: 'float 8s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute -top-32 -right-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
          style={{
            background: 'linear-gradient(135deg, #BA68C8, #E91E63)',
            animation: 'float 8s ease-in-out infinite 1s'
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{
            background: 'linear-gradient(135deg, #E91E63, #F48FB1)',
            animation: 'float 8s ease-in-out infinite 2s'
          }}
        ></div>
      </div>

      {/* Subtle Sparkles Background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-rose-400 to-pink-400"
            style={{
              width: Math.random() * 1.5 + 0.5 + 'px',
              height: Math.random() * 1.5 + 0.5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.3 + 0.1,
              animation: 'twinkle ' + (Math.random() * 4 + 3) + 's infinite'
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
          className="absolute inset-0 rounded-2xl blur-2xl opacity-30"
          style={{
            background: 'linear-gradient(135deg, #E91E63, #BA68C8, #E91E63)',
            animation: 'glow 3s ease-in-out infinite'
          }}
        ></div>

        {/* Card Content */}
        <div 
          className="relative backdrop-blur-xl rounded-2xl shadow-2xl p-8 border"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 240, 245, 0.95) 100%)',
            borderColor: 'rgba(233, 30, 99, 0.2)'
          }}
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-3xl font-bold shadow-lg mx-auto mb-4 animate-float"
              style={{
                background: 'linear-gradient(135deg, #E91E63 0%, #F06292 100%)',
                boxShadow: '0 8px 32px rgba(233, 30, 99, 0.3)'
              }}
            >
              📚
            </div>
            <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Student Hub
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed font-medium">
              Professional Student Management System
            </p>
          </div>

          {/* Divider */}
          <div className="mb-8 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-50"></div>

          {/* Form */}
          <LoginForm />

          {/* Footer Message */}
          <div className="mt-8 pt-6 border-t border-opacity-20" style={{borderColor: 'rgba(233, 30, 99, 0.2)'}}>
            <p className="text-center text-xs text-gray-600 px-2">
              🔒 Enterprise-grade security • Advanced encryption • Secure sessions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
