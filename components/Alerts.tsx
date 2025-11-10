
import React, { useMemo } from 'react';
import { Animal, Crop, HealthStatus, CropStage } from '../types';

interface AlertsProps {
  animals: Animal[];
  crops: Crop[];
}

const Alerts: React.FC<AlertsProps> = ({ animals, crops }) => {
  const alerts = useMemo(() => {
    const generatedAlerts: string[] = [];
    animals.forEach(animal => {
      if (animal.healthStatus === HealthStatus.Critical) {
        generatedAlerts.push(`انتبه! حالة الحيوان "${animal.name}" حرجة وتحتاج إلى تدخل فوري.`);
      } else if (animal.healthStatus === HealthStatus.Sick) {
        generatedAlerts.push(`الحيوان "${animal.name}" مريض، يرجى متابعة حالته.`);
      }
    });

    crops.forEach(crop => {
      if (crop.stage === CropStage.Harvesting) {
        generatedAlerts.push(`تنبيه: حقل "${crop.name}" في مرحلة الحصاد الآن.`);
      }
    });

    return generatedAlerts;
  }, [animals, crops]);

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="bg-yellow-100 border-r-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-md mb-6" role="alert">
      <h3 className="font-bold mb-2">تنبيهات هامة</h3>
      <ul className="list-disc list-inside space-y-1">
        {alerts.map((alert, index) => (
          <li key={index}>{alert}</li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
