import { User } from './types/User';

export const generateMockUser = (id: number): User => {
  const firstNames = ['John', 'Jane', 'Robert', 'Maria', 'Michael', 'Sarah', 'James', 'Emma'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
  const companies = ['Tech Corp', 'Innovation Inc', 'Digital Solutions', 'Creative Agency', 'Tech Innovations', 'Software Labs'];
  const departments = ['Engineering', 'Sales', 'Marketing', 'Operations', 'HR', 'Finance'];
  const roles = ['Developer', 'Manager', 'Designer', 'Analyst', 'Executive', 'Coordinator'];
  const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Spain', 'Japan', 'Australia'];
  const cities = ['New York', 'Los Angeles', 'London', 'Berlin', 'Paris', 'Madrid', 'Tokyo', 'Sydney'];
  const genders = ['male', 'female'];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const eyeColors = ['blue', 'green', 'brown', 'hazel', 'gray'];
  const hairColors = ['black', 'brown', 'blonde', 'red', 'auburn'];
  const hairTypes = ['straight', 'curly', 'wavy', 'coily'];

  const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  const getRandomAge = (): number => Math.floor(Math.random() * (65 - 20)) + 20;
  const getRandomHeight = (): number => Math.round((Math.random() * (6.2 - 5.0) + 5.0) * 100) / 100;
  const getRandomWeight = (): number => Math.round(Math.random() * (180 - 100) + 100);

  const firstName = getRandomItem(firstNames);
  const lastName = getRandomItem(lastNames);
  const company = getRandomItem(companies);
  const country = getRandomItem(countries);
  const city = getRandomItem(cities);

  return {
    id,
    firstName,
    lastName,
    maidenName: getRandomItem([undefined, 'Wilson', 'Miller', 'Taylor']),
    age: getRandomAge(),
    gender: getRandomItem(genders),
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    username: `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}`,
    password: 'hashedpassword123',
    birthDate: new Date(Math.random() * (new Date().getTime() - new Date(1960, 0, 1).getTime()) + new Date(1960, 0, 1).getTime())
      .toISOString()
      .split('T')[0],
    image: `https://i.pravatar.cc/150?img=${id}`,
    bloodGroup: getRandomItem(bloodGroups),
    height: getRandomHeight(),
    weight: getRandomWeight(),
    eyeColor: getRandomItem(eyeColors),
    hair: {
      color: getRandomItem(hairColors),
      type: getRandomItem(hairTypes),
    },
    domain: 'example.com',
    ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    address: {
      address: `${Math.floor(Math.random() * 1000)} Main Street`,
      city,
      state: getRandomItem(['California', 'Texas', 'Florida', 'New York', 'Pennsylvania']),
      stateCode: 'CA',
      postalCode: `${Math.floor(Math.random() * 90000) + 10000}`,
      country,
      coordinates: {
        lat: Math.random() * 180 - 90,
        lng: Math.random() * 360 - 180,
      },
    },
    company: {
      name: company,
      title: getRandomItem(roles),
      department: getRandomItem(departments),
    },
    role: getRandomItem(['user', 'admin', 'manager']),
  };
};
