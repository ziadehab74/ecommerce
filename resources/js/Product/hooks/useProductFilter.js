export default function useProductFilter(products, filters) {
    return products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
        const matchesCategory = !filters.category.length || filters.category.includes(product.category);
        const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
    });
}
