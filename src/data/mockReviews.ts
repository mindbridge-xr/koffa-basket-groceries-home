
import { ChefReview } from '@/types/chef';

export const mockReviews: ChefReview[] = [
  {
    id: 'review-1',
    clientId: 'client-1',
    clientName: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely amazing! Maria created the most delicious Italian feast for our anniversary dinner. Every dish was perfectly prepared and beautifully presented.',
    bookingId: 'booking-1',
    serviceType: 'Private Dinner Party',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'review-2',
    clientId: 'client-2',
    clientName: 'Mike Chen',
    rating: 5,
    comment: 'Outstanding meal prep service! James prepared healthy, delicious meals that lasted the whole week. Highly recommend!',
    bookingId: 'booking-2',
    serviceType: 'Weekly Meal Prep',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'review-3',
    clientId: 'client-3',
    clientName: 'Emily Davis',
    rating: 4,
    comment: 'Great cooking class! Lisa taught us so much about French techniques. The food was delicious.',
    bookingId: 'booking-3',
    serviceType: 'Cooking Class',
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
  }
];
