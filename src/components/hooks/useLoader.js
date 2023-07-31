import { useState } from 'react';

const useLoader = () => {
    const [isLoading, setLoading] = useState(false);

    return {
        isLoading,
        showLoading: () => setLoading(true),
        hideLoading: () => setLoading(false),
    };
};

export default useLoader;