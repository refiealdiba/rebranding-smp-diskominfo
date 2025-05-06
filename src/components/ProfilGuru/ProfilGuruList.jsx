import { useState, useEffect } from "react";
import { getEmployees } from "../../services/employee";
import defaultPhoto from "../../assets/user-default.webp";

const ProfilGuruList = () => {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        const getAllEmployees = async () => {
            try {
                const data = await getEmployees();
                setEmployees(data);
            } catch (error) {
                console.error(error);
            }
        };

        getAllEmployees();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(employees.length / itemsPerPage);

    return (
        <div className="flex flex-col items-center gap-6 px-4 pb-10">
            {/* Daftar guru */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-6 w-full max-w-7xl">
                {currentEmployees.map((employee) => (
                    <div
                        key={employee.id}
                        className="flex flex-col items-center bg-white rounded-xl shadow-md p-3"
                    >
                        <div className="w-full aspect-[3/4] overflow-hidden rounded-md bg-gray-200">
                            <img
                                src={employee.photo || defaultPhoto}
                                alt={employee.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="mt-3 text-start self-start font-inter">
                            <h3 className="text-base text-black leading-snug font-medium">
                                {employee.name}
                            </h3>
                            <p className="text-sm text-smpgray font-medium">{employee.position}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm transition ${
                            currentPage === i + 1
                                ? "bg-smporange text-white font-semibold"
                                : "bg-white text-gray-700"
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProfilGuruList;
