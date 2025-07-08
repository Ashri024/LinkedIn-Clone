export const formatProfileURL = ( _id: string,firstName: string, lastName?: string): string => {
    const formattedFirstName = firstName.toLowerCase().replace(/\s+/g, '-');
    const formattedLastName = lastName ? lastName.toLowerCase().replace(/\s+/g, '-'): undefined;
    
    // Construct the URL-friendly profile string
    if(formattedLastName) {
    return `${formattedFirstName}-${formattedLastName}-${_id}`;
    } 
    return `${formattedFirstName}-${_id}`;
    }
