
export const getTimeOfDay = () => {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 22) return 'evening';
  return 'night';
};

export const getGreeting = (name?: string) => {
  const timeOfDay = getTimeOfDay();
  const userName = name || 'there';
  
  switch (timeOfDay) {
    case 'morning':
      return `Good Morning, ${userName}!`;
    case 'afternoon':
      return `Good Afternoon, ${userName}!`;
    case 'evening':
      return `Good Evening, ${userName}!`;
    case 'night':
      return `Good Night, ${userName}!`;
    default:
      return `Hello, ${userName}!`;
  }
};

export const getCurrentTime = () => {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
