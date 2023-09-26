import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default async function handleProfileSignup(firstName, lastName, fileName) {
  const result = [];
  try {
    const user = await signUpUser(firstName, lastName);
    result.push({ status: 'fulfilled', value: user });
  } catch (error) {
    result.push({ status: 'rejected', value: error.toString() });
  }
  try {
    const photo = await uploadPhoto(fileName);
    result.push({ status: 'fulfilled', value: photo });
  } catch (error) {
    result.push({ status: 'rejected', value: error.toString() });
  }
  return result;
}
