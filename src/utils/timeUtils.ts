
export const getTimeBasedGreeting = (userName?: string): { greeting: string; message: string; emoji: string } => {
  const now = new Date();
  const hour = now.getHours();
  const name = userName || 'there';

  if (hour >= 5 && hour < 12) {
    return {
      greeting: `Good morning, ${name}!`,
      message: "Ready to start your day organized?",
      emoji: "🌅"
    };
  } else if (hour >= 12 && hour < 17) {
    return {
      greeting: `Good afternoon, ${name}!`,
      message: "How's your day going so far?",
      emoji: "☀️"
    };
  } else if (hour >= 17 && hour < 22) {
    return {
      greeting: `Good evening, ${name}!`,
      message: "Time to wrap up and plan for tomorrow?",
      emoji: "🌆"
    };
  } else {
    return {
      greeting: `Good night, ${name}!`,
      message: "Planning ahead for tomorrow?",
      emoji: "🌙"
    };
  }
};

export const getContextualMessage = (): string => {
  const messages = [
    "Your family's productivity starts here",
    "Keep your family organized and connected",
    "Making family life simpler, one task at a time",
    "Your family command center awaits",
    "Bringing families together through organization"
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};

export const formatTimeAgo = (date: string | Date): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInMs = now.getTime() - past.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  } else {
    return past.toLocaleDateString();
  }
};
