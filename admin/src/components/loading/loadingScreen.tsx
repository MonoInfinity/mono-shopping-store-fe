import { Spin } from 'antd';
import * as React from 'react';

export interface LoadingScreenProps {}

const LoadingScreen: React.FC<LoadingScreenProps> = () => {
        return (
                <div className="flex items-center justify-center w-full min-h-screen bg-gray-800">
                        <Spin size="large" />
                </div>
        );
};

export default LoadingScreen;
