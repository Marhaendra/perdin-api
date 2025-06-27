// Fungsi untuk menghitung jarak antara dua koordinat (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius bumi dalam km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Jarak dalam km
}

// Fungsi untuk menghitung uang saku
function calculateAllowance(jarak, sameProvince, sameIsland, isInternational) {
    if (isInternational) {
        return 50 * 15000; // USD 50 (asumsi 1 USD = 15.000)
    }
    if (jarak <= 60) {
        return 0;
    }
    if (sameProvince) {
        return 200000;
    }
    if (sameIsland) {
        return 250000;
    }
    return 300000;
}

module.exports = {
    calculateDistance,
    calculateAllowance
};