
export default function SearchFilter({ searchTerm, setSearchTerm }: { searchTerm: string, setSearchTerm: (searchTerm: string) => void }) {

    return (
        <div className="w-full ">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-none"
                />
            </div>

        </div>
    )
}

