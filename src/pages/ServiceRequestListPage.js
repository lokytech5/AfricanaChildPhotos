import React, { useEffect, useState } from 'react'
import ServiceRequestList from '../components/admin/ServiceRequestList'
import axios from 'axios';
export default function ServiceRequestListPage() {

    const [serviceItems, setServiceItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchServiceRequestData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/services/')
                if (response.status === 200 || response.status === 201) {
                    setServiceItems(response.data.serviceRequest);
                    console.log('Fetched data:', response.data);
                }
            } catch (error) {
                console.error('Error fetching service data from server', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchServiceRequestData();
    }, []);
    return (

        <ServiceRequestList
            serviceData={serviceItems}
            isLoading={isLoading} />
    )
}
