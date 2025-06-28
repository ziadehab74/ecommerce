export default function SearchInput({ searchTerm, onChange }) {
    return (
        <div className="mb-4">
            <input
                type="text"
                className="form-control"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
