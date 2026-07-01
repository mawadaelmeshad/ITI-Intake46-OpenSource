'use server';

import { revalidatePath } from 'next/cache';

export async function submitContactForm(prevState, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // Basic Validation (Requirement 13)
  if (!name || !email || !message) {
    return { error: 'All fields are required.' };
  }
  
  if (!email.includes('@')) {
    return { error: 'Please provide a valid email address.' };
  }
  
  if (message.length < 10) {
    return { error: 'Message must be at least 10 characters long.' };
  }

  // Simulate network delay / processing
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Use revalidatePath after action (Bonus)
  revalidatePath('/contact');

  return { success: 'Thank you! Your message has been sent successfully.' };
}
