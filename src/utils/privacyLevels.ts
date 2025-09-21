export interface PrivacyLevel {
  label: string;
  bgColor: string;
  textColor: string;
}

export const getPrivacyLevelInfo = (epsilon: number): PrivacyLevel => {
  if (epsilon <= 0.5) {
    return {
      label: 'High Privacy',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
    };
  } else if (epsilon <= 1.2) {
    return {
      label: 'Medium Privacy',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
    };
  } else {
    return {
      label: 'Low Privacy',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
    };
  }
};