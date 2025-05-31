
import { useState, useEffect } from 'react';

export const useLearnData = () => {
  const [diseaseProfiles, setDiseaseProfiles] = useState([]);
  const [seasonalTips, setSeasonalTips] = useState([]);
  const [treatmentData, setTreatmentData] = useState(null);
  const [cropDiseaseInfo, setCropDiseaseInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [diseaseRes, seasonalRes, treatmentRes, cropRes] = await Promise.all([
          import('../data/diseaseProfiles.json'),
          import('../data/seasonalTips.json'),
          import('../data/treatmentData.json'),
          import('../data/cropDiseaseInfo.json')
        ]);

        setDiseaseProfiles(diseaseRes.default);
        setSeasonalTips(seasonalRes.default);
        setTreatmentData(treatmentRes.default);
        setCropDiseaseInfo(cropRes.default);
      } catch (err) {
        console.error('Error loading learn data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    diseaseProfiles,
    seasonalTips,
    treatmentData,
    cropDiseaseInfo,
    loading,
    error
  };
};
