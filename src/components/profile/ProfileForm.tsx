
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  bio: z.string().max(200, 'Bio must be less than 200 characters').optional(),
  location: z.string().optional(),
  cookingSkillLevel: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
  familyRole: z.enum(['parent', 'guardian', 'teen', 'child']).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  onSuccess?: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSuccess }) => {
  const { user, updateUserProfile } = useApp();
  const { toast } = useToast();
  const [dietaryPreferences, setDietaryPreferences] = React.useState<string[]>(
    user?.dietaryPreferences || []
  );
  const [favoriteCuisines, setFavoriteCuisines] = React.useState<string[]>(
    user?.favoriteCuisines || []
  );

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      location: user?.location || '',
      cookingSkillLevel: user?.cookingSkillLevel || 'intermediate',
      familyRole: user?.familyRole || 'parent',
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    updateUserProfile({
      ...data,
      dietaryPreferences,
      favoriteCuisines,
    });
    
    toast({
      title: "Profile updated!",
      description: "Your profile has been successfully updated.",
    });
    
    onSuccess?.();
  };

  const addDietaryPreference = (pref: string) => {
    if (pref && !dietaryPreferences.includes(pref)) {
      setDietaryPreferences([...dietaryPreferences, pref]);
    }
  };

  const removeDietaryPreference = (pref: string) => {
    setDietaryPreferences(dietaryPreferences.filter(p => p !== pref));
  };

  const addFavoriteCuisine = (cuisine: string) => {
    if (cuisine && !favoriteCuisines.includes(cuisine)) {
      setFavoriteCuisines([...favoriteCuisines, cuisine]);
    }
  };

  const removeFavoriteCuisine = (cuisine: string) => {
    setFavoriteCuisines(favoriteCuisines.filter(c => c !== cuisine));
  };

  const commonDietaryPreferences = ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto', 'paleo'];
  const commonCuisines = ['Italian', 'Mexican', 'Asian', 'Mediterranean', 'Indian', 'French', 'American'];

  return (
    <Card className="card-familyhub">
      <CardHeader>
        <CardTitle className="font-poppins">Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cookingSkillLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cooking Skill Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="familyRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Family Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="guardian">Guardian</SelectItem>
                        <SelectItem value="teen">Teen</SelectItem>
                        <SelectItem value="child">Child</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Dietary Preferences */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Dietary Preferences
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {dietaryPreferences.map(pref => (
                  <Badge key={pref} variant="secondary" className="flex items-center gap-1">
                    {pref}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeDietaryPreference(pref)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {commonDietaryPreferences
                  .filter(pref => !dietaryPreferences.includes(pref))
                  .map(pref => (
                    <Button
                      key={pref}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addDietaryPreference(pref)}
                    >
                      + {pref}
                    </Button>
                  ))}
              </div>
            </div>

            {/* Favorite Cuisines */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Favorite Cuisines
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {favoriteCuisines.map(cuisine => (
                  <Badge key={cuisine} variant="secondary" className="flex items-center gap-1">
                    {cuisine}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeFavoriteCuisine(cuisine)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {commonCuisines
                  .filter(cuisine => !favoriteCuisines.includes(cuisine))
                  .map(cuisine => (
                    <Button
                      key={cuisine}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addFavoriteCuisine(cuisine)}
                    >
                      + {cuisine}
                    </Button>
                  ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <Button type="submit" className="btn-primary flex-1">
                Save Changes
              </Button>
              <Button type="button" variant="outline" onClick={onSuccess}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
