export const getQualityRating = (score) => {

  if (score >= 90)
    return "Excellent";

  if (score >= 80)
    return "Good";

  if (score >= 70)
    return "Fair";

  if (score >= 60)
    return "Poor";

  return "Very Poor";

};