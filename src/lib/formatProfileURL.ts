export const formatProfileURL = (firstName: string, lastName: string, _id: string): string => {
    const formattedFirstName = firstName.toLowerCase().replace(/\s+/g, '-');
    const formattedLastName = lastName.toLowerCase().replace(/\s+/g, '-');
    
    // Construct the URL-friendly profile string
    return `${formattedFirstName}-${formattedLastName}-${_id}`;
    }
