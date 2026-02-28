import LoginForm from '@/app/components/LoginForm';

export default function LoginPage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite'
      }}
    >
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-10 -left-24 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            animation: 'blob 7s infinite'
          }}
        ></div>
        <div 
          className="absolute -top-32 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          style={{
            background: 'linear-gradient(135deg, #f093fb, #f5576c)',
            animation: 'blob 7s infinite 2s'
          }}
        ></div>
        <div 
          className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          style={{
            background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
            animation: 'blob 7s infinite 4s'
          }}
        ></div>
      </div>

      {/* Main Login Card */}
      <div className="relative w-full max-w-md z-10">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl blur-2xl opacity-40 animate-pulse"></div>

        {/* Card Content */}
        <div className="relative bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                📚
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
              <span style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Student Hub
              </span>
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Manage your student records with ease. Secure and professional.
            </p>
          </div>

          {/* Divider */}
          <div className="mb-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

          {/* Form */}
          <LoginForm />

          {/* Footer Message */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-center text-xs text-gray-500 px-2">
              🔒 Your data is secure. Built with modern security standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
