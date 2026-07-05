export const sanitize = async (data) => {
    
    const{id, categoryID, ...sanitizeData} = data

    return sanitizeData
}