module.exports = {
    getAvailableCenters: (centers, age) => {
        return centers.filter((center) => {
            return center.sessions.find( (session) => (session.available_capacity > 0 && session.min_age_limit <= age))
        })
    }
}