const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        try {
            let user = req.user;

            if (!user) {
                return res.json({ message: "User not found" });
            }

            if (user.role !== requiredRole) {
                return res.json({ message: "Access denied" });
            }

            next();

        } catch (error) {
            return res.status(500).json({ message: "Server Error" });
        }
    };
};

module.exports = roleMiddleware;