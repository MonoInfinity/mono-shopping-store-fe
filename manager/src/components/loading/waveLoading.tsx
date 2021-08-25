import * as React from "react";

export interface WaveLoadingProps {}

const WaveLoading: React.FC<WaveLoadingProps> = () => {
        return (
                <div className="spinner space-x-1 flex items-center justify-center">
                        <div className="rect1 h-12 w-1.5 bg-blue-gem-500"></div>
                        <div className="rect2 h-12 w-1.5 bg-blue-gem-500"></div>
                        <div className="rect3 h-12 w-1.5 bg-blue-gem-500"></div>
                        <div className="rect4 h-12 w-1.5 bg-blue-gem-500"></div>
                        <div className="rect5 h-12 w-1.5 bg-blue-gem-500"></div>
                </div>
        );
};

export default WaveLoading;
