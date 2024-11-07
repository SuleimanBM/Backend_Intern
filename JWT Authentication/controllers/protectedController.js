

exports.viewResource = async (req, res) => {
    // This is a protected route that can only be accessed when we have a valid JWT token
    // The JWT token is verified in the protect middleware which is placed before this route
    // If the token is invalid, the protect middleware will return an error and this code will not run
    try {
        // If the token is valid, we return a success message
        return res.status(200).json({
            success: true,
            message: "Protected route accessed successfully",
        });
    } catch (error) {
        // If there is an error, we return an error message
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
}


