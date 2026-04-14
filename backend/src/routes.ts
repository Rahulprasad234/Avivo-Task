import { Router, Request, Response } from 'express';
import { dbAll, dbGet } from './database';
import { User } from './types';

const router = Router();

// GET /users - Fetch all users
router.get('/users', async (req: Request, res: Response): Promise<void> => {
  try {
    const users: User[] = await dbAll(
      `SELECT id, firstName, lastName, maidenName, age, gender, email, phone, 
              username, passworod, birthDate, image, bloodGroup, height, weight, 
              eyeColor, hairColor, hairType, domain, ip, addressAddress, addressCity, 
              addressState, addressStateCode, addressPostalCode, addressCoordinatesLat, 
              addressCoordinatesLng, addressCountry, companyName, companyTitle, 
              companyDepartment, role FROM users`
    );

    // Transform database rows to match the User interface
    const transformedUsers: User[] = users.map((row: any) => ({
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      maidenName: row.maidenName,
      age: row.age,
      gender: row.gender,
      email: row.email,
      phone: row.phone,
      username: row.username,
      password: row.passworod,
      birthDate: row.birthDate,
      image: row.image,
      bloodGroup: row.bloodGroup,
      height: row.height,
      weight: row.weight,
      eyeColor: row.eyeColor,
      hair: {
        color: row.hairColor,
        type: row.hairType,
      },
      domain: row.domain,
      ip: row.ip,
      address: {
        address: row.addressAddress,
        city: row.addressCity,
        state: row.addressState,
        stateCode: row.addressStateCode,
        postalCode: row.addressPostalCode,
        coordinates: {
          lat: row.addressCoordinatesLat,
          lng: row.addressCoordinatesLng,
        },
        country: row.addressCountry,
      },
      company: {
        name: row.companyName,
        title: row.companyTitle,
        department: row.companyDepartment,
      },
      role: row.role,
    }));

    res.status(200).json({
      users: transformedUsers,
      total: transformedUsers.length,
    });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      error: 'Failed to fetch users',
      message: error.message,
    });
  }
});

// GET /users/:id - Fetch a single user by ID
router.get('/users/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const row: any = await dbGet(
      `SELECT id, firstName, lastName, maidenName, age, gender, email, phone, 
              username, passworod, birthDate, image, bloodGroup, height, weight, 
              eyeColor, hairColor, hairType, domain, ip, addressAddress, addressCity, 
              addressState, addressStateCode, addressPostalCode, addressCoordinatesLat, 
              addressCoordinatesLng, addressCountry, companyName, companyTitle, 
              companyDepartment, role FROM users WHERE id = ?`,
      [id]
    );

    if (!row) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const user: User = {
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      maidenName: row.maidenName,
      age: row.age,
      gender: row.gender,
      email: row.email,
      phone: row.phone,
      username: row.username,
      password: row.passworod,
      birthDate: row.birthDate,
      image: row.image,
      bloodGroup: row.bloodGroup,
      height: row.height,
      weight: row.weight,
      eyeColor: row.eyeColor,
      hair: {
        color: row.hairColor,
        type: row.hairType,
      },
      domain: row.domain,
      ip: row.ip,
      address: {
        address: row.addressAddress,
        city: row.addressCity,
        state: row.addressState,
        stateCode: row.addressStateCode,
        postalCode: row.addressPostalCode,
        coordinates: {
          lat: row.addressCoordinatesLat,
          lng: row.addressCoordinatesLng,
        },
        country: row.addressCountry,
      },
      company: {
        name: row.companyName,
        title: row.companyTitle,
        department: row.companyDepartment,
      },
      role: row.role,
    };

    res.status(200).json(user);
  } catch (error: any) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      error: 'Failed to fetch user',
      message: error.message,
    });
  }
});

export default router;
