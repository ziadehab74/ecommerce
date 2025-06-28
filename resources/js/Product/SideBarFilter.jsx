import { useState } from 'react';
import { Range } from 'react-range';

export default function SidebarFilters({ filters, setFilters, products }) {
    const MIN = 0, MAX = 1000;
    const [localFilters, setLocalFilters] = useState(filters);
    const [show, setShow] = useState(false);
    const categories = [...new Set(products.map(p => p.category))];

    const applyFilters = () => {
        setFilters(localFilters);
        setShow(false);
    };

    const resetFilters = () => {
        const reset = { searchTerm: '', priceRange: [MIN, MAX], category: [] };
        setLocalFilters(reset);
        setFilters(reset);
        setShow(false);
    };

    return (
        <>
            <button className="btn btn-outline-dark position-fixed top-50 start-0 translate-middle-y z-3" onClick={() => setShow(!show)}>
                Filters
            </button>

            <div className={`position-fixed top-0 start-0 h-100 bg-white shadow p-4 overflow-auto`} style={{
                width: '300px',
                zIndex: 1040,
                transform: show ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.3s ease-in-out'
            }}>
                <div className="d-flex justify-content-between mb-4">
                    <h5>Filters</h5>
                    <button className="btn-close" onClick={() => setShow(false)} />
                </div>

                {/* Price Range */}
                <div className="mb-3">
                    <label>Price Range: ${localFilters.priceRange[0]} - ${localFilters.priceRange[1]}</label>
                    <Range
                        step={10}
                        min={MIN}
                        max={MAX}
                        values={localFilters.priceRange}
                        onChange={(vals) => setLocalFilters({ ...localFilters, priceRange: vals })}
                        renderTrack={({ props, children }) => (
                            <div {...props} style={{
                                ...props.style,
                                height: '6px',
                                background: '#ccc',
                                borderRadius: '3px',
                                marginTop: '10px'
                            }}>{children}</div>
                        )}
                        renderThumb={({ props }) => (
                            <div {...props} style={{ ...props.style, height: '16px', width: '16px', backgroundColor: 'black', borderRadius: '50%' }} />
                        )}
                    />
                </div>

                {/* Categories */}
                <div className="mb-3">
                    <label>Category</label>
                    {categories.map((cat, i) => (
                        <div key={i} className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={localFilters.category.includes(cat)}
                                onChange={() => {
                                    const newCats = localFilters.category.includes(cat)
                                        ? localFilters.category.filter(c => c !== cat)
                                        : [...localFilters.category, cat];
                                    setLocalFilters({ ...localFilters, category: newCats });
                                }}
                            />
                            <label className="form-check-label">{cat}</label>
                        </div>
                    ))}
                </div>

                <div className="d-flex gap-2">
                    <button className="btn background-black w-100" onClick={applyFilters}>Apply</button>
                    <button className="btn btn-outline-secondary w-100" onClick={resetFilters}>Reset</button>
                </div>
            </div>
        </>
    );
}
