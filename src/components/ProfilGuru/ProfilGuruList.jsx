import { useState, useEffect } from "react";
import { getEmployees } from "../../services/employee";

const ProfilGuruList = () => {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const getAllEmployees = async () => {
            try {
                const data = await getEmployees();
                setEmployees(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        getAllEmployees();
    }, []);

    // Hitung indeks untuk slicing
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(employees.length / itemsPerPage);

    return (
        <div className="flex flex-col items-center gap-5">
            {/* Pagination */}
            <div className="flex gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-full border ${
                            currentPage === i + 1
                                ? "bg-smporange text-white"
                                : "bg-white text-black"
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentEmployees.map((employee) => (
                    <div key={employee.id} className="bg-white shadow-md p-4 rounded-md w-72">
                        <h2 className="font-semibold text-lg">{employee.name}</h2>
                        <p className="text-sm text-gray-600">{employee.position}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfilGuruList;
