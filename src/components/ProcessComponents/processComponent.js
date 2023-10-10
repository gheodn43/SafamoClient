import React, { useEffect, useState } from 'react';

const ProgressBar = ({ initialValue, targetValue }) => {
  const [progress, setProgress] = useState(initialValue);

  useEffect(() => {
    const animationDuration = 1; // Thời gian chuyển đổi (2 giây)
    const stages = 5; // Tổng số giai đoạn

    const updateProgress = () => {
      // Tính toán bước tăng tiến trình cho từng giai đoạn
      const step = (targetValue - progress) / (animationDuration / stages);

      // Cập nhật tiến trình
      setProgress((prevProgress) => {
        const newProgress = prevProgress + step;
        if (newProgress >= targetValue) {
          // Đạt được giá trị mục tiêu, dừng cập nhật
          return targetValue;
        }
        return newProgress;
      });


    };

    const interval = setInterval(updateProgress, animationDuration / stages);

    // Dừng cập nhật khi component unmount
    return () => clearInterval(interval);
  }, [initialValue, targetValue]);

  return (
    <div>
      <div className="progress row">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
