const apiConfig = {
    imgURL: (path) => `${process.env.REACT_APP_BASE_IMAGE_URL}/${path}`,
    // baseURL: 'http://api.v1.ducthangchin.engineer'
    baseURL: process.env.REACT_APP_BASE_API_URL
}

export default apiConfig