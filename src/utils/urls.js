export const categoryUrlBuilder = (category) => encodeURI(`/category/${category.id}`)

export const productUrlBuilder = (product) => encodeURI(`/product/${product.productId}`)

export const searchUrlBuilder = (searchTerm) => '/search?q=' + encodeURIComponent(searchTerm)

export const updateSearchParams = (searchParams, newParams) => {
    Object.entries(newParams).forEach(([key, value]) => {
        // 0 is a valid value as for a param
        if (!value && value !== 0) {
            searchParams.delete(key)
        } else {
            searchParams.set(key, value)
        }
    })
}
