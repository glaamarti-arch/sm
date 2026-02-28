export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Student Management System
        </h1>
        <p className="text-gray-600 mb-6">
          A complete solution for managing students, enrollment, and records.
        </p>

        <div className="space-y-3 mb-8">
          <div className="flex items-start space-x-3">
            <span className="text-blue-600 font-bold">✓</span>
            <span className="text-gray-700">Full CRUD operations for students</span>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-blue-600 font-bold">✓</span>
            <span className="text-gray-700">Secure authentication system</span>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-blue-600 font-bold">✓</span>
            <span className="text-gray-700">SQLite database storage</span>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-blue-600 font-bold">✓</span>
            <span className="text-gray-700">Responsive design with Tailwind CSS</span>
          </div>
        </div>

        <a
          href="/login"
          className="block w-full px-6 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 font-medium transition"
        >
          Go to Login
        </a>

        <p className="text-xs text-gray-500 mt-6 text-center">
          Default credentials: admin / admin123
        </p>
      </div>
    </div>
  );
}
