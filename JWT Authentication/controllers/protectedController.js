
exports.viewResource = async (req, res) => {
    try {
        
        return res.status(200).json({
            success: true,
            message: "Protected route accessed successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
}

