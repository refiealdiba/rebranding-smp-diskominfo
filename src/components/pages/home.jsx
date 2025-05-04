export default function Home() {
  return (
    <div className="p-6 bg-white shadow rounded-lg min-h-screen">
      <h1 className="text-2xl font-bold text-smporange mb-2">
        Berita SMP Negeri 20 Semarang
      </h1>
      <p className="mb-6 text-gray-700">
        Selamat datang di halaman dashboard utama!
      </p>

      {/* Highlight Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded-2xl border-l-4 border-blue-500">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-2xl font-bold text-blue-600">120</p>
        </div>
        <div className="bg-white p-4 shadow rounded-2xl border-l-4 border-green-500">
          <h2 className="text-lg font-semibold mb-2">Total Articles</h2>
          <p className="text-2xl font-bold text-green-600">45</p>
        </div>
        <div className="bg-white p-4 shadow rounded-2xl border-l-4 border-yellow-500">
          <h2 className="text-lg font-semibold mb-2">New Comments</h2>
          <p className="text-2xl font-bold text-yellow-600">10</p>
        </div>
      </div>

      {/* Informasi Sekolah */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Tentang Sekolah
        </h2>
        <p className="text-gray-600 leading-relaxed">
          SMP Negeri 20 Semarang adalah sekolah yang berkomitmen dalam
          memberikan pendidikan terbaik bagi siswa-siswinya. Dashboard ini
          merupakan pusat informasi untuk manajemen konten seperti berita,
          galeri foto, video, dan pencapaian siswa.
        </p>
      </div>
    </div>
  );
}
