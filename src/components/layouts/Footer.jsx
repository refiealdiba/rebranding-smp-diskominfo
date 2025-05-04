import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-smporange text-white py-6 px-10 flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h2 className="font-bold text-lg">SMP NEGERI 20 SEMARANG</h2>
        <p className="text-sm mt-2 leading-tight">
          sekolah adalah tempat mencetak penerus bangsa
          <br />
          yang berkualitas dan berprestasi di segala bidang
          <br />
          yang dapat bersaing di dunia internasional
        </p>
      </div>
      <div className="flex gap-4 mt-4 md:mt-0">
        <a href="#" aria-label="Facebook">
          <FaFacebookF className="w-5 h-5 hover:text-gray-300" />
        </a>
        <a href="#" aria-label="Instagram">
          <FaInstagram className="w-5 h-5 hover:text-gray-300" />
        </a>
        <a href="#" aria-label="YouTube">
          <FaYoutube className="w-5 h-5 hover:text-gray-300" />
        </a>
      </div>
    </footer>
  );
}
