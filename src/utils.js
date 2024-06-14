
export function filterByCategory(geojson) {
    const categories = []
    const results = {}
    
    geojson.features.forEach(element => {
        const category = element.properties['Category']
        if (!categories.includes(category)){
            categories.push(category)
            results[category] = { ...geojson}
            results[category].features = []
            results[category].features.push(element)
        } else {
            results[category].features.push(element)
        }
    });
    return results
}